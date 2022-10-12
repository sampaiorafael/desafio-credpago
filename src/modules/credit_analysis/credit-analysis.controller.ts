import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreditAnalysisRequestDTO } from './dtos/credit-analysis.dto';
import { CreditAnalysisService } from './resources/credit-analysis/credit-analysis.service';

@Controller()
@ApiTags('credit-analysis')
export class CreditAnalysisController {

  constructor(
    private readonly creditAnalysisService: CreditAnalysisService
  ) {}

  @Post()
  @ApiBody({ type: CreditAnalysisRequestDTO })
  public async creditAnalysis(
    @Body() payload: CreditAnalysisRequestDTO
  ): Promise<any> {
    const userCreditAnalysis = await this.creditAnalysisService.creditAnalysis(payload)
    return userCreditAnalysis
  }

}
