import { Component, OnInit } from '@angular/core';
import { Post } from '../post';
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



  /*getPosts(): void {
    this.postService.getPosts()
    .subscribe(posts => this.posts = posts);
  }*/

  getPosts(){
    this.postService.bringAllPosts().subscribe(payLoad =>{
      this.posts = payLoad
      console.log(this.posts);
    })
  }

 /*  getPost(id: string): Post {
    this.postService.bringAllPosts().subscribe(payload =>{
      const post = payload.find(h => h.aggregateId === id)!;
    })
    return (post);

  }*/

  createPost(){
    const newPost:CreatePostCommand = {
      postId: (Math.random()* (10000000 - 100000) * 100000).toString(),
      title: this.newTitle,
      author: this.newAuthor
    }
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
/*  submitPost(command:CreatePostCommand){
    this.postService.CreatePostAction(command).subscribe()
  }*/

  addPost(post:Post){
    this.newAuthor = ''
    this.newTitle = ''
    this.posts.unshift(post)
  }




}
