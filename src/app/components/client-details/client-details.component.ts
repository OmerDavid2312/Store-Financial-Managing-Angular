import { Client } from './../../models/Client';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { ClientService } from './../../services/client.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  id:string;
  client:Client;
  hasBalance:boolean = false;
  showBalanceUpdateInput:boolean = false;
  constructor(private clientService:ClientService,private router :Router, private route:ActivatedRoute,private flash:FlashMessagesService) { }

  ngOnInit() {
    //get id
    this.id = this.route.snapshot.paramMap.get('id');
    this.clientService.getClient(this.id).subscribe(client=>
      {
        this.client = client;
        if(client != null)
        {
          if(client.balance>0)
          {
            this.hasBalance = true;
          }
        }
  
      });
  
  }

  updateBalance()
  {
    this.clientService.updateClient(this.client);
    this.flash.show('Balance Updated',{cssClass:'alert-success',timeout:4000});
    
  }
  onDeleteClick()
  {
    if(confirm('Are you sure?'))
    {
      this.clientService.deleteClient(this.client);
      this.flash.show('Client Removed',{cssClass:'alert-success',timeout:4000});
      this.router.navigateByUrl('/');
    }

  }

}
