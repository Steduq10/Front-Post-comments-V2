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
/*  post: Post = {
    aggregateId: "1",
    author: "Steven",
    title: "Testing post",
    comments: []


  }*/

  //posts = POSTS;
  posts: Post[] = [];
  newTitle:string = "";
  newAuthor:string = "";

  //selectedPost?: Post;

 // constructor() { }
  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.getPosts();
  }

//  onSelect(post: Post): void {
//    this.selectedPost = post;
//  }

  getPosts(): void {
    this.postService.getPosts()
    .subscribe(posts => this.posts = posts);
  }

/*  submitPost(){
    const newCommand: CreatePostCommand = {
      postId: Math.floor(Math.random() * 100000).toString(),
      title: this.newTitle,
      author: this.newAuthor
    }

    this.postService.CreatePostAction(newCommand).subscribe()
    this.newTitle = "";
    this.newAuthor = "";
  }*/

}
