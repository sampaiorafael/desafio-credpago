import { NotFoundException } from "@nestjs/common";
import { CreditAnalysisResult } from "../../credit-analysis-result.enum";
import { CreditAnalysisEntity } from "../../credit-analysis.entity";
import { CreditAnalysisRepository } from "../../credit-analysis.repository";
import { LastCreditAnalysisService } from "./last-credit-analysis.service";

describe('Last Credit Analysis Service', () => {

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
    },
    {
      id: '9185cc38-2c5c-44a0-aa30-519296f3f2f2',
      cpf: '05933260088',
      result: CreditAnalysisResult.DENIED,
      score: 9,
      createdAt: new Date(0),
      updatedAt: new Date(0)
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

  let lastCreditAnalysisService: LastCreditAnalysisService;

  beforeEach(() => {
    lastCreditAnalysisService = new LastCreditAnalysisService(creditAnalysisRepositoryMock as CreditAnalysisRepository)
  });

  it('Should return a credit analysis from this CPF', async () => {
    const cpf = '24661074068'
    const result = await lastCreditAnalysisService.execute(cpf)
    expect(result.score).toBe(10)
    expect(result.result).toBe(CreditAnalysisResult.DENIED)
  })

  it('Should return the last credit analysis from this CPF', async () => {
    const cpf = '05933260088'
    const result = await lastCreditAnalysisService.execute(cpf)
    expect(result.score).toBe(90)
    expect(result.result).toBe(CreditAnalysisResult.APPROVED)
  })

  it('Should Not found', async () => {
    const cpf = '0593326000'
    const result =  lastCreditAnalysisService.execute(cpf)
    expect(result).rejects.toThrow(NotFoundException);
  })
  
});