import { viaCEPService } from './../services/via-cep.service';
import { PokeAPIService } from './../services/poke-api.service';
import { Component } from '@angular/core';
//import { ValueAccessor } from '@ionic/angular';
// import { __values } from 'tslib';
import { ShareDataService } from '../services/shared-data.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  
  areaBuscarPokemon: string = '52011210';
  areaBusca: any = {
    bairro: '',
    localidade: '',
    logradouro: '',
    uf:''
  };
  
  pokemonDataTab1 = {
    name: '',
    abilities: 0,
    front_default: '',
    height: '',
    weight: ''
  };
  pokemonImageUrl1: string = '';
  
  constructor(
    private pokeAPIService: PokeAPIService,
    private viaCEPService: viaCEPService,
    private shareDataService: ShareDataService,
    private http: HttpClient
    ) { }

  buscarPokemon(){
    this.viaCEPService.getViaCEPService(this.areaBuscarPokemon).subscribe ((value) => {
      this.areaBusca.logradouro = JSON.parse (JSON.stringify(value))['logradouro'];
      this.areaBusca.bairro = ',' + JSON.parse (JSON.stringify(value)) ['bairro'];
      this.areaBusca.localidade = ',' + JSON.parse (JSON.stringify(value)) ['localidade'];
      this.areaBusca.uf = ',' + JSON.parse (JSON.stringify(value)) ['uf'];
    });
    this.pokeAPIService.getPokeAPIService().subscribe((value) => {
      this.pokemonDataTab1.name = JSON.parse(JSON.stringify(value))['name'];
      this.pokemonDataTab1.abilities = JSON.parse(JSON.stringify(value))['abilities'].length;
      this.pokemonDataTab1.front_default = JSON.parse(JSON.stringify(value))['sprites']['other']['dream_world']['front_default'];
      this.pokemonDataTab1.height = JSON.parse(JSON.stringify(value))['height'];
      this.pokemonDataTab1.weight = JSON.parse(JSON.stringify(value))['weight'];
      //
      this.shareDataService.setNumberOfAbilitiesTab1(this.pokemonDataTab1.abilities);

      this.shareDataService.setCapturedPokemon({
        name: this.pokemonDataTab1.name,
        abilities: this.pokemonDataTab1.abilities,
        front_default: this.pokemonDataTab1.front_default,
        height: this.pokemonDataTab1.height,
        weight: this.pokemonDataTab1.weight
      });      
      this.shareDataService.addPokemonToPokedex();
    });    
  }
  numberOfAbilitiesTab1 = this.pokemonDataTab1.abilities;
 
}


