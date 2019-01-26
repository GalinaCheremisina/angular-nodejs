import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/Operators';

import { Post } from '../model/post.model';
import { environment } from '../../../environments/environment';

const BACKEND_URL = environment.apiUrl + "/posts/";

@Injectable({ providedIn: "root" })
export class PostService{

    posts: Post[] = [];
    private postsUpdated = new Subject<{posts: Post[], postsCount: number}>();

    constructor(
        private _http: HttpClient,
        private _router: Router){}

    /**Get posts from BD */
    getPosts(postsPerPage: number, currentPage: number): void {
      const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
        this._http.get<{message: string, posts: any, maxPosts: number}>(
          BACKEND_URL + queryParams
          )
                .pipe(
                    map((postData) => {
                    return {
                      posts: postData.posts.map(post => {
                      return {
                        title: post.title,
                        content: post.content,
                        id: post._id,
                        imagePath: post.imagePath,
                        creator: post.creator
                      };
                    }),
                    maxPosts: postData.maxPosts
                  };
                  })
                )
                .subscribe(transformData => {
                    this.posts = transformData.posts;
                    this.postsUpdated.next({
                      posts: this.posts.slice(),
                      postsCount: transformData.maxPosts
                    });
                });
    }

    /**Get posts */
    getPostsUpdate(): Subject<{posts: Post[], postsCount: number}> {
        return this.postsUpdated;
    }

    /**Get post by id */ 
    getPostById(postId: string): Observable<{_id: string,
                                            title: string,
                                            content: string,
                                            imagePath: string,
                                            creator: string}>{
        return this._http
                    .get<{_id: string,
                          title: string,
                          content: string,
                          imagePath: string,
                          creator: string}>(
                            BACKEND_URL + postId
                        );
    }

    /**Add a new post */
    addNewPost(title: string, content: string, image: File): void {
        const postData = new FormData();
        postData.append("title", title);
        postData.append("content", content);
        postData.append("image", image, title);
        this._http.post<{message: string, post: Post}>(
                BACKEND_URL, 
                postData
            )
            .subscribe(() => this._router.navigate(['/']));
    }

    /**Update the post */
    updatePost(id: string, title: string, content: string, image: File | string): 
    Observable<{message:string}> {
        let postData: Post | FormData;
        if (typeof image === "object") {
          postData = new FormData();
          postData.append("id", id);
          postData.append("title", title);
          postData.append("content", content);
          postData.append("image", image, title);
        } else {
          postData = {
            id: id,
            title: title,
            content: content,
            imagePath: image,
            creator: null
          };
        }
        return this._http
          .put<{message:string}>(BACKEND_URL + id, postData);
      }

    /**Delete the post */
    deletePost(postId: string): Observable<any> {
        return this._http.delete(BACKEND_URL + postId);
      }
}