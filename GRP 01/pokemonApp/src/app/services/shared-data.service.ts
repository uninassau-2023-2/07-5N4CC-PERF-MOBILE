import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class ShareDataService {
    private numberOfAbilititesTab1!: number;
    private capturedPokemon: any;
    private pokemons: any[] = [];

    setNumberOfAbilitiesTab1 (value: number){
        this.numberOfAbilititesTab1 = value;
    }
    getNumberOfAbilitiesTab1(){
        return this.numberOfAbilititesTab1;
    }

    setCapturedPokemon(pokemon: any){
        this.capturedPokemon = pokemon;
    }
    getCapturedPokemon(){
        return this.capturedPokemon;
    }

    addPokemonToPokedex() {
        if(this.capturedPokemon){
            this.pokemons.push({
                name: this.capturedPokemon.name,
                front_default: this.capturedPokemon.front_default,
                vitorias: this.capturedPokemon.vitorias,
                derrotas: this.capturedPokemon.derrotas,
                empates: this.capturedPokemon.empates
            });
        }
    }
    getPokemons(){
        return this.pokemons;
    }
}