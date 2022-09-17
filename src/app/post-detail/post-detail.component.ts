import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddCommentCommand, Post } from '../post';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { PostService } from '../post.service';
import { CommentView } from '../postView';
import { SocketService } from '../post-detail/socket/socket.service';
import { WebSocketSubject } from 'rxjs/webSocket';
import { StateService } from '../state/state.service';
@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit, OnDestroy {


  socketManager?:WebSocketSubject<CommentView>;


  post!: Post;

  newContent:string = "";
  newAuthor:string = "";


  constructor(private route:ActivatedRoute, private postService: PostService,
     private location: Location, private socket:SocketService, private state:StateService,
     private router:Router) { }

  ngOnInit(): void {
    if(this.validateLogin()){

    }
    this.getPost();



  }

  ngOnDestroy():void{
    this.closeSocketConnection();
  }

  validateLogin():boolean{
    let validationResult = false;
    this.state.state.subscribe(currentState =>{

      if(!currentState.logedIn){
        this.router.navigateByUrl('/login')
        validationResult = false
        return
      }
      validationResult = true
    })
    return validationResult;
  }

  getPost(): void {
    const id: string|null =(this.route.snapshot.paramMap.get('id'));
    this.postService.bringPostById(id)
     .subscribe(post => {
      this.post = post;
      this.connectToDetailSpace();
    });


  }

  goBack(): void {
    this.location.back();
  }

  addComment(comment:CommentView){
    this.newAuthor = ''
    this.newContent = ''
    this.post.comments.unshift(comment);
  }

  connectToDetailSpace(){
    this.socketManager = this.socket.connectToDetailSpace(this.post.id)
    this.socketManager.subscribe((message) =>{
      this.addComment(message)
    })
  }


  closeSocketConnection(){
    this.socketManager?.complete()
  }

  createComment(){
    const newCommand: AddCommentCommand = {
      postId: this.post.id,
      commentId: Math.floor(Math.random() * 100000).toString(),
      author: this.newAuthor,
      content: this.newContent
    }

    this.postService.AddCommentAction(newCommand).subscribe()
    this.newAuthor = "";
    this.newContent = "";

  }
}
