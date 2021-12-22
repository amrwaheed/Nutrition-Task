import { Component, Input, OnInit } from '@angular/core';
import { NutritionService } from 'src/app/shared/services/nutrition.service';

@Component({
  selector: 'app-nutrition-list-table',
  templateUrl: './nutrition-list-table.component.html',
  styleUrls: ['./nutrition-list-table.component.scss']
})
export class NutritionListTableComponent implements OnInit {

  @Input()ingredients :any;
  @Input()formValue :any;
  constructor(
    private nutritionServ: NutritionService
  ) { }

  ngOnInit(): void {
  }

  totalNutrition(){
    let data = {...this.formValue};
        data.ingr = data.ingr.split(',')
      this.nutritionServ.postFullRecipeAnalysis(data).subscribe(res=>{

        this.nutritionServ.nutritionFacts$.next(res); // pass data throw subject
      })

  }

}
