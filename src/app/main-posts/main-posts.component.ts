import { Component, OnInit } from '@angular/core';
import { Post } from '../post';
import { POSTS } from '../mock-posts';
import { PostService } from '../post.service';
import { CreatePostCommand } from '../post';

@Component({
  selector: 'app-main-posts',
  templateUrl: './main-posts.component.html',
  styleUrls: ['./main-posts.component.css']
})
export class MainPostsComponent implements OnInit {

  posts: Post[] = [];
  newTitle:string = "";
  newAuthor:string = "";

 


 // constructor() { }
  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.getPosts();
  }



  getPosts(): void {
    this.postService.getPosts()
    .subscribe(posts => this.posts = posts);
  }

  submitPost(){
    const newCommand: CreatePostCommand = {
      postId: Math.floor(Math.random() * 100000).toString(),
      title: this.newTitle,
      author: this.newAuthor
    }

    this.postService.CreatePostAction(newCommand).subscribe()
    this.newTitle = "";
    this.newAuthor = "";
  }

}
