import { FlashMessagesService } from 'angular2-flash-messages';
import { Expense } from './../../models/Expense';
import { ExpensesService } from './../../services/expenses.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {
  expenses:Expense[];
  totalExp:number;


  //inputs toggle
  showInputEmployeewages:boolean = false;
  showInputservices:boolean = false;
  showInputrent:boolean = false;
  showInputtax:boolean =false;
  showInpututil:boolean = false;
  showInputcar:boolean = false;
  constructor(private expSrv:ExpensesService,private flash:FlashMessagesService) {
    
   }

  ngOnInit() {
    this.expSrv.getExpenses().subscribe(exp=>{
      this.expenses = exp;
      this.totalExp = this.totalExpenses();

    });
  }


  totalExpenses():number
  {
    var total:number=0;
    this.expenses.forEach(e=>{
      total = total + e.employeeWages + e.rentLeasePayments + e.services + e.taxes + e.utilities + e.carAndTruck;
    });
    //console.log(total);
    return total;
  }

  updateExp()
  {
    this.expSrv.update(this.expenses[0]);
    this.showInputEmployeewages= false; 
    this.showInputservices =false;
    this.showInputrent =false;
    this.showInputtax = false;
    this.showInputcar = false;
    this.showInpututil = false;
    this.flash.show('Expense Updated',{cssClass:'alert-success',timeout:4000});
  }

}
