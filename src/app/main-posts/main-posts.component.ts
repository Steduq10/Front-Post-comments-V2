import { Component,OnDestroy, OnInit } from '@angular/core';
import { Post } from '../post';
import { PostService } from '../post.service';
import { CreatePostCommand } from '../post';
import { SocketService } from '../post-detail/socket/socket.service';
import { WebSocketSubject } from 'rxjs/webSocket';
import { PostView} from '../postView';
import { StateService } from '../state/state.service';
import { Router } from '@angular/router';


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

  availableState:any;

  constructor(private postService: PostService, private socket:SocketService, private state:StateService,
    private router:Router) { }

  ngOnInit(): void {
    if(this.validateLogin()){

    }
    this.getPosts();
    this.connectToMainSpace()
  }

  ngOnDestroy():void{
    this.closeSocketConnection();
  }


  validateLogin():boolean{
    let validationResult = false;
    this.state.state.subscribe(currentState =>{
      console.log(currentState);
      this.availableState = currentState;
      if(!currentState.logedIn){
        this.router.navigateByUrl('/login')
        validationResult = false
        return
      }
      validationResult = true
    })
    return validationResult;
  }


  getPosts(){
    this.postService.bringAllPosts().subscribe(payLoad =>{
      this.posts = payLoad
      console.log(this.posts);
    })
  }

/*
  submitPost(){
    const newCommand: CreatePostCommand = {
      postId: Math.floor(Math.random() * 100000).toString(),
      title: this.newTitle,
      author: this.newAuthor
    }

    this.postService.CreatePostAction(newCommand).subscribe()
    this.newTitle = "";
    this.newAuthor = "";
  }*/

  createPost(){
    const newPost: CreatePostCommand = {
      postId: Math.floor(Math.random() * 100000).toString(),
      title: this.newTitle,
      author: this.newAuthor
    }
    this.submitPosts(newPost, this.availableState.token);
  }

  submitPosts(command:CreatePostCommand, token: string){
    this.postService.CreatePostAction(command, token).subscribe()
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
