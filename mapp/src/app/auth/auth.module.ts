import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { SingupComponent } from './singup/singup.component';

@NgModule({
    declarations: [
        LoginComponent,
        SingupComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        AuthRoutingModule,
    ],
    exports: [],
})
export class AuthModule {}
