import { Component } from '@angular/core';
import { PokeAPIService } from '../services/poke-api.service';
import { ShareDataService } from '../services/shared-data.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

 pokemons: any[] = [];

  constructor(
    private pokeAPIService: PokeAPIService,
    private shareDataService: ShareDataService
  ) {}

  ngOnInit() {
    this.loadPokemons();
    this.pokemons = this.shareDataService.getPokemons();
    console.log("teste")
  }

  loadPokemons(){
    const capturedPokemon = this.shareDataService.getCapturedPokemon();

    this.pokemons.push({
      name: capturedPokemon.name,
      front_default: capturedPokemon.front_default,
      vitorias: capturedPokemon.vitorias,
      derrotas: capturedPokemon.derrotas,
      empates: capturedPokemon.empates
    });

  }

}
