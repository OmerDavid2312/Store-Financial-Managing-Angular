import { FlashMessagesService } from 'angular2-flash-messages';
import { IncomeService } from './../../services/income.service';
import { Income } from './../../models/Income';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent implements OnInit {
  income:Income;
  showIncomeInput:boolean = false;

  constructor(private IncomeSrv:IncomeService,private flash:FlashMessagesService) {

   }

  ngOnInit() {
    this.IncomeSrv.getIncome().subscribe(income=>{
      this.income = income;
      
    });
  }

  updateIncomes()
  {
    this.IncomeSrv.updateIncome(this.income);
    this.showIncomeInput = false;
    this.flash.show('Income Updated',{cssClass:'alert-success',timeout:4000});
  }

}
