import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { PokeAPIService } from '../services/poke-api.service';
import { HttpClient } from '@angular/common/http';
import { SharedAbilitiesService } from '../services/shared-abilities.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  pokemon: any = {
    name: '',
    abilities: [],
    height: 0,
    weight: 0,
    imageUrl: '',
  };

  numberOfAbilitiesTab2!: number;
  numberOfAbilitiesTab1!: number;
  battleResult!: string;
  resultColor: any;
  

  constructor(
    public photoService: PhotoService,
    private pokeAPIService: PokeAPIService,
    private http: HttpClient,
    private sharedAbilitiesService: SharedAbilitiesService
  ) {}
   
  ngOnInit() {
    this.loadRandomPokemon();
    this.loadRandomPokemon2();
    this.numberOfAbilitiesTab1 = this.sharedAbilitiesService.getNumberOfAbilitiesTab1();
    this.compareAbilities();
  }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  };

  loadRandomPokemon2() {
    const apiUrl = 'https://pokeapi.co/api/v2/pokemon/${randomPokemonID}/'
    this.http.get(apiUrl).subscribe((data: any) => {
      this.loadRandomPokemon2 = data;
      this.numberOfAbilitiesTab2 = data.abilities.length;
      this.compareAbilities();
    })
  }

  compareAbilities() {
    if (this.numberOfAbilitiesTab2 === this.numberOfAbilitiesTab1){
      this.battleResult = 'Empate';
      this.resultColor = 'yellow';
    }  else if (this.numberOfAbilitiesTab2 > this.numberOfAbilitiesTab1){
      this.battleResult = 'Ganhou';
      this.resultColor = 'red';
    } else {
      this.battleResult = 'Perdeu';
        this.resultColor = 'green';
    } 
    console.log('numberOfAbilitiesTab1:', this.numberOfAbilitiesTab1);
    console.log('numberOfAbilitiesTab2:', this.numberOfAbilitiesTab2);
  }

  
  loadRandomPokemon() {
    this.pokeAPIService.getPokeAPIService()
   .subscribe((pokemonData: any) => {
        this.pokemon.name = pokemonData.name.toUpperCase();
        this.pokemon.abilities = [pokemonData.abilities.length];
        this.pokemon.height = pokemonData.height;
        this.pokemon.weight = pokemonData.weight;
        this.pokemon.imageUrl = pokemonData.sprites.other.dream_world.front_default;

      });
  }
}


