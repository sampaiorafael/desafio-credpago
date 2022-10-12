import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CepService } from '../../../cep/cep.service';
import { CreditAnalysisResult } from '../../credit-analysis-result.enum';
import { CreditAnalysisRepository } from '../../credit-analysis.repository';
import { CreditAnalysisRequestDTO, CreditAnalysisResponseDTO } from '../../dtos/credit-analysis.dto';

@Injectable()
export class CreditAnalysisService {

  constructor(
    @Inject(CreditAnalysisRepository)
    private readonly creditAnalysisRepository: CreditAnalysisRepository,
    private readonly cepService: CepService
  ) {}

  public async creditAnalysis(data: CreditAnalysisRequestDTO): Promise<CreditAnalysisResponseDTO> {
    const cepVerification = await this.cepService.verifyCep(data.cepCodeAddress)

    if(
      !cepVerification || 
      cepVerification.uf != data.stateAddress || 
      cepVerification.localidade != data.cityAddress
    ) throw new BadRequestException('Was not possible to validate this CEP code')

    let creditScore = 100

    const rentValueIsHigher = this.rentValueVerification(data.rentValue, data.income)
    const lastCreditAnalysisIn90Days = await this.creditAnalysisRepository.findLastCreditAnalysisByCpfFromDate(data.cpf)
    const deniedOnTwoFirstRules = rentValueIsHigher && data.badCreditReputation
    
    if(rentValueIsHigher) creditScore = this.removePercentageFromScore(creditScore, 18)
    if(data.badCreditReputation) creditScore = this.removePercentageFromScore(creditScore, 31)
    if(!deniedOnTwoFirstRules) {
      if(data.creditCardLimit <= data.rentValue) creditScore = this.removePercentageFromScore(creditScore, 15)
      if(lastCreditAnalysisIn90Days) {
        if(lastCreditAnalysisIn90Days.result === CreditAnalysisResult.DENIED) creditScore = this.removePercentageFromScore(creditScore, 10)
      }
    } 

    const roundedScore = Math.ceil(creditScore)
    const result = deniedOnTwoFirstRules ? CreditAnalysisResult.DENIED : this.defineCreditAnalysisScoreResult(roundedScore)
    const completeResult = await this.creditAnalysisRepository.createCreditAnalysis(data.cpf, result)

    return {
      id: completeResult.id,
      score: roundedScore,
      result
    }
  }

  private defineCreditAnalysisScoreResult(score: number): CreditAnalysisResult {
    if(score <= 30) return CreditAnalysisResult.DENIED
    if(score > 30 && score < 60) return CreditAnalysisResult.TOMANUAL
    if(score >= 60) return CreditAnalysisResult.APPROVED
  }

  private rentValueVerification(rentValue: number, income: number): boolean {
    return rentValue > (income * 0.30)
  }

  private removePercentageFromScore(score: number, percentage: number): number {
    const percentageValue = (score * percentage / 100)
    return score - percentageValue
  }
}
