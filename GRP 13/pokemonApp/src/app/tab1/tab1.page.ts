import { Component } from '@angular/core'
import { ViaCepServiceService } from '../services/ViaCepService/via-cep-service.service'
import { PokeAPIServiceService } from '../services/PokeAPIService/poke-apiservice.service'
import { PokemomType } from 'src/types/pokemon'
import { SalvarDadosService } from '../services/SalvarDadosService/salvar-dados.service'
import { PokedexService } from '../services/PokedexService/pokedex.service'

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private viaCepService: ViaCepServiceService, private pokeApiService: PokeAPIServiceService, private pokedexService: PokedexService) { }

  ngOnInit() {
    this.buscarPokemon()
  }

  public cep = '52011210'
  public adress = {
    neighborhood: '',
    locality: '',
    place: '',
    uf: ''
  }
  pokemon: PokemomType = {
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

  buscarPokemon() {
    this.viaCepService.getViaCep(this.cep).subscribe(value => {
      const formatValue = JSON.parse(JSON.stringify(value))

      this.adress.neighborhood = formatValue.bairro
      this.adress.locality = formatValue.localidade
      this.adress.place = formatValue.logradouro
      this.adress.uf = formatValue.uf
    })

    this.pokeApiService.getPokemonAPI().subscribe(value => {
      const formatValue = JSON.parse(JSON.stringify(value))

      this.pokemon.abilities = formatValue.abilities.map((abilitie: any) => abilitie.ability.name)
      this.pokemon.width = formatValue.weight
      this.pokemon.height = formatValue.height
      this.pokemon.name = formatValue.name
      this.pokemon.image = formatValue.sprites.front_default

      this.pokeApiService.setPokemon(this.pokemon)
      // this.pokeApiService.setPokemonsList(this.pokeApiService.getPokemon())

      this.pokedexService.getPokemonByName(formatValue.name).subscribe(value => {
        const isExists = JSON.parse(JSON.stringify(value)).length > 0 ? true : false

        if (!isExists) {
          this.pokedexService.setPokemom(this.pokemon).subscribe({})
        }
      })
    })
  }
}
