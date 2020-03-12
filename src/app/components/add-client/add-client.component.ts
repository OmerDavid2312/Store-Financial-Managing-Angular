import { SettingsService } from './../../services/settings.service';
import { ClientService } from './../../services/client.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import {Router} from '@angular/router';
import { Client } from './../../models/Client';
import { Component, OnInit ,ViewChild} from '@angular/core';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  client: Client = {
    firstName:'',
    lastName:'',
    email:'',
    phone:'',
    balance:0,
    date:new Date()
  }
  clientFirstName:string;
  clientLastName:string;
  clientEmail:string;
  clientPhone:string;
  clientBalance:number = 0;
  clientDate:Date; 
  disableBalanceOnAdd:boolean;
  

  constructor(private flashmessage:FlashMessagesService,
     private clientService:ClientService,
     private router:Router,
     private settingsService:SettingsService) { }

  ngOnInit() {
   this.disableBalanceOnAdd = this.settingsService.getSettings().disableBalanceOnAdd;
  }

  onSubmit(){
    if(this.clientFirstName == undefined || this.clientLastName == undefined || this.clientEmail == undefined || this.clientPhone == undefined || this.clientBalance == undefined || this.clientDate == undefined)
    {
      this.flashmessage.show('Please fill out the form!',{cssClass:'alert-danger',timeout:4000});
      return;
    }
    this.client =  {
      firstName:this.clientFirstName,
      lastName:this.clientLastName,
      email:this.clientEmail,
      phone:this.clientPhone,
      balance:this.clientBalance,
      date:this.clientDate
    }
    console.log(this.client);
    //add new client
    this.clientService.newClient(this.client);
    //show message
    this.flashmessage.show('New client added',{cssClass:'alert-success',timeout:4000});
    //redirect to dashboard
    this.router.navigateByUrl('/');

    console.log(this.client)
  }

}
