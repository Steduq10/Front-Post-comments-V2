import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth service/auth.service';
import { PostService } from '../post.service';
import { StateService } from '../state/state.service';



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
      const token = await this.service.login({
        username: response.user.email,
        password: response.user.email
      }).subscribe(token => {
        console.log(token);
        this.state.state.next({
          logedIn: true,
          authenticatedPerson:response,
          token //En caso de funcionar revisar esta línea
         })
         this.router.navigateByUrl('/main')
      })

      }
      console.log(response);
    }
  }


