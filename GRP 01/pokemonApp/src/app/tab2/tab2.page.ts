import { PokeAPIService } from './../services/poke-api.service';
import { PhotoService } from './../services/photo.service';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShareDataService } from '../services/shared-data.service';
import { viaCEPService } from '../services/via-cep.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  areaBuscarPokemon: string = '52011210';
  areaBusca: any = {
    bairro: '',
    localidade: '',
    logradouro: '',
    uf:''
  };

  pokemonDataTab2 = {
    name: '',
    abilities: '',
    front_default: '',
    height: '',
    weight: ''
  };
  pokemonImageUrl: string = '';
  numberOfAbilitiesTab2!: number;
  numberOfAbilitiesTab1!: number;
  comparisonResult: string = '';
  comparisonColor: string = '';


  constructor (
    private pokeAPIService: PokeAPIService,
    private photoService: PhotoService,
    private http: HttpClient,
    private shareDataService: ShareDataService,
    private viaCEPService: viaCEPService
    ) {
    this.numberOfAbilitiesTab1 = this.shareDataService.getNumberOfAbilitiesTab1();
  }

  ngOnInit() {

  }

  getPokemonDataTab2 (){
      const randomPokemonID = Math.floor(Math.random()*100);
      const apiUrl = `https://pokeapi.co/api/v2/pokemon/${randomPokemonID}/`

      this.http.get(apiUrl).subscribe((data: any) => {
        this.pokemonDataTab2 = JSON.parse(JSON.stringify(data));
        this.numberOfAbilitiesTab2 = this.pokemonDataTab2.abilities.length;
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

  buscarPokemon(){
    this.viaCEPService.getViaCEPService(this.areaBuscarPokemon).subscribe ((value) => {
      this.areaBusca.logradouro = JSON.parse (JSON.stringify(value))['logradouro'];
      this.areaBusca.bairro = ',' + JSON.parse (JSON.stringify(value)) ['bairro'];
      this.areaBusca.localidade = ',' + JSON.parse (JSON.stringify(value)) ['localidade'];
      this.areaBusca.uf = ',' + JSON.parse (JSON.stringify(value)) ['uf'];
    });

    this.pokeAPIService.getPokeAPIService().subscribe((value) => {

      this.pokemonDataTab2.name = JSON.parse(JSON.stringify(value))['name'];
      this.pokemonDataTab2.abilities = JSON.parse(JSON.stringify(value))['abilities'].length;
      this.pokemonDataTab2.front_default = JSON.parse(JSON.stringify(value))['sprites']['other']['dream_world']['front_default'];
      this.pokemonDataTab2.height = JSON.parse(JSON.stringify(value))['height'];
      this.pokemonDataTab2.weight = JSON.parse(JSON.stringify(value))['weight'];

      this.getPokemonDataTab2();
      this.compareAbilities();
    });
  }
  addPhotoToGallery(){
  this.photoService.addNewToGallery();
  }
}
