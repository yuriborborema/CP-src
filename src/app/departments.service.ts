import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Department } from './department';
import { tap, delay, take } from 'rxjs/operators'; 
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {

    private readonly API = 'https://hdozero.herokuapp.com/departments';
    
    private alterouDepsBS = new BehaviorSubject<string>(`Dio - Egypt`);

  constructor(private http: HttpClient) { }
  
  list(){
    return this.http.get<Department[]>(this.API)
        .pipe(
            delay(1000),
            tap(console.log)
        );
    
    }
    
    add(d: Department) {
        return this.http.post<Department>(this.API, d)
            .pipe(take(1));

    }
            
    update(d: Department){
        return this.http.put(`${this.API}/${d.id}`, d).pipe(take(1));
    
    }
            
    delete(d: Department){
        return this.http.delete(`${this.API}/${d.id}`).pipe(take(1));
    
    }
            
    alterouD(v: string){
        this.alterouDepsBS.next(v);
        
    }
    obterAlteracao(){
        return this.alterouDepsBS;
    }
  
  
}
