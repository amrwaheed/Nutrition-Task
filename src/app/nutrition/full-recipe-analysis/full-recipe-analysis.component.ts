import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-full-recipe-analysis',
  templateUrl: './full-recipe-analysis.component.html',
  styleUrls: ['./full-recipe-analysis.component.scss']
})
export class FullRecipeAnalysisComponent implements OnInit {

  @Input() nutritionFacts:any;
  constructor() { }

  ngOnInit(): void {

  }

}
