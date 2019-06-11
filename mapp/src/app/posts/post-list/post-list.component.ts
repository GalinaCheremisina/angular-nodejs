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
  public isAuthenticated = false;
  public userId: string;
  public posts: Post[] = [];
  public isLoading = true;
  public totalPost = 0;
  public postsPerPage = 2;
  public pageSizeOptions = [1, 2, 5, 10];
  public currentPage = 1;
  private postSub: Subscription;
  private authSub: Subscription;

  constructor(
    private _postService: PostService,
    private _authService: AuthService,
  ) {}

    public ngOnInit() {
    this._postService.getPosts(this.postsPerPage, this.currentPage);
    this.postSub = this._postService.getPostsUpdate()
      .subscribe((postsData: { posts: Post[], postsCount: number }) => {
        this.posts = postsData.posts;
        this.totalPost = postsData.postsCount;
        this.isLoading = false;
      });
    this.isAuthenticated = this._authService.getIsAuth();
    this.userId = this._authService.getUserId();
    this.authSub = this._authService.getAuthStatus()
      .subscribe((value) => {
        this.isAuthenticated = value;
        this.userId = this._authService.getUserId();
      });
  }

  public onChangedPage(pageData: PageEvent): void {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this._postService.getPosts(this.postsPerPage, this.currentPage);
  }

  public reloadMain(): void {
    this.currentPage = 1;
    this._postService.getPosts(this.postsPerPage, this.currentPage);
  }

  public onDelete(postid: string): void {
    this.isLoading = true;
    this._postService.deletePost(postid).subscribe(() =>
      this._postService.getPosts(this.postsPerPage, this.currentPage)
    );
  }

  public ngOnDestroy() {
    this.postSub.unsubscribe();
    this.authSub.unsubscribe();
  }
}
