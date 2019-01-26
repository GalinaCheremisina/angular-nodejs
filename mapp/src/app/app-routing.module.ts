import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { NgModule } from '@angular/core';

import { PostsComponent } from './posts/posts.component';

const routes: Routes = [
    {path:'', component: PostsComponent},
    {path:'auth', loadChildren: "./auth/auth.module#AuthModule"}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        preloadingStrategy: PreloadAllModules
      })],
    exports: [RouterModule]
})
export class AppRoutingModule{}