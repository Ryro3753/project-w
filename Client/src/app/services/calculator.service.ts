import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"



@Injectable({
  providedIn: "root"
})
export class CalculatorService {
  constructor() {  }

  calculateAbilityModifierRaw(ability: number): number{
    return Math.floor((ability - 10) / 2);
  }

}