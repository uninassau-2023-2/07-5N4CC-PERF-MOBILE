import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class ViaCepServiceService {

  constructor(private httpClient: HttpClient) { }

  getViaCep(cep: string = '55700000') {
    return this.httpClient.get(`https://viacep.com.br/ws/${cep}/json/`)
  }
}
