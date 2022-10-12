import { HttpService } from "@nestjs/axios";
import { CepService } from "./cep.service";
import { BadRequestException } from "@nestjs/common";

describe('Credit Analysis Service', () => {

  let cepService: CepService

  beforeEach(() => { cepService = new CepService(new HttpService()) });

  it('Should return RJ as UF from this CEP', async () => {
    const mockCep = '20090002'
    const result = await cepService.verifyCep(mockCep)
    expect(result.uf).toBe('RJ')
  })

  it('Should return SP as UF from this CEP', async () => {
    const mockCep = '01311000'
    const result = await cepService.verifyCep(mockCep)
    expect(result.uf).toBe('SP')
  })

  it('Should fail for null CEP', async () => {
    const mockCep = null
    const result = await cepService.verifyCep(mockCep)
    expect(result).toBe(null)
  })

  it('Should fail for wrong CEP', async () => {
    const mockCep = '91311000'
    const result = await cepService.verifyCep(mockCep)
    expect(result).toBe(null)
  })
 
});