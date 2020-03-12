import { IncomeService } from './../../services/income.service';
import { ClientService } from './../../services/client.service';
import { ExpensesService } from './../../services/expenses.service';

import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})
export class BalanceComponent implements OnInit {
  totalClientsOwedBalance:number = 0;
  totalExp:number = 0;
  
  totalIncome:number;
  totalBalance:number;
  


  constructor(
    private clientSrv:ClientService,
    private expSrv:ExpensesService,
    private incSrv:IncomeService
    ) { 

  }

  ngOnInit() {
    //get the Total Owed clients number
    this.clientSrv.getClients().subscribe(c=>{
     
      c.forEach(clientBalance=>{
        this.totalClientsOwedBalance += clientBalance.balance;
      });
     
      
    });

    //get the Total Expenses number
    this.expSrv.getExpenses().subscribe(exp=>{
      exp.forEach(e=>{
        this.totalExp = e.employeeWages + e.rentLeasePayments + e.services + e.taxes + e.utilities + e.carAndTruck;
      });
      
    });

    ///////////////////////////////////////////////////////////

    //get the Total Income number
    this.incSrv.getIncome().subscribe(income=>{
      this.totalIncome = income.incomes;
    });

   
  }

}
