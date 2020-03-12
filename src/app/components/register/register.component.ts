import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email:string;
  password:string;

  constructor(private authService :AuthService,
    private flash : FlashMessagesService,
    private router:Router) { }

    ngOnInit() {
      //if user log in - move to dashboard
      this.authService.getAuth().subscribe(auth=>{
        if(auth)
        {
          this.router.navigateByUrl('/');
        }
      })
    }

    onSubmit()
    {
      this.authService.register(this.email,this.password).then(res=>{
        this.flash.show('You are now registered and logged in !',{cssClass:'alert-success',timeout:4000});
        this.router.navigateByUrl('/');
      })
      .catch(err=> this.flash.show(err.message,{cssClass:'alert-danger',timeout:4000}));
      
      
    }

}
