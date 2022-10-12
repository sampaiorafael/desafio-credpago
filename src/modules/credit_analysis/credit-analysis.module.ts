import { Module } from '@nestjs/common';
import { CepModule } from '../cep/cep.module';
import { CreditAnalysisController } from './credit-analysis.controller';
import { CreditAnalysisService } from './resources/credit-analysis/credit-analysis.service';

@Module({
  imports: [CepModule],
  controllers: [CreditAnalysisController],
  providers: [CreditAnalysisService],
})
export class CreditAnalysisModule {}
