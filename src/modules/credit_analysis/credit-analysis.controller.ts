import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreditAnalysisRequestDTO, CreditAnalysisResponseDTO } from './dtos/credit-analysis.dto';
import { CreditAnalysisService } from './resources/credit-analysis/credit-analysis.service';
import { LastCreditAnalysisService } from './resources/last-credit-analysis/last-credit-analysis.service';

@Controller()
@ApiTags('credit-analysis')
export class CreditAnalysisController {

  constructor(
    private readonly creditAnalysisService: CreditAnalysisService,
    private readonly lastCreditAnalysisService: LastCreditAnalysisService
  ) {}

  @Post()
  @ApiBody({ type: CreditAnalysisRequestDTO })
  @ApiResponse({ type: CreditAnalysisResponseDTO })
  public async creditAnalysis(
    @Body() payload: CreditAnalysisRequestDTO
  ): Promise<CreditAnalysisResponseDTO> {
    const userCreditAnalysis = await this.creditAnalysisService.execute(payload)
    return userCreditAnalysis
  }

  @Get('/last/:cpf')
  public async lastCreditAnalysis(
    @Param('cpf') cpf: string
  ): Promise<any> {
    const lastCreditAnalysis = await this.lastCreditAnalysisService.execute(cpf)
    return lastCreditAnalysis
  }

}
