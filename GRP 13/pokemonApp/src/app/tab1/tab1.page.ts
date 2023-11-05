import { Component } from '@angular/core'
import { ViaCepServiceService } from '../services/ViaCepService/via-cep-service.service'
import { PokeAPIServiceService } from '../services/PokeAPIService/poke-apiservice.service'

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private viaCepService: ViaCepServiceService, private pokeApiService: PokeAPIServiceService) { }

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
  public pokemon = {
    abilities: [],
    name: '',
    width: 0,
    height: 0,
    image: ''
  }

  buscarPokemon() {
    this.viaCepService.getViaCep(this.cep).subscribe(value => {
      const formatValue = JSON.parse(JSON.stringify(value))

      this.adress.neighborhood = formatValue.bairro
      this.adress.locality = formatValue.localidade
      this.adress.place = formatValue.logradouro
      this.adress.uf = formatValue.uf
    })

    this.pokeApiService.getPokemon().subscribe(value => {
      const formatValue = JSON.parse(JSON.stringify(value))

      this.pokemon.abilities = formatValue.abilities
      this.pokemon.width = formatValue.weight
      this.pokemon.height = formatValue.height
      this.pokemon.name = formatValue.name
      this.pokemon.image = formatValue.sprites.front_default
    })
  }
}
