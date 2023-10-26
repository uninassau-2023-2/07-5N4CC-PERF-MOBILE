import { Component } from '@angular/core';
import { SenhaService } from '../services/senha.service';

export class Senha {
  data: string;
  tipo: string;
  ordem: string;

  constructor(data: string, tipo: string, ordem: string) {
    this.data = data;
    this.tipo = tipo;
    this.ordem = ordem;
  }
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  inputNovaSenha: string = '';
  senhas: Senha[] = [];
  proximasSenhas: Senha[] = [];
  contadores: { [tipo: string]: number } = {};
  senhaAtual: Senha | null = null;

  constructor(public senhaService: SenhaService) {}

  gerarSenha(tipo: string) {
    this.senhaService.novaSenha(tipo); 
    const dataAtual = new Date().toLocaleDateString('pt-BR');
  
    let ordem: string = '00';
  
    if (this.contadores[tipo]) {
      ordem = (this.contadores[tipo] + 1).toString().padStart(2, '0');
    }
  
    this.senhaAtual = this.proximasSenhas.length > 0 ? this.proximasSenhas[0] : null;
    this.proximasSenhas.push(new Senha(dataAtual, tipo, ordem));
    
    if (this.proximasSenhas.length > 5) {
      this.proximasSenhas.shift();
    }
  
    this.contadores[tipo] = this.contadores[tipo] ? this.contadores[tipo] + 1 : 1;
  }

  avancarProximaSenha() {
    if (this.proximasSenhas.length > 0) {
      this.senhaAtual = this.proximasSenhas.shift() as Senha;
    }
  }
}