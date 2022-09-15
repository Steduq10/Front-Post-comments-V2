import { Component,OnDestroy, OnInit } from '@angular/core';
import { Post } from '../post';
import { PostService } from '../post.service';
import { CreatePostCommand } from '../post';
import { SocketService } from '../post-detail/socket/socket.service';
import { WebSocketSubject } from 'rxjs/webSocket';
import { PostView} from '../postView';


@Component({
  selector: 'app-main-posts',
  templateUrl: './main-posts.component.html',
  styleUrls: ['./main-posts.component.css']
})
export class MainPostsComponent implements OnInit, OnDestroy {

  socketManager?:WebSocketSubject<PostView>;
  posts?: Post[];
  //posts?: Post[] = [];
  //postsView: PostView [] = [];
  newTitle:string = "";
  newAuthor:string = "";

  constructor(private postService: PostService, private socket:SocketService) { }

  ngOnInit(): void {
    this.getPosts();
    this.connectToMainSpace()
  }

  ngOnDestroy():void{
    this.closeSocketConnection();
  }



  getPosts(){
    this.postService.bringAllPosts().subscribe(payLoad =>{
      this.posts = payLoad
      console.log(this.posts);
    })
  }

  /*getPost(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.postService.bringPostById(id)
      //this.mainPost.getPost(id)
      .subscribe(post => this.posts = post);


  }*/


 /* createPost(){
    const newPost:CreatePostCommand = {
      postId: (Math.random()* (10000000 - 100000) * 100000).toString(),
      title: this.newTitle,
      author: this.newAuthor
    }
  }*/

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


  addPost(post:PostView){
   // this.newAuthor = ''
   // this.newTitle = ''
    this.posts?.unshift(post);
  }

  connectToMainSpace(){
    this.socketManager = this.socket.connetGeneralPostSpace()
    this.socketManager.subscribe((message) =>{
      this.addPost(message)
    })
  }


  closeSocketConnection(){
    this.socketManager?.complete()
  }






}
