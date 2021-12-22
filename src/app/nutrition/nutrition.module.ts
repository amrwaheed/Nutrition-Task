import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NutritionRoutingModule } from './nutrition-routing.module';
import { NutritionComponent } from './nutrition.component';
import { SharedModule } from '../shared/shared.module';
import { NutritionListTableComponent } from './nutrition-list-table/nutrition-list-table.component';
import { FullRecipeAnalysisComponent } from './full-recipe-analysis/full-recipe-analysis.component';


@NgModule({
  declarations: [
    NutritionComponent,
    NutritionListTableComponent,
    FullRecipeAnalysisComponent
  ],
  imports: [
    CommonModule,
    NutritionRoutingModule,
    SharedModule
  ]
})
export class NutritionModule { }
