import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { SingupComponent } from './singup/singup.component';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
    declarations: [
        LoginComponent,
        SingupComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        AuthRoutingModule
    ],
    exports: []
})
export class AuthModule{}