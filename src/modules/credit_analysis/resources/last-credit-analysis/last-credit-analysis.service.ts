import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreditAnalysisEntity } from '../../credit-analysis.entity';
import { CreditAnalysisRepository } from '../../credit-analysis.repository';

@Injectable()
export class LastCreditAnalysisService {

  constructor(
    @Inject(CreditAnalysisRepository)
    private readonly creditAnalysisRepository: CreditAnalysisRepository,
  ) {}

  public async execute(cpf: string): Promise<CreditAnalysisEntity> {
    const lastCreditAnalysis = await this.creditAnalysisRepository.findLastCreditAnalysisByCpfFromDate(cpf)
    if(!lastCreditAnalysis) throw new NotFoundException('Was not possible to find any previous credit analysis for this CPF')
    return lastCreditAnalysis
  }

}
