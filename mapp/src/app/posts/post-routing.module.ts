import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PostListComponent } from './post-list/post-list.component';
import { PostCreateComponent } from './post-create/post-create.component';
import { AuthGuard } from '../shared/services/auth.guard';

const routes: Routes = [
    {path: '', component: PostListComponent},
    {path: 'create', component: PostCreateComponent, canActivate: [AuthGuard]},
    {path: 'edit/:postId', component: PostCreateComponent, canActivate: [AuthGuard]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class PostRoutingModule {}
