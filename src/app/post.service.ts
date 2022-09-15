import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AddCommentCommand, CreatePostCommand, Post } from './post';
import {POSTS} from './mock-posts'

@Injectable({
  providedIn: 'root'
})
export class PostService {

  getPosts(): Observable<Post[]> {
    const posts = of(POSTS);
    return posts;
  }

  getPost(id: string): Observable<Post> {
    const post = POSTS.find(h => h.aggregateId === id)!;
    return of(post);
  }

  //constructor() { }
  constructor(private client:HttpClient) { }

  httOptions = {
    headers: new HttpHeaders({'Content-Type':'application/json'})
  }

  bringAllPosts(): Observable<Post[]>{
    return this.client.get<Post[]>('http://localhost:8081/bringallposts');
   // return this.client.get<Post[]>('https://vast-hollows-77135.herokuapp.com/bringallposts');
  }

  CreatePostAction(command:CreatePostCommand):Observable<Object>{
    return this.client.post('http://localhost:8080/create/post', command, this.httOptions)
  // return this.client.post('https://lit-lake-44610.herokuapp.com/create/post', command, this.httOptions);
  }

  AddCommentAction(command:AddCommentCommand):Observable<Object>{
    return this.client.post('http://localhost:8080/add/comment', command, this.httOptions)
  //  return this.client.post('https://lit-lake-44610.herokuapp.com/add/comment', command, this.httOptions)
  }


}
