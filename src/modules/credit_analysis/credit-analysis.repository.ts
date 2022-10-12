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

  public async findLastCreditAnalysis(): Promise<CreditAnalysisEntity> {
    const lastCreditAnalysis = await this.creditAnalysisRepository.findOne({
      order: {
        createdAt: 'DESC'
      }
    })
    return lastCreditAnalysis
  }

}
