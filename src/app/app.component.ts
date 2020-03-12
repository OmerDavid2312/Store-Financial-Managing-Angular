import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'financial-manager';
  isloaded:boolean = false;
  constructor(private spinner:NgxSpinnerService){}

  ngOnInit() {
    /** spinner starts on init */
    this.isloaded = true;
    this.spinner.show();
    
    

    setTimeout(() => {
      /** spinner ends after 1 second */
      this.isloaded =false;
      this.spinner.hide();
    }, 1000);
  }


  
}
