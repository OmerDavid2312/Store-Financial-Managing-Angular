import { FlashMessagesService } from 'angular2-flash-messages';
import { NotesService } from './../../services/notes.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private noteSrv:NotesService,private flash:FlashMessagesService){}
  print()
  {
    window.print();
    
  }
  ngOnInit() {
    //give notifaction if any note is today !
    this.noteSrv.getnotes().subscribe(notes=>{
      notes.forEach(note=>{
        
        if(note.date ==  new Date().toISOString().slice(0,10) )
        {
          this.flash.show('<b><i class="fas fa-bell"></i> A reminder for today</b><br> ' + note.desc,{cssClass:'alert-info text-center',timeout:10000});
          
        }
      });
    });

  }

}
