import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { SingupComponent } from './singup/singup.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
    {path:'login', component: LoginComponent},
    {path:'singup', component: SingupComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule{}