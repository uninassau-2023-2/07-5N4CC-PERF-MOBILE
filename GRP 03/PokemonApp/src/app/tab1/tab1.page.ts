import { Component } from '@angular/core';
import { PokeAPIService } from '../services/poke-api.service';
import { ViaCEPService } from '../services/via-cep.service';
import { SharedAbilitiesService } from '../services/shared-abilities.service';

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
    uf: '',
  };
  
  pokemon: any = {
    name: '',
    abilities: [],
    height: 0,
    weight: 0,
    imageUrl: '',
  };

  numberOfAbilitiesTab1: any;

  constructor(
    private pokeAPIService: PokeAPIService,
    private viaCEPService: ViaCEPService,
    private sharedAbilitiesService: SharedAbilitiesService
  ) {}

  ngOnInit(): void {
    this.numberOfAbilitiesTab1 = 2;
    this.sharedAbilitiesService.setNumberOfAbilitiesTab1(this.numberOfAbilitiesTab1);
  }

  buscarPokemon() {
    this.viaCEPService.getViaCEPService(this.areaBuscarPokemon)
    .subscribe((value) => {
      this.areaBusca.logradouro = JSON.parse(JSON.stringify(value)) ['logradouro'];
      this.areaBusca.bairro = ', ' + JSON.parse(JSON.stringify(value)) ['bairro'];
      this.areaBusca.localidade = ' - ' + JSON.parse(JSON.stringify(value)) ['localidade'];
      this.areaBusca.uf = '-' + JSON.parse(JSON.stringify(value)) ['uf'];
    });


    const pokemonId = Math.floor(Math.random() * 100) + 1;

    this.pokeAPIService.getPokeAPIService(pokemonId)
    .subscribe((pokemonData: any) => {
      this.pokemon.name = pokemonData.name.toUpperCase();
      this.pokemon.abilities = [pokemonData.abilities.length];
      this.pokemon.height = pokemonData.height;
      this.pokemon.weight = pokemonData.weight;
      this.pokemon.imageUrl = pokemonData.sprites.other.dream_world.front_default;
      });
  };
}
