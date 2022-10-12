import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CepModule } from './modules/cep/cep.module';
import { CreditAnalysisModule } from './modules/credit_analysis/credit-analysis.module';

@Module({
  imports: [
    CepModule,
    CreditAnalysisModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
