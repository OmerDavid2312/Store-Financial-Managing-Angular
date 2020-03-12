import { Expense } from './../models/Expense';
import { Injectable } from '@angular/core';
import { AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument } from 'angularfire2/firestore';
import {Observable} from 'rxjs';
import 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  expensesDoc:AngularFirestoreDocument<Expense>
  expensesCollection:AngularFirestoreCollection<Expense>;
  expenses:Observable<Expense[]>;

  constructor(private afs : AngularFirestore) {
    this.expensesCollection = this.afs.collection('expenses');
    this.expensesDoc = this.afs.doc<Expense>('expenses/ZcNrRsBwjlUYm9Qblzkz');
    this.expenses = this.expensesCollection.valueChanges();

   }
   getExpenses():Observable<Expense[]>
   {
     return this.expenses;
   }

   update(u:Expense)
   {
     this.expensesDoc.update(u);
   }

}
