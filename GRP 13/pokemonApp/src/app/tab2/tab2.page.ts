import { Component } from '@angular/core'
import { PhotoService } from '../services/PhotoService/photo.service'
import { PokeAPIServiceService } from '../services/PokeAPIService/poke-apiservice.service'
import { SalvarDadosService } from '../services/SalvarDadosService/salvar-dados.service'

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(public photoService: PhotoService, private pokeApiService: PokeAPIServiceService, private salvarDados: SalvarDadosService) { }

  public pokemonTab2 = {
    abilities: [],
    name: '',
    width: 0,
    height: 0,
    image: ''
  }
  public label = {
    name: '',
    color: ''
  }

  ngOnInit() {
    this.buscarPokemon()
  }

  addNewToGallery() {
    this.photoService.addNewToGallery()
  }

  async buscarPokemon() {
    this.pokeApiService.getPokemon().subscribe(value => {
      const formatValue = JSON.parse(JSON.stringify(value))

      this.pokemonTab2.abilities = formatValue.abilities
      this.pokemonTab2.width = formatValue.weight
      this.pokemonTab2.height = formatValue.height
      this.pokemonTab2.name = formatValue.name
      this.pokemonTab2.image = formatValue.sprites.front_default

      const pokemonTab1 = this.salvarDados.getDado('pokemonTab1')

      if (this.pokemonTab2.abilities.length === pokemonTab1.abilities.length) {
        this.label = {
          name: 'Empate',
          color: 'yellow'
        }
      } else if (this.pokemonTab2.abilities.length > pokemonTab1.abilities.length) {
        this.label = {
          name: 'Ganhou',
          color: 'red'
        }
      } else if (this.pokemonTab2.abilities.length < pokemonTab1.abilities.length) {
        this.label = {
          name: 'Perdeu',
          color: 'green'
        }
      }
    })
  }
}
