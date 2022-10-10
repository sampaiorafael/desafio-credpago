import { ApiProperty } from "@nestjs/swagger";

export class CreditAnalysisDTO {
  @ApiProperty()
  name: string
  @ApiProperty()
  cpf: string
  @ApiProperty()
  badCreditReputation: boolean 
  @ApiProperty()
  income: number
  @ApiProperty()
  creditCardLimit: number
  @ApiProperty()
  rentValue: number
  @ApiProperty()
  streetAddress: string
  @ApiProperty()
  numberAddress: number
  @ApiProperty()
  cityAddress: string
  @ApiProperty()
  stateAddress: string
  @ApiProperty()
  cepCodeAddress: string
}