import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { PokemomType } from 'src/types/pokemon'

@Injectable({
  providedIn: 'root'
})
export class PokedexService {
  private url = `http://localhost:3004`

  constructor(private httpClient: HttpClient) { }

  listPokemons() {
    return this.httpClient.get(`${this.url}/pokemons`)
  }

  getPokemonByName(name: string) {
    return this.httpClient.get(`${this.url}/pokemons?name=${name}`)
  }

  setPokemom(pokemon: PokemomType) {
    return this.httpClient.post(`${this.url}/pokemons`, pokemon)
  }

  addDefeatPokemon(name: string) {
    return this.getPokemonByName(name).subscribe(value => {
      const pokemon = JSON.parse(JSON.stringify(value))
      pokemon[0].statistics.defeats++

      this.httpClient.put(`${this.url}/pokemons/${pokemon[0].id}`, pokemon[0]).subscribe(value => { })
    })
  }

  addVictoryPokemon(name: string) {
    return this.getPokemonByName(name).subscribe(value => {
      const pokemon = JSON.parse(JSON.stringify(value))
      pokemon[0].statistics.victories++

      this.httpClient.put(`${this.url}/pokemons/${pokemon[0].id}`, pokemon[0]).subscribe(value => { })
    })
  }

  addDrawPokemon(name: string) {
    return this.getPokemonByName(name).subscribe(value => {
      const pokemon = JSON.parse(JSON.stringify(value))
      pokemon[0].statistics.draws++

      return this.httpClient.put(`${this.url}/pokemons/${pokemon[0].id}`, pokemon[0]).subscribe(value => { })
    })
  }

  // clearList() {
  //   this.httpClient.get(`${this.url}/pokemons`).subscribe(data => {
  //     const pokemons = JSON.parse(JSON.stringify(data))

  //     pokemons.forEach((value: any) => {
  //       return this.httpClient.delete(`${this.url}/pokemons/${value.id}`).subscribe(value => { })
  //     })

  //   })
  // }
}
