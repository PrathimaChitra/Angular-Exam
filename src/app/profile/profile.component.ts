
import { Component, OnInit } from '@angular/core';
import { SignupService } from '../signup.service';
import { UserStoreService } from '../user-store.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public name: string = "";
  public role: string = "";
  public password: string = "";
  public phone:string = "";
  public  userName:any="";
  constructor( private auth:SignupService,private userStore: UserStoreService) { }
  ngOnInit(): void {
   this.userStore.getNameFromStore().subscribe((val: any) => {
    const nameFromToken = this.auth.getNameFromToken();
    this.name = nameFromToken
  });
  this.userStore.getRoleFromStore().subscribe((val: any) => {
    const roleFromToken = this.auth.getRoleFromtoken();
    this.role =  val||roleFromToken
  });

    const usernameFromToken = this.auth.getuserNameFromtoken();
    this.userName =  usernameFromToken
    const mobileFromToken = this.auth.getmobileNameFromtoken();
     this.phone =  mobileFromToken

  }
}

