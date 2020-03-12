import { SettingsService } from './../services/settings.service';
import { Injectable } from '@angular/core';
import {CanActivate,Router} from '@angular/router'


@Injectable()
export class RegisterGuard implements CanActivate{

    constructor(
        private router:Router,
        private settingsSerivce:SettingsService,
    ){}

    canActivate():boolean
    {
        if(this.settingsSerivce.getSettings().allowRegistration)
        {
            return true;
        }
        else
        {
            this.router.navigateByUrl('/login');
            return false;
        }
    }
}