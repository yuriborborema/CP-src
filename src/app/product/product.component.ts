import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { Department } from '../department';
import { ProductService } from '../product.service';
import { DepartmentsService } from '../departments.service';
import { Observable, Subscription, BehaviorSubject } from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import { SucDialog } from '../dialogs/suc-dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {FormControl} from '@angular/forms';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  prodName: string = '';
  prodPrice: number = 0.00;
  prodStock: number = 0.00;
  prodDeps: Department[] = [];
   products: Product[] = [ ];
   prodId: number = 0;
   isEdit: Product = null;
   
   products$: Observable<Product[]>;
   
   departments$: Observable<Department[]>;
   
   altD: Subscription;
   
   depFC = new FormControl();
   
   
  constructor(
        private service: ProductService,
        private depService: DepartmentsService, 
        public dialog: MatDialog,
        //private fb: FormBuilder,            
        ) { }

  ngOnInit() {
  
        // preencho a variavel
    this.service.list().subscribe(dados => this.products = dados );
    this.proxId();
    
    this.products$ = this.service.list();
    
    this.departments$ = this.depService.list();
    this.altD = this.depService.obterAlteracao().subscribe(
        v =>{this.departments$ = this.depService.list()}
        );
    
  }
  
  proxId(){
       
        var highest = Number.NEGATIVE_INFINITY;
        var tmp;
        for (var i=this.products.length-1; i>=0; i--) {
            tmp = this.products[i].id;
            if (tmp > highest) highest = tmp;
        }
        this.prodId = highest+1;
        
    }
  
  save(){
  
        if (this.isEdit){
            console.log(this.prodDeps);
            let aux : string[] = [];
            for (let d of this.prodDeps){aux.push(d.name)};
            this.service.update({
                "name": this.prodName, 
                "id": this.isEdit.id,
                "departments": aux,
                "stock": this.prodStock,
                "price": this.prodPrice,               
                })
            .subscribe(
                sucess => { console.log('sucess');
                            this.dialog.open(SucDialog);
                            console.log('sucess');
                            this.products$ = this.service.list();
                            this.isEdit = null;
                            this.clearFields();
                            },
                error => console.error(error),
                () => console.log('request completo')
            );
    
        }else {
                console.log(this.prodDeps);
                let aux : string[] = [];
                for (let d of this.prodDeps){aux.push(d.name)};
                this.service.add({
                    "name": this.prodName, 
                    "id": this.prodId,
                    "departments": aux,
                    "stock": this.prodStock,
                    "price": this.prodPrice,               
                    })
                .subscribe(
                    sucess => { console.log('sucess');
                                this.dialog.open(SucDialog);
                                console.log('sucess');
                                this.products$ = this.service.list();
                                this.clearFields();
                                },
                    error => console.error(error),
                    () => console.log('request completo')
                );
         }
    }
    
  clearFields(){
    this.prodName = '';
    this.prodPrice = 0;
    this.prodStock = 0;
    this.prodDeps = null;
    this.isEdit = null;
    
    }
  
  cancel(){
    this.clearFields();
}
  
  edit(pro: Product){
        this.isEdit = pro;
        this.prodName = pro.name;
        this.prodStock = pro.stock;
        this.prodPrice = pro.price;
        //this.prodDeps = pro.departments;
                
    }
  
  delete(pro: Product){
    this.service.delete(pro)
            .subscribe(
                sucess => { console.log('sucess');
                            this.dialog.open(SucDialog);
                            console.log('sucess');
                            this.products$ = this.service.list();
                            this.isEdit = null;
                            this.clearFields();
                            },
                error => console.error(error),
                () => console.log('request completo')
            );
    
    }
    
    teste(d: Department[]){
        
        for (let n of d){
            //prod
    
            }
    }

}


