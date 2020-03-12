import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  email:string;
  password:string;

  constructor(private authService :AuthService,
    private flash : FlashMessagesService,
    private router:Router) { }

  ngOnInit() {
    //check if there is a user that logged in already
    this.authService.getAuth().subscribe(auth=>{
      if(auth)
      {
        this.router.navigateByUrl('/');
      }
    })
  }
  
  onSubmit()
  {
    this.authService.login(this.email,this.password).then(res=>{
      this.flash.show('You are now logged in !',{cssClass:'alert-success',timeout:4000});
      this.router.navigateByUrl('/');
    })
    .catch(err=> this.flash.show(err.message,{cssClass:'alert-danger',timeout:4000}));
    
    
  }

  logInGoogle()
  {
    this.authService.GoogleSignIn();
 
  }
}
