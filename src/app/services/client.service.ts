import { Injectable } from '@angular/core';
import { AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument } from 'angularfire2/firestore';
import {Observable} from 'rxjs';
import 'rxjs/Rx';



import { Client } from './../models/Client';




@Injectable({
  providedIn: 'root'
})
export class ClientService {
  clientsCollection:AngularFirestoreCollection<Client>;
  clientsDoc:AngularFirestoreDocument<Client>;
  clients:Observable<Client[]>;
  client:Observable<Client>;

  constructor(private afs : AngularFirestore) {
    this.clientsCollection = this.afs.collection('clients',ref=>ref.orderBy('balance','desc'));
    
   }

   getClients():Observable<Client[]>
   {
    this.clients = this.clientsCollection.snapshotChanges().map(changes=>{
      return changes.map(action=>{
        const data =action.payload.doc.data() as Client;
        data.id =action.payload.doc.id;
        return data;
      })
    });
    return this.clients

    
   }

   newClient(client:Client)
   {
     //add client to the collection
     this.clientsCollection.add(client);
   }

  getClient(id:string):Observable<Client>
  {
    //get the Doc of with help of user id (Doc)
    this.clientsDoc = this.afs.doc<Client>(`clients/${id}`);
    this.client = this.clientsDoc.snapshotChanges().map(action=>{
      
      if(action.payload.exists === false)
      {
        return null;
      }
      else
      {
        const data = action.payload.data() as Client;
        data.id = action.payload.id;
        return data;

      }
    });
    return this.client;
  }

  updateClient(client:Client)
  {
  //parse input to number
  Number(client.balance);
  //get Doc by ID of user
  this.clientsDoc = this.afs.doc(`clients/${client.id}`);
  //Update
  this.clientsDoc.update(client);
  }

  deleteClient(client:Client)
  {
    //get the Doc with the ID
    this.clientsDoc = this.afs.doc(`clients/${client.id}`);
    this.clientsDoc.delete();
  }

}
