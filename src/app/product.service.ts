import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './product';
import { tap, delay, take } from 'rxjs/operators'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

    private readonly API = 'https://hdozero.herokuapp.com/products';

  constructor(private http: HttpClient) { }
  
  list(){
    return this.http.get<Product[]>(this.API)
        .pipe(
            delay(1000),
            tap(console.log)
        );
    
    }
    
    add(p: Product) {
        return this.http.post<Product>(this.API, p)
            .pipe(take(1));

    }
            
    update(p: Product){
        return this.http.put(`${this.API}/${p.id}`, p).pipe(take(1));
    
    }
            
    delete(p: Product){
        return this.http.delete(`${this.API}/${p.id}`).pipe(take(1));
    
    }
            
            
}
