import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Department } from '../department';
import { DepartmentsService } from '../departments.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { SucDialog } from '../dialogs/suc-dialog';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

   depName: string = '';
   departments: Department[] = [ ];
   depId: number = 0;
   isEdit: Department = null;
   
   departments$: Observable<Department[]>;
   
   
   
  constructor(private service: DepartmentsService, public dialog: MatDialog) { }

  ngOnInit() {
  
        // preencho a variavel
    this.service.list().subscribe(dados => this.departments = dados );
    this.proxId();
    
    this.departments$ = this.service.list();
    
  }
  
  proxId(){
       
        var highest = Number.NEGATIVE_INFINITY;
        var tmp;
        for (var i=this.departments.length-1; i>=0; i--) {
            tmp = this.departments[i].id;
            if (tmp > highest) highest = tmp;
        }
        this.depId = highest+1;
        
    }
  
  save(){
  
        if (this.isEdit){
            console.log(this.edit);
            this.service.update({"name": this.depName, "id": this.isEdit.id})
            .subscribe(
                sucess => { console.log('sucess');
                            this.dialog.open(SucDialog);
                            console.log('sucess');
                            this.departments$ = this.service.list();
                            this.service.alterouD(this.depName);
                            this.isEdit = null;
                            this.clearFields();
                            },
                error => console.error(error),
                () => console.log('request completo')
            );
    
        }else {
                this.service.add({"name": this.depName, "id": this.depId})
                .subscribe(
                    sucess => { console.log('sucess');
                                this.dialog.open(SucDialog);
                                console.log('sucess');
                                this.departments$ = this.service.list();
                                this.service.alterouD(this.depName);
                                this.clearFields();
                                },
                    error => console.error(error),
                    () => console.log('request completo')
                );
         }
    }
    
  clearFields(){
    this.depName = '';
    this.isEdit = null;
    }
  
  cancel(){
    this.clearFields();
}
  
  edit(dep: Department){
        this.isEdit = dep;
        this.depName = dep.name;
                
    }
  
  delete(dep: Department){
    this.service.delete(dep)
            .subscribe(
                sucess => { console.log('sucess');
                            this.dialog.open(SucDialog);
                            console.log('sucess');
                            this.departments$ = this.service.list();
                            this.service.alterouD(this.depName);
                            this.isEdit = null;
                            this.clearFields();
                            },
                error => console.error(error),
                () => console.log('request completo')
            );
    
    }

}
