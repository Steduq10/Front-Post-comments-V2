import { Injectable } from '@angular/core';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket'
import { CommentView, PostView } from 'src/app/postView';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor() { }

  connetGeneralPostSpace(): WebSocketSubject<PostView>{
   // return webSocket('ws://localhost:8082/retrieve/mainSpace')
    return webSocket('WSS://tranquil-bayou-17075.herokuapp.com/retrieve/mainSpace')
  }


  connectToDetailSpace(postId:string): WebSocketSubject<CommentView>{
   // return webSocket(`ws://localhost:8082/retrieve/${postId}`);
     return webSocket(`WSS://tranquil-bayou-17075.herokuapp.com/retrieve/${postId}`);
  }

}
