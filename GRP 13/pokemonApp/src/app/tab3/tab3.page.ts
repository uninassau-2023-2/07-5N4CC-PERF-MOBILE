import { Component } from '@angular/core'
import { PokemomType } from 'src/types/pokemon'
import { IonRouterOutlet } from '@ionic/angular'
import { PokedexService } from '../services/PokedexService/pokedex.service'

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  public pokemons: PokemomType[] = []

  constructor(private pokedexService: PokedexService, private routerOutlet: IonRouterOutlet) { }

  // ngOnInit() {
  //   this.pokedexService.listPokemons().subscribe(value => {
  //     const pokemons = JSON.parse(JSON.stringify(value))
  //     this.pokemons = pokemons
  //   })
  // }

  ionViewDidEnter() {
    this.pokedexService.listPokemons().subscribe(value => {
      const pokemons = JSON.parse(JSON.stringify(value))
      this.pokemons = pokemons
    })
  }
}
