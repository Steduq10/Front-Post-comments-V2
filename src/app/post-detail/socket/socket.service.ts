import { Injectable } from '@angular/core';
import { Post } from 'src/app/post';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket'
import { CommentView, PostView } from 'src/app/postView';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor() { }

  connetGeneralPostSpace(): WebSocketSubject<PostView>{
    return webSocket('ws://localhost:8082/bringAllPost')
   // return webSocket('WSS://frozen-retreat-51992.herokuapp.com/bringAllPost')
  }


  connectToDetailSpace(postId:string): WebSocketSubject<CommentView>{
    return webSocket(`ws://localhost:8082/retrieve/${postId}`);
    //return webSocket(`WSS://frozen-retreat-51992.herokuapp.com/retrieve/${correlationId}`);
  }

}
