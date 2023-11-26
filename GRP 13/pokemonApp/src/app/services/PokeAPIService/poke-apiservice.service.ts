import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { PokemomType } from 'src/types/pokemon'

@Injectable({
  providedIn: 'root'
})
export class PokeAPIServiceService {
  public pokemon: PokemomType = {
    abilities: [],
    height: 0,
    width: 0,
    name: '',
    image: '',
    statistics: {
      defeats: 0,
      draws: 0,
      victories: 0
    }
  }

  constructor(private httpClient: HttpClient) { }

  getPokemonAPI(id: number = Math.floor(Math.random() * 100)) {
    return this.httpClient.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
  }

  getPokemon() {
    return this.pokemon
  }

  setPokemon(pokemon: PokemomType) {
    this.pokemon = pokemon
  }
}
