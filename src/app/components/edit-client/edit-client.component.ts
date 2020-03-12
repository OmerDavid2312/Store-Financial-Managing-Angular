import { Client } from './../../models/Client';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { ClientService } from './../../services/client.service';
import { Component, OnInit } from '@angular/core';
import { SettingsService } from './../../services/settings.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {

  id:string;
  

  client: Client = {
    firstName:'',
    lastName:'',
    email:'',
    phone:'',
    balance:0,
    date:new Date()
  }
  disableBalanceOnEdit :boolean;

 

  constructor(private clientService:ClientService,
    private router :Router,
     private route:ActivatedRoute,
     private flash:FlashMessagesService,
     private settingsService:SettingsService) { }

  ngOnInit() {
    //get id
    this.id = this.route.snapshot.paramMap.get('id');
    //get the client
    this.clientService.getClient(this.id).subscribe(client=>
      {
        this.client = client;

      });


      //settings
      this.disableBalanceOnEdit = this.settingsService.getSettings().disableBalanceOnEdit;
  
  }

  onSubmit(){
    if(this.client.firstName == undefined || this.client.lastName == undefined || this.client.email == undefined || this.client.phone == undefined || this.client.balance == undefined || this.client.date == undefined)
    {
      this.flash.show('Please fill out the form!',{cssClass:'alert-danger',timeout:4000});
      return;
    }
    this.client =  {
      firstName:this.client.firstName,
      lastName:this.client.lastName,
      email:this.client.email,
      phone:this.client.phone,
      balance:this.client.balance,
      date:this.client.date

    }
    this.client.id = this.id;

    
    //add new client
    this.clientService.updateClient(this.client);
    //show message
    this.flash.show('Client has edit!',{cssClass:'alert-success',timeout:4000});
    //redirect to dashboard
    this.router.navigateByUrl('/');

    
  }

}
