import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators'
import Swal from 'sweetalert2';
import { of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NutritionService {

  nutritionFacts$:Subject<any> = new Subject<any>();
  constructor(
    private _http:HttpClient
  ) { }

  getIndividualTextLineAnalysis(ingr:any){
    let params :Params={};
    params.app_id = environment.app_id;
    params.app_key = environment.app_key;
    params['nutrition-type']='cooking';
    params.ingr= ingr
    return this._http.get(environment.api_url_base+'nutrition-data',{params})
    .pipe(
      catchError(error => {
        console.log('Caught in CatchError.', error);
        Swal.fire({
          title: 'Error',
          text: error.error.message,
          icon: 'error',
          confirmButtonColor: '#198754',
        });
        return of(error);     //return from(['A','B','C'])
      })
    )
  }
  postFullRecipeAnalysis(ingr:any){
    let params :Params={};
    params.app_id = environment.app_id;
    params.app_key = environment.app_key;

    return this._http.post(environment.api_url_base+"nutrition-details",ingr,{params})
    .pipe(
      catchError(error => {
        console.log('Caught in CatchError.', error);
        Swal.fire({
          title: 'Error',
          text:  error.error.message,
          icon: 'error',
          confirmButtonColor: '#198754',
        });
        return of(error);  //return from(['A','B','C'])
      })
    )
  }
}
