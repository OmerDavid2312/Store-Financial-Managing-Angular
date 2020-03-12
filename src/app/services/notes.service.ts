import { Notes } from './../models/Note';
import { AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument } from 'angularfire2/firestore';
import {Observable} from 'rxjs';
import 'rxjs/Rx';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class NotesService {

  notesCollection:AngularFirestoreCollection<Notes>;
  noteDoc:AngularFirestoreDocument<Notes>;
  notes:Observable<Notes[]>;
  note:Observable<Notes>;

  constructor(private afs : AngularFirestore) { 
    this.notesCollection = this.afs.collection('notes',ref=>ref.orderBy('date','asc'));
  }


  newNote(note:Notes)
  {
    //add client to the collection
    this.notesCollection.add(note);
  }

  getnotes():Observable<Notes[]>
  {
   this.notes = this.notesCollection.snapshotChanges().map(changes=>{
     return changes.map(action=>{
       const data =action.payload.doc.data() as Notes;
       data.id =action.payload.doc.id;
       return data;
     })
   });
   return this.notes

   
  }

  getNote(id:string):Observable<Notes>
  {
    this.noteDoc = this.afs.doc<Notes>(`notes/${id}`);
    this.note = this.noteDoc.valueChanges();
    return this.note;
  }

  deleteNote(id:string)
  {
    this.afs.doc<Notes>(`notes/${id}`).delete();
  }
}
