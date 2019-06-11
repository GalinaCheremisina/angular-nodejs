import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material';

import { PostCreateComponent } from './post-create/post-create.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostsComponent } from './posts.component';
import { PostRoutingModule } from './post-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        PostsComponent,
        PostCreateComponent,
        PostListComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        MatPaginatorModule,
        PostRoutingModule,
    ],
    exports: [PostsComponent]
})
export class PostsModule {}
