import { Module } from '@nestjs/common';
import { CepModule } from '../cep/cep.module';
import { CreditAnalysisController } from './credit-analysis.controller';
import { CreditAnalysisEntity } from './credit-analysis.entity';
import { CreditAnalysisRepository } from './credit-analysis.repository';
import { CreditAnalysisService } from './resources/credit-analysis/credit-analysis.service';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
    TypeOrmModule.forFeature([CreditAnalysisEntity]),
    CepModule
  ],
  controllers: [CreditAnalysisController],
  providers: [
    CreditAnalysisRepository,
    CreditAnalysisService,
  ],
})
export class CreditAnalysisModule {}
