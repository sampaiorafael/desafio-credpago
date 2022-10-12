import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { CepVerifyResponseDTO } from './cep.dto';

@Injectable()
export class CepService {

  constructor(
    private readonly httpService: HttpService
  ) {}

  public async verifyCep(cep: string): Promise<CepVerifyResponseDTO> {
    const cepVerification = await this.httpService.axiosRef.get(`https://viacep.com.br/ws/${cep}/json/`)
    const cepResponse: CepVerifyResponseDTO = Object.assign(cepVerification.data)
    if(!cepResponse.cep) {
      return null
    }
    return cepResponse
  }

}
