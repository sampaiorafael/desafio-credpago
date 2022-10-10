import { Module } from '@nestjs/common';
import { CreditAnalysisController } from './credit-analysis.controller';

@Module({
  imports: [],
  controllers: [CreditAnalysisController],
  providers: [],
})
export class CreditAnalysisModule {}
