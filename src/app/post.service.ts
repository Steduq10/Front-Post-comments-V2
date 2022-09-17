import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { AddCommentCommand, CreatePostCommand, Post } from './post';
import { Token } from './post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  LOGIN_URL='http://localhost:8080/auth/login'

  constructor(private client:HttpClient) { }

  httOptions = {
    headers: new HttpHeaders({'Content-Type':'application/json'})
  }

  bringAllPosts(): Observable<Post[]>{
  //  return this.client.get<Post[]>('http://localhost:8081/bringallposts');
    return this.client.get<Post[]>('https://mysterious-lake-19455.herokuapp.com/bringallposts');
  }

  CreatePostAction(command:CreatePostCommand, token:string):Observable<Object>{
  //  return this.client.post('http://localhost:8080/create/post', command, this.httOptions)
   return this.client.post('https://lit-reaches-39063.herokuapp.com/create/post', command, this.httOptions);
  }

  AddCommentAction(command:AddCommentCommand):Observable<Object>{
 //   return this.client.post('http://localhost:8080/add/comment', command, {headers: new HttpHeaders({
  //   'Content-Type': 'application/json',
  //   'Authorization': 'Bearer ${token}'
  //  })})
    return this.client.post('https://lit-reaches-39063.herokuapp.com/add/comment', command, {headers: new HttpHeaders({
      'Content-Type': 'application/json',
     'Authorization': 'Bearer ${token}'
    })})
  }

  bringPostById(postId: string | null): Observable<Post>{
   //   return this.client.get<Post>(`http://localhost:8081/bringpost/${postId}`)
    return this.client.get<Post>(`https://mysterious-lake-19455.herokuapp.com/bringpost/${postId}`)
  }

  login(command:any): Observable<Token>{
   // return this.client.post<Token>('http://localhost:8080/auth/login', command, this.httOptions)
    return this.client.post<Token>('https://lit-reaches-39063.herokuapp.com/auth/login', command, this.httOptions)

  }

 /* private handleError<T>(operation = 'operation', result?: T){
    return(error:any):Observable<T> => {
        console.error(error);

        console.log(`${operation} failed: ${error.message}`);
    }

  }*/


}
