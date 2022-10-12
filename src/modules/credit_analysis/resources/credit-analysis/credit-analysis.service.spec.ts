import { HttpService } from "@nestjs/axios";
import { CepService } from "../../../cep/cep.service";
import { CreditAnalysisResult } from "../../credit-analysis-result.enum";
import { CreditAnalysisEntity } from "../../credit-analysis.entity";
import { CreditAnalysisRepository } from "../../credit-analysis.repository";
import { CreditAnalysisService } from "./credit-analysis.service";
import { CreditAnalysisRequestDTO } from "../../dtos/credit-analysis.dto";
import { BadRequestException } from "@nestjs/common";


describe('Credit Analysis Service', () => {

  const mockedCreditAnalysisRequest: CreditAnalysisRequestDTO[] = [
    {
      name: 'Firsttest',
      streetAddress: 'Rua Visconde do Rio Branco',
      numberAddress: 1488,
      cityAddress: 'Curitiba',
      stateAddress: 'PR',
      cepCodeAddress: '80420210',
      cpf: '45561195026',

      badCreditReputation: false,
      income: 24256.00,
      creditCardLimit: 65000.00,
      rentValue: 4500.00
    },
    {
      name: 'Secondtest',
      streetAddress: 'Rua Visconde do Rio Branco',
      numberAddress: 1488,
      cityAddress: 'Curitiba',
      stateAddress: 'PR',
      cepCodeAddress: '80420210',
      cpf: '24661074068',

      badCreditReputation: false,
      income: 3950.00,
      creditCardLimit: 1150.00,
      rentValue: 1157.00
    },
    {
      name: 'Thirdtest',
      streetAddress: 'Rua Visconde do Rio Branco',
      numberAddress: 1488,
      cityAddress: 'Curitiba',
      stateAddress: 'PR',
      cepCodeAddress: '80420210',
      cpf: '61004855087',

      badCreditReputation: true,
      income: 2550.00,
      creditCardLimit: 500.00,
      rentValue: 750.00
    },
    {
      name: 'Fourthtest',
      streetAddress: 'Rua Visconde do Rio Branco',
      numberAddress: 1488,
      cityAddress: 'Curitiba',
      stateAddress: 'PR',
      cepCodeAddress: '80420210',
      cpf: '05933260088',

      badCreditReputation: true,
      income: 1200.00,
      creditCardLimit: 500.00,
      rentValue: 500.00
    },
    {
      name: 'FailCepCode',
      streetAddress: 'Rua Visconde do Rio Branco',
      numberAddress: 1488,
      cityAddress: 'Curitiba',
      stateAddress: 'PR',
      cepCodeAddress: '',
      cpf: '05933260088',

      badCreditReputation: true,
      income: 1200.00,
      creditCardLimit: 500.00, 
      rentValue: 500.00
    },
    {
      name: 'FailCepCode2',
      streetAddress: 'Rua Visconde do Rio Branco',
      numberAddress: 1488,
      cityAddress: 'Curitiba',
      stateAddress: 'PR',
      cepCodeAddress: '91073050',
      cpf: '05933260088',

      badCreditReputation: true,
      income: 1200.00,
      creditCardLimit: 500.00,
      rentValue: 500.00
    },

  ]

  const mockedCreditAnalysis: CreditAnalysisEntity[] = [
    {
      id: '8c923be5-c2f3-4f15-908d-3611a8e6446f',
      score: 100,
      cpf: '45561195026',
      result: CreditAnalysisResult.APPROVED,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '2a7e1d55-6b7f-4cf8-b9bd-861cf4d3fd17',
      cpf: '24661074068',
      result: CreditAnalysisResult.DENIED,
      score: 10,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '39eefb55-6d0a-49b1-add2-58ba5103ba79',
      cpf: '61004855087',
      result: CreditAnalysisResult.DENIED,
      score: 20,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '9185cc38-2c5c-44a0-aa30-519296f3f2f2',
      cpf: '05933260088',
      result: CreditAnalysisResult.APPROVED,
      score: 90,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]

  const creditAnalysisRepositoryMock: Partial<CreditAnalysisRepository> =  {
    findLastCreditAnalysisByCpfFromDate: async (cpf): Promise<CreditAnalysisEntity> => {
      return Promise.resolve(mockedCreditAnalysis.find((mock) => mock.cpf === cpf))
    },
    createCreditAnalysis: async (): Promise<CreditAnalysisEntity> => {
      return Promise.resolve(Promise.resolve(mockedCreditAnalysis[0]))
    }
  }

  let creditAnalysisService: CreditAnalysisService;
  let cepService: CepService

  beforeEach(() => {
    cepService = new CepService(new HttpService())
    creditAnalysisService = new CreditAnalysisService(creditAnalysisRepositoryMock as CreditAnalysisRepository, cepService);
  });

  it('First readme challenge usecase test', async () => {
    const requestPayload = mockedCreditAnalysisRequest.find(mock => mock.name = 'Firsttest')
    const result = await creditAnalysisService.execute(requestPayload)
    expect(result.result).toBe(CreditAnalysisResult.APPROVED)
    expect(result.score).toBe(100)
  })

  it('Second readme challenge usecase test', async () => {
    const requestPayload = mockedCreditAnalysisRequest.find(mock => mock.name === 'Secondtest')
    const result = await creditAnalysisService.execute(requestPayload)
    expect(result.result).toBe(CreditAnalysisResult.APPROVED)
    expect(result.score).toBe(77)
  })

  it('Third readme challenge usecase test', async () => {
    const requestPayload = mockedCreditAnalysisRequest.find(mock => mock.name === 'Thirdtest')
    const result = await creditAnalysisService.execute(requestPayload)
    expect(result.result).toBe(CreditAnalysisResult.TOMANUAL)
    expect(result.score).toBe(53)
  })

  it('Fourth readme challenge usecase test', async () => {
    const requestPayload = mockedCreditAnalysisRequest.find(mock => mock.name === 'Fourthtest')
    const result = await creditAnalysisService.execute(requestPayload)
    expect(result.result).toBe(CreditAnalysisResult.DENIED)
    expect(result.score).toBe(57)
  })

  it('Should return bad request because of null cep code', async () => {
    const requestPayload = mockedCreditAnalysisRequest.find(mock => mock.name === 'FailCepCode')
    const result = creditAnalysisService.execute(requestPayload)
    expect(result).rejects.toThrow(BadRequestException);
  })

  it('Should return bad request because of invalid cep code', async () => {
    const requestPayload = mockedCreditAnalysisRequest.find(mock => mock.name === 'FailCepCode2')
    const result = creditAnalysisService.execute(requestPayload)
    expect(result).rejects.toThrow(BadRequestException);
  }) 
 
});