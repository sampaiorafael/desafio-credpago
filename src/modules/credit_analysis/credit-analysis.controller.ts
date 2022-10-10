import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('credit-analysis')
export class CreditAnalysisController {

  @Post()
  getHello(): string {
    return 'Hello'
  }

}
