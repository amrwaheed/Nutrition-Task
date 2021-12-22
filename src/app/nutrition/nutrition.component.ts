import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { NutritionService } from '../shared/services/nutrition.service';
export interface IngredientList {
  quantity?: string;
  unit: string;
  food?: string;
  calories?: string;
  weight?: string
}
@Component({
  selector: 'app-nutrition',
  templateUrl: './nutrition.component.html',
  styleUrls: ['./nutrition.component.scss']
})
export class NutritionComponent implements OnInit {

  nutritionForm: FormGroup = new FormGroup({});
  ingredients: IngredientList[] = [];
  nutritionFacts:any;
  constructor(
    private fb: FormBuilder,
    private nutritionServ: NutritionService
  ) { }

  ngOnInit(): void {
    this.nutritionForm = this.fb.group({
      ingr: ['', [Validators.required]]
    });

    this.nutritionServ.nutritionFacts$.subscribe(data=>{
      this.nutritionFacts = data;
    })
  }


  public get ingr(): FormControl {
    return this.nutritionForm.get('ingr') as FormControl;
  }



  onSubmit() {
    this.ingredients =[];
    this.nutritionServ.nutritionFacts$.next(null)
    let data = this.nutritionForm.value;
    data.ingrArr = data.ingr?.split(',');
    data.ingrArr?.forEach((element: any) => {
      this.nutritionServ.getIndividualTextLineAnalysis(element).subscribe((res: any) => {
        if (res.calories>0 || res.totalWeight>0) {
          let seperated = element.trim().split(' ');
          let ingred: IngredientList = { quantity: seperated[0], unit: seperated[1], food: seperated[2], calories: res.calories + ' kcal', weight: Math.round(res.totalWeight) + ' g' };
          this.ingredients.push(ingred);
        }else{
          Swal.fire({
            title: 'Error',
            text: 'format not correct',
            icon: 'error',
            confirmButtonColor: '#198754',
          });
        }
      },
      )
    });

  }
  /**
   * to generate new recipe
   * reset form and array of [ingredients]
   */
  newRecipe(){
    this.ingredients = [];
    this.nutritionForm.reset();
    this.nutritionServ.nutritionFacts$.next(null)
  }



}
