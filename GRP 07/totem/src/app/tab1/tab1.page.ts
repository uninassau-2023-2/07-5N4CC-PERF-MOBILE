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
  filaProximasSenhas: Senha[] = [];

  constructor(public senhaService: SenhaService) {}

  gerarSenha(tipo: string) {
    this.senhaService.novaSenha(tipo);
    const dataAtual = new Date().toLocaleDateString('pt-BR');

    let ordem: string = '00';

    if (this.contadores[tipo]) {
      ordem = (this.contadores[tipo] + 1).toString().padStart(2, '0');
    }

    const novaSenha = new Senha(dataAtual, tipo, ordem);

    if (!this.senhaAtual) {
      // Se não houver senha atual, defina a nova senha como a senha atual.
      this.senhaAtual = novaSenha;
    } else {
      // Senão, adicione a nova senha à fila de próximas senhas.
      this.filaProximasSenhas.push(novaSenha);

      if (this.filaProximasSenhas.length > 5) {
        this.filaProximasSenhas.shift();
      }
    }

    this.contadores[tipo] = this.contadores[tipo] ? this.contadores[tipo] + 1 : 1;
  }

  avancarProximaSenha() {
    if (this.filaProximasSenhas.length > 0) {
      // Move a senha atual para uma variável temporária
      const senhaTemp = this.senhaAtual;

      // Remove a senha atual da fila de próximas senhas
      this.filaProximasSenhas.shift();

      // Adicione a senha temporária de volta à fila de próximas senhas
      if (senhaTemp) {
        this.filaProximasSenhas.push(senhaTemp);
      }

      // Defina a próxima senha na fila como a senha atual
      this.senhaAtual = this.filaProximasSenhas[0];
    }
  }
}