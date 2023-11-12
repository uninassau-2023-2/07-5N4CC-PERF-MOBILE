import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class SalvarDadosService {

  constructor() { }

  setDado(valor: any, key: string) {
    localStorage.setItem(key, JSON.stringify(valor))
  }

  getDado(key: string) {
    const dado = localStorage.getItem(key)
    return dado ? JSON.parse(dado) : null
  }
}
