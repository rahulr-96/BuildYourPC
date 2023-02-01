import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { map, tap } from 'rxjs/operators';
import { CPUService } from '../products/cpu/cpu.service';
import { CPU } from '../products/cpu/cpu.model';
import { PCPartsService } from '../pcparts-list/pcparts.service';
import { CPUCooler } from '../products/cpu-cooler/cpu-cooler.model';
import { CPUCoolerService } from '../products/cpu-cooler/cpu-cooler.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private cpuService: CPUService,
    private cpuCoolerService: CPUCoolerService,
    private pcPartsService: PCPartsService
  ) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(
        'https://shoppingappapi-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json',
        recipes
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>('https://shoppingappapi-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json')
      .pipe( map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }), tap((recipes) => {
          this.recipeService.setRecipes(recipes);
        })
      );
  }

  fetchCPU(){
    return this.http
      .get<CPU[]>('https://shoppingappapi-default-rtdb.asia-southeast1.firebasedatabase.app/cpu.json')
      .pipe( map((cpus) => {
          return cpus.map((cpu) => {
            return {
              ...cpu
            };
          });
        }), tap((cpus) => {
          this.cpuService.setCpus(cpus);
        })
      );
  }
  
  fetchCPUCooler(){
    return this.http
      .get<CPUCooler[]>('https://shoppingappapi-default-rtdb.asia-southeast1.firebasedatabase.app/cpu-cooler.json')
      .pipe( map((cpuCooler) => {
          return cpuCooler.map((cpuCooler) => {
            return {
              ...cpuCooler
            };
          });
        }), tap((cpuCooler) => {
          this.cpuCoolerService.setCPUCoolers(cpuCooler);
        })
      );
  }

  storePCParts() {
    const pcParts = this.pcPartsService.getPCparts();
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));

    this.http
      .put(
        'https://shoppingappapi-default-rtdb.asia-southeast1.firebasedatabase.app/pcBuild/'+userData.id+'/pcParts.json',
        pcParts
      )
      .subscribe((response) => {
        console.log(response);
      });
  }
  
}
