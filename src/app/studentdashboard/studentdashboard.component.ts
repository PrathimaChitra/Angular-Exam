import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgConfirmService } from 'ng-confirm-box';
import { SignupService } from '../signup.service';
import { UserStoreService } from '../user-store.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-studentdashboard',
  templateUrl: './studentdashboard.component.html',
  styleUrls: ['./studentdashboard.component.scss'],


})
export class StudentdashboardComponent implements OnInit {
  sideNavStatus = true;
  loggedIn = true;
  userType: 'Admin';
  public name: string = "";
  public role: string = "";
  displayPanel = false;
  role1: any;
  displayClose = false;
  displayLogout: any;
  displaysignstyle: any;
  constructor(private router: Router, private auth: SignupService, private userStore: UserStoreService, private confirmService: NgConfirmService) { }
  
  ngOnInit() {

    this.userStore.getNameFromStore().subscribe((val: any) => {
      const nameFromToken = this.auth.getNameFromToken();
      this.name = nameFromToken
    });


    this.role1 = localStorage.getItem('role');
  }

  singout() {
    Swal.fire({
      title: 'Are you sure want to logout?',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: 'No',
      customClass: {
        actions: 'my-actions',
        cancelButton: 'order-1 right-gap',
        confirmButton: 'order-2',
        denyButton: 'order-3',
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.role = '';
        this.auth.signout();
        this.router.navigateByUrl('/login')
      }
      else if (result.isDenied) {
      }

    });
  }

}
