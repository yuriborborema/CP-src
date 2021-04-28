import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { LogpComponent } from './logp/logp.component';
import { CadProdDepComponent } from './cad-prod-dep/cad-prod-dep.component';

const routes: Routes = [
    { path:'logp', component: LogpComponent},
    { path:'cad-prod-dep', component: CadProdDepComponent},
    { path: '', pathMatch: 'full', redirectTo: 'logp' },
    { path: 'cadProd-setFocus', pathMatch: 'full', redirectTo: 'logp' },    
    { path: '**', component: PagenotfoundComponent },
    

    ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
