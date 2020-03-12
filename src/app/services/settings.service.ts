import { Settings } from './../models/Settings';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  settings: Settings = {
    allowRegistration: true,
    disableBalanceOnAdd:true,
    disableBalanceOnEdit:true,
  }
  constructor() { 
    if(localStorage.getItem('settings') !== null)
    {
      this.settings = JSON.parse(localStorage.getItem('settings'));
    }

  }

  getSettings():Settings
  {
    return this.settings;
  }

  changeSettings(newsettings : Settings):void
  {
    localStorage.setItem('settings',JSON.stringify(newsettings));
  }
}
