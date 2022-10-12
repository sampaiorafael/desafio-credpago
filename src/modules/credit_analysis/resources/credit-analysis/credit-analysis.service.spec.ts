import { HttpService } from "@nestjs/axios";
import { CepService } from "../../../cep/cep.service";
import { CreditAnalysisResult } from "../../credit-analysis-result.enum";
import { CreditAnalysisEntity } from "../../credit-analysis.entity";
import { CreditAnalysisRepository } from "../../credit-analysis.repository";
import { CreditAnalysisService } from "./credit-analysis.service";
import { CreditAnalysisRequestDTO } from "../../dtos/credit-analysis.dto";

describe('Credit Analysis Service', () => {

  const mockedCreditAnalysisRequest: CreditAnalysisRequestDTO[] = [
    {
      name: 'Rafael',
      streetAddress: 'Rua Visconde do Rio Branco',
      numberAddress: 1488,
      cityAddress: 'Curitiba',
      stateAddress: 'PR',
      cepCodeAddress: '80420210',
      cpf: '06515447000', 
      badCreditReputation: false,
      income: 24256.00,
      creditCardLimit: 65000.00,
      rentValue: 4500.00
    }
  ]

  const mockedCreditAnalysis: CreditAnalysisEntity[] = [
    {
      id: '8c923be5-c2f3-4f15-908d-3611a8e6446f',
      cpf: '06515447000',
      result: CreditAnalysisResult.APPROVED,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]

  const creditAnalysisRepositoryMock: Partial<CreditAnalysisRepository> =  {
    findLastCreditAnalysisByCpfFromDate: async (cpf: string): Promise<CreditAnalysisEntity> => Promise.resolve(mockedCreditAnalysis.find((mock) => mock.cpf === cpf)),
    createCreditAnalysis: async (): Promise<CreditAnalysisEntity> => Promise.resolve(Promise.resolve(mockedCreditAnalysis[0]))
  }

  let creditAnalysisService: CreditAnalysisService;
  let cepService: CepService

  beforeEach(() => {
    cepService = new CepService(new HttpService())
    creditAnalysisService = new CreditAnalysisService(creditAnalysisRepositoryMock as CreditAnalysisRepository, cepService);
  });

  it('First challenge test', async () => {
    const requestPayload = mockedCreditAnalysisRequest.find(mock => mock.cpf = '06515447000')
    const result = await creditAnalysisService.creditAnalysis(requestPayload)
    expect(result.result).toBe(100)
    expect(result.result).toBe(CreditAnalysisResult.APPROVED)
  })

});