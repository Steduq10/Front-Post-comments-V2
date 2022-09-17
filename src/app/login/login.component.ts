import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth service/auth.service';
import { PostService } from '../post.service';
import { StateService } from '../state/state.service';
import {catchError, of} from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router:Router, private state:StateService,
     private service: PostService) { }

  ngOnInit(): void {
  }

  async loginWithGoogle(){
    const response = await this.authService.logInWithGoogle()
    if(response){
     // const token = await this.service.login({
      this.service.login({
        username: response.user.email,
        password: response.user.email
      })
     // .pipe(catchError(err => of(err)))
      .subscribe(token => {
        console.log(token);
        this.state.state.next({
          logedIn: true,
          authenticatedPerson:response,
          token: token.token
         })
         this.router.navigateByUrl('')
      })

      }
      console.log(response);
    }
  }


