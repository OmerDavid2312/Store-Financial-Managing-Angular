import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Settings } from './../../models/Settings';
import { SettingsService } from './../../services/settings.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  settings:Settings;


  constructor(
    private settingsService:SettingsService,
    private flash:FlashMessagesService,
    private router:Router
  ) { }

  ngOnInit() {
    //get the settings
    this.settings =  this.settingsService.getSettings();
  }

  onSubmit()
  {
    this.settingsService.changeSettings(this.settings);
    this.flash.show('Settings saved',{cssClass:'alert-success',timeout:4000});
    
  }

}
