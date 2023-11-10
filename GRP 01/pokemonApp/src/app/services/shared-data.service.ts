import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class ShareDataService {
    private numberOfAbilititesTab1!: number;

    setNumberOfAbilitiesTab1 (value: number){
        this.numberOfAbilititesTab1 = value;
    }
    getNumberOfAbilitiesTab1(){
        return this.numberOfAbilititesTab1;
    }
}