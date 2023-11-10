import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class PokeAPIService {
    constructor (private httpCliente: HttpClient) {}
    getPokeAPIService (id: number = Math.floor (Math.random()*100)){
        return this.httpCliente.get (`https://pokeapi.co/api/v2/pokemon/${id}`);
    }
}