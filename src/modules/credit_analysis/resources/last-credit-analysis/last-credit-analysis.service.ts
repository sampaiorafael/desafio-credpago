import { Inject, Injectable } from '@nestjs/common';
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
    return lastCreditAnalysis
  }

}
