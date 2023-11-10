import { PokeAPIService } from './../services/poke-api.service';
import { PhotoService } from './../services/photo.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShareDataService } from '../services/shared-data.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  pokemonDataTab2: any;
  pokemonImageUrl: any;
  numberOfAbilitiesTab2!: number;
  numberOfAbilitiesTab1!: number;
  comparisonResult!: string;
  comparisonColor: any;


  constructor (private pokeAPIService: PokeAPIService, private photoService: PhotoService, private http: HttpClient, private shareDataService: ShareDataService) {}
  ngOnInit() {
    this.getPokemonData();
    this.getPokemonDataTab2();
    this.compareAbilities();

    this.numberOfAbilitiesTab1 = this.shareDataService.getNumberOfAbilitiesTab1();
  }

  getPokemonDataTab2 (){
      const randomPokemonID = Math.floor(Math.random()*100);
      const apiUrl = `https://pokeapi.co/api/v2/pokemon/${randomPokemonID}/`

      this.http.get(apiUrl).subscribe((data: any) => {
        this.pokemonDataTab2 = data;
        this.numberOfAbilitiesTab2 = data.abilities.length;
        this.compareAbilities();
      })
  }

  compareAbilities(){
    if (this.numberOfAbilitiesTab2 === this.numberOfAbilitiesTab1){
      this.comparisonResult = 'Empate';
      this.comparisonColor = 'yellow';
    }
    else if (this.numberOfAbilitiesTab2 > this.numberOfAbilitiesTab1){
      this.comparisonResult = 'Ganhou';
      this.comparisonColor = 'red';
  } else {
    this.comparisonResult = 'Perdeu';
      this.comparisonColor = 'green';
  }
  console.log('numberOfAbilitiesTab1:', this.numberOfAbilitiesTab1);
  console.log('numberOfAbilitiesTab2:', this.numberOfAbilitiesTab2);
  }

  getPokemonData(){
    const randomPokemonID = Math.floor(Math.random()*100);
    this.pokeAPIService.getPokeAPIService(randomPokemonID).subscribe((data:any) => {
      this.pokemonDataTab2 = data;
      this.pokemonImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`
      console.log ('Dados do Pokemon:', this.pokemonDataTab2);
    });

    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${randomPokemonID}/`;
    this.http.get(apiUrl).subscribe((data: any) => {
      this.pokemonDataTab2 = data;
      this.numberOfAbilitiesTab2 = data.abilities.length;
    })
  }

  addPhotoToGallery(){
    this.photoService.addNewToGallery();
  }
}

