import { SettingsService } from './../../services/settings.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Client } from './../../models/Client';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn : boolean; //check if user log in
  loggedInUser : string;
  showRegister:boolean;

  constructor(private authService:AuthService,
      private router :Router,
      private flash:FlashMessagesService,
      private settingsService:SettingsService) { }

  ngOnInit() {
    //check if we have Auth - User log in
    this.authService.getAuth().subscribe(auth=>{
      if(auth) //if user already log in 
      {
        this.isLoggedIn = true;
        this.loggedInUser = auth.email;
        
      }
      else //user is not logged in
      {
        this.isLoggedIn = false;
      }
    });

    //settings
    this.showRegister = this.settingsService.getSettings().allowRegistration;
  }

  logout(){
    this.authService.logout();
    this.isLoggedIn = false;
    this.flash.show('You are logged out',{cssClass:'alert-success',timeout:4000});
    this.router.navigateByUrl('/login');
  }

}
