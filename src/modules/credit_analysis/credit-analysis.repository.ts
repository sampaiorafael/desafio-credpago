import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { CreditAnalysisEntity } from './credit-analysis.entity';

@Injectable()
export class CreditAnalysisRepository {

  constructor(
    @InjectRepository(CreditAnalysisEntity)
    private readonly creditAnalysisRepository: Repository<CreditAnalysisEntity>
  ) {}

  public async findLastCreditAnalysisByCpf(cpf: string): Promise<CreditAnalysisEntity> {
    const lastCreditAnalysis = await this.creditAnalysisRepository.findOne({
      where: { cpf },
      order: { createdAt: 'DESC' }
    })
    return lastCreditAnalysis
  }


}
