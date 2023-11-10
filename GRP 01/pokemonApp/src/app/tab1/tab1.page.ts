import { viaCEPService } from './../services/via-cep.service';
import { PokeAPIService } from './../services/poke-api.service';
import { Component, OnInit } from '@angular/core';
import { ValueAccessor } from '@ionic/angular/common';
import { __values } from 'tslib';
import { ShareDataService } from '../services/shared-data.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  numberOfAbilitiesTab1: any;
  areaBuscarPokemon: string = '52011210';
  areaBusca: any = {
    bairro: '',
    localidade: '',
    logradouro: '',
    uf:''
  };
  
  constructor(private pokeAPIService: PokeAPIService, private viaCEPService: viaCEPService, private shareDataService: ShareDataService){}

  ngOnInit(): void {
    this.numberOfAbilitiesTab1 = 2;
    this.shareDataService.setNumberOfAbilitiesTab1(this.numberOfAbilitiesTab1);
  }
  buscarPokemon(){
    this.viaCEPService.getViaCEPService(this.areaBuscarPokemon).subscribe ((value) => {
      this.areaBusca.logradouro = JSON.parse (JSON.stringify(value)) ['logradouro'];
    this.areaBusca.bairro = ',' + JSON.parse (JSON.stringify(value)) ['bairro'];
    this.areaBusca.localidade = ',' + JSON.parse (JSON.stringify(value)) ['localidade'];
    this.areaBusca.uf = ',' + JSON.parse (JSON.stringify(value)) ['uf'];
    });   
  this.pokeAPIService.getPokeAPIService();
}
}
