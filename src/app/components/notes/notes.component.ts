import { FlashMessagesService } from 'angular2-flash-messages';
import { Notes } from './../../models/Note';
import { NotesService } from './../../services/notes.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  notes:Notes[];
  note:Notes;
  id:string; //get the id to delete or something..

  desc:string;
  date:string;
  newNote:Notes;
  constructor(private noteSrv:NotesService,private flash:FlashMessagesService) { 
    this.noteSrv.getnotes().subscribe(n=>this.notes=n);
    

  }

  ngOnInit() {
  }

  onSubmit()
  {
    //this is how to get the current date and convery to string like in fireabase !!!!
   // new Date().toISOString().slice(0,10);
   
    this.newNote = {date:this.date,desc:this.desc};
    this.noteSrv.newNote(this.newNote);
    this.flash.show('Added New Note',{cssClass:'alert-success',timeout:4000});

  }
  delete(id:string)
  {
    confirm('Are you sure ? ')
    {
      this.noteSrv.deleteNote(id);
      this.flash.show('Note Deleted',{cssClass:'alert-success',timeout:4000});
   
    }

  }

  passedNotes()
  {
    this.noteSrv.getnotes().subscribe(n=>this.notes=n.filter(n => new Date(n.date).getTime()< new Date().getTime()));  
   // console.log(this.notes);
  }

  allNotes()
  {
    this.noteSrv.getnotes().subscribe(n=>this.notes=n);
  }

   futureNotes()
  {
    this.noteSrv.getnotes().subscribe(n=>this.notes=n.filter(n => new Date(n.date).getTime()> new Date().getTime()));

  }
  
   todayNotes()
  {
    // this day date yyyy-mm-dd new Date().toISOString().slice(0,10);
    this.noteSrv.getnotes().subscribe(n=>this.notes=n.filter(n => n.date ==  new Date().toISOString().slice(0,10)));

  }



}
