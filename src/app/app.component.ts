import { Component } from '@angular/core';
import { SignupService } from './signup.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'StudentMgmt';
  // sideNavStatus: boolean = true;
  // isloggedIn=false;
  // constructor( private loginService:SignupService ){}
  // ngOnInit(): void {
  //   this.isloggedIn=this.loginService.isLoggedIn();
  // }
}
