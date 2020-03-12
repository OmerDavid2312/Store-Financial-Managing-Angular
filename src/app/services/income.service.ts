import { Income } from './../models/Income';
import { Injectable } from '@angular/core';
import { AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument } from 'angularfire2/firestore';
import {Observable} from 'rxjs';
import 'rxjs/Rx';
@Injectable({
  providedIn: 'root'
})
export class IncomeService {
  incomesCollection:AngularFirestoreCollection<Income>;
  incomesDoc:AngularFirestoreDocument<Income>;
  Income:Observable<Income>

  constructor(private afs : AngularFirestore) {
    this.incomesCollection = this.afs.collection('incomes');
    this.incomesDoc = this.afs.doc<Income>(`incomes/K1TkJfCTcYBOA4XSPI2T`);
      
   }

   getIncome()
   {
     this.Income = this.incomesDoc.valueChanges();
     return this.Income;
   }

   updateIncome(newincome:Income)
   {
    this.incomesDoc.update(newincome);
   }
}
