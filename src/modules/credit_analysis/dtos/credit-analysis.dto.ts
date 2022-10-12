import { ApiProperty } from "@nestjs/swagger";

export class CreditAnalysisRequestDTO {
  @ApiProperty({
    description: 'User name',
    default: 'Rafael',
  })
  name: string

  @ApiProperty({
    description: 'User CPF',
    default: '60775263710',
  })
  cpf: string

  @ApiProperty({
    description: 'User credit reputation',
    default: false,
  })
  badCreditReputation: boolean 

  @ApiProperty({
    description: 'User wage/income/salary/payment',
    default: 10000
  })
  income: number

  @ApiProperty({
    description: 'User credit card limit',
    default: 15000
  })
  creditCardLimit: number
  
  @ApiProperty({
    description: 'User chosen place rent value',
    default: 15000
  })
  rentValue: number
  
  @ApiProperty({
    description: 'User street address',
    default: 'Rua Visconde do Rio Branco'
  })
  streetAddress: string

  @ApiProperty({
    description: 'User number address',
    default: 1488
  })
  numberAddress: number

  @ApiProperty({
    description: 'User city/town/district address',
    default: 'Curitiba'
  })
  cityAddress: string

  @ApiProperty({
    description: 'User state address',
    default: 'PR'
  })
  stateAddress: string

  @ApiProperty({
    description: 'User CEP code address',
    default: '80420210'
  })
  cepCodeAddress: string
}