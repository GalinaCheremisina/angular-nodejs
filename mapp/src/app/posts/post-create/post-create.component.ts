import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { Post } from 'src/app/shared/model/post.model';
import { PostService } from 'src/app/shared/services/post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  public post: Post;
  public isLoading = false;
  public form: FormGroup;
  public imagePreview: string;
  private mode = 'create';
  private postId = '';

  constructor(
    private _postService: PostService,
    private _route: Router,
    private _router: ActivatedRoute,
  ) {}

  public ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      content: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, { validators: [Validators.required] })
    });
    this._router.paramMap.subscribe((param: ParamMap) => {
      if (param.has('postId')) {
        this.mode = 'edit';
        this.postId = param.get('postId');
        this.isLoading = true;
        this._postService.getPostById(this.postId)
          .subscribe((postData) => {
            this.isLoading = false;
            this.post = {
              id: postData._id,
              title: postData.title,
              content: postData.content,
              imagePath: postData.imagePath,
              creator: postData.creator,
            };
            this.form.setValue({
              title: this.post.title,
              content: this.post.content,
              image: this.post.imagePath,
            });
            this.imagePreview = postData.imagePath;
          });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  public onImagePicked(event: Event): void {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result + '';
    };
    reader.readAsDataURL(file);
  }

  public onSavePost(): void {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this._postService
        .addNewPost(
          this.form.value.title,
          this.form.value.content,
          this.form.value.image,
        );
    } else {
      this._postService
        .updatePost(
          this.postId,
          this.form.value.title,
          this.form.value.content,
          this.form.value.image).subscribe(
            () => { this._route.navigate(['/']); },
            (error) => { this.isLoading = false; },
          );
    }
    this.form.reset();
  }
}
