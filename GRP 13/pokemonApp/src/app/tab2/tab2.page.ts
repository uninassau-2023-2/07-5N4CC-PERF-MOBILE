import { Component } from '@angular/core'
import { PhotoService } from '../services/PhotoService/photo.service'
import { PokeAPIServiceService } from '../services/PokeAPIService/poke-apiservice.service'
import { PokemomType } from 'src/types/pokemon'
import { IonRouterOutlet } from '@ionic/angular'
import { PokedexService } from '../services/PokedexService/pokedex.service'

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(public photoService: PhotoService, private pokeApiService: PokeAPIServiceService, private routerOutlet: IonRouterOutlet, private pokedexService: PokedexService) { }

  public pokemonTab2: PokemomType = {
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
  public label = {
    name: '',
    color: ''
  }

  // ngOnInit() {
  //   this.buscarPokemon()
  // }

  ionViewDidEnter() {
    this.buscarPokemon()
  }

  addNewToGallery() {
    this.photoService.addNewToGallery()
  }

  async buscarPokemon() {
    this.pokeApiService.getPokemonAPI().subscribe(value => {
      const formatValue = JSON.parse(JSON.stringify(value))

      this.pokemonTab2.abilities = formatValue.abilities.map((abilitie: any) => abilitie.ability.name)
      this.pokemonTab2.width = formatValue.weight
      this.pokemonTab2.height = formatValue.height
      this.pokemonTab2.name = formatValue.name
      this.pokemonTab2.image = formatValue.sprites.front_default

      const pokemonTab1 = this.pokeApiService.getPokemon()

      if (this.pokemonTab2.abilities.length === pokemonTab1.abilities.length) {
        this.label = {
          name: 'Empate',
          color: 'yellow'
        }
        this.pokedexService.addDrawPokemon(pokemonTab1.name)
      } else if (this.pokemonTab2.abilities.length > pokemonTab1.abilities.length) {
        this.label = {
          name: 'Ganhou',
          color: 'red'
        }
        this.pokedexService.addDefeatPokemon(pokemonTab1.name)
      } else if (this.pokemonTab2.abilities.length < pokemonTab1.abilities.length) {
        this.label = {
          name: 'Perdeu',
          color: 'green'
        }
        this.pokedexService.addVictoryPokemon(pokemonTab1.name)
      }
    })
  }
}
