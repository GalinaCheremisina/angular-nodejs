import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material';

import { Post } from 'src/app/shared/model/post.model';
import { PostService } from 'src/app/shared/services/post.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  private postSub: Subscription;
  private authSub: Subscription;
  isAuthenticated = false;
  userId: string;
  posts: Post[] = [];
  isLoading = true;
  totalPost = 0;
  postsPerPage = 2;
  pageSizeOptions = [1,2,5,10];
  currentPage = 1;

  constructor(
    private _postService:PostService,
    private _authService: AuthService){}

  ngOnInit(){
    this._postService.getPosts(this.postsPerPage, this.currentPage);
    this.postSub = this._postService.getPostsUpdate()
                            .subscribe((postsData: {posts: Post[], postsCount: number}) => {
                              this.posts = postsData.posts;
                              this.totalPost = postsData.postsCount;
                              this.isLoading = false;
                            });
    this.isAuthenticated = this._authService.getIsAuth();
    this.userId = this._authService.getUserId();
    this.authSub = this._authService.getAuthStatus()
                            .subscribe((value)=>{
                              this.isAuthenticated = value;
                              this.userId = this._authService.getUserId();
                            });
  }

  onChangedPage(pageData: PageEvent): void {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this._postService.getPosts(this.postsPerPage, this.currentPage);
  }

  reloadMain(): void {
    this.currentPage = 1;
    this._postService.getPosts(this.postsPerPage, this.currentPage);
  }

  onDelete(postid: string): void {
    this.isLoading = true;
    this._postService.deletePost(postid).subscribe(() => 
    this._postService.getPosts(this.postsPerPage, this.currentPage)
    );
  }

  ngOnDestroy(){
    this.postSub.unsubscribe();
    this.authSub.unsubscribe();
  }
}
