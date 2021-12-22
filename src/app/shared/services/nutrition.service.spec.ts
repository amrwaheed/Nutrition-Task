

import { HttpClientTestingModule ,HttpTestingController} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { NutritionService } from './nutrition.service';

describe('NutritionService', () => {
  let service: NutritionService;

  let httpTestingController:HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(NutritionService);

    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getIndividualTextLineAnalysis(ingr) and get the correct data and Method is GET' , ()=>{
   // Arrange
    let ingr = '1 cup rice';
    const dataRecived = {
      "calories": 702,
      "cautions": [],
      "dietLabels": ["LOW_FAT", "LOW_SODIUM"],
      "healthLabels": ["FAT_FREE", "LOW_FAT_ABS", "SUGAR_CONSCIOUS", "LOW_SUGAR", "LOW_POTASSIUM", "KIDNEY_FRIENDLY"],
      "totalDaily": {ENERC_KCAL: {label: "Energy", quantity: 35.1, unit: "%"}},
      "totalNutrients": {ENERC_KCAL: {label: "Energy", quantity: 702, unit: "kcal"}},
      "totalNutrientsKCal": {ENERC_KCAL: {label: "Energy", quantity: 701, unit: "kcal"}},
      "totalWeight": 195,
      "uri": "http://www.edamam.com/ontologies/edamam.owl#recipe_0aebf66a83694b83acaf09d1092f8499",
    }
    	// Act
    service.getIndividualTextLineAnalysis(ingr).subscribe((data)=>{
        // Assert
      expect(data.calories).toEqual(dataRecived.calories);
      expect(data.totalWeight).toBe(dataRecived.totalWeight);
    });
    const req = httpTestingController.expectOne('https://api.edamam.com/api/nutrition-data?app_id=beb304c3&app_key=a03848fda0086729c9da6361b53d8d96&nutrition-type=cooking&ingr=1%20cup%20rice');
    expect(req.request.method).toEqual('GET');
    req.flush(dataRecived);
  })
  it('should call postFullRecipeAnalysis(ingr) and get the correct data and Method is Post' , ()=>{
    // Arrange
    let ingr = ['1 cup rice'];
    const dataRecived = {
      "calories": 702,
      "cautions": [],
      "dietLabels": ["LOW_FAT", "LOW_SODIUM"],
      "healthLabels": ["FAT_FREE", "LOW_FAT_ABS", "SUGAR_CONSCIOUS", "LOW_SUGAR", "LOW_POTASSIUM", "KIDNEY_FRIENDLY"],
      "totalDaily": {ENERC_KCAL: {label: "Energy", quantity: 35.1, unit: "%"}},
      "totalNutrients": {ENERC_KCAL: {label: "Energy", quantity: 702, unit: "kcal"}},
      "totalNutrientsKCal": {ENERC_KCAL: {label: "Energy", quantity: 701, unit: "kcal"}},
      "totalWeight": 195,
      "uri": "http://www.edamam.com/ontologies/edamam.owl#recipe_0aebf66a83694b83acaf09d1092f8499",
      "yield": 4
    }
    	// Act
    service.postFullRecipeAnalysis(ingr).subscribe((data)=>{
        // Assert
      expect(data.calories).toEqual(dataRecived.calories);
      expect(data.totalWeight).toBe(dataRecived.totalWeight);
    });
    const req = httpTestingController.expectOne('https://api.edamam.com/api/nutrition-details?app_id=beb304c3&app_key=a03848fda0086729c9da6361b53d8d96');
    expect(req.request.method).toEqual('POST');
    req.flush(dataRecived);
  })
});
