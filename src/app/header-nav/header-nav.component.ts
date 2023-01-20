import { Component, OnInit } from '@angular/core';
import { SignupService } from '../signup.service';
import { UserStoreService } from '../user-store.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.scss']
})
export class HeaderNavComponent implements OnInit {
  public name: string = "";  
  role1:any;
  displayPanel = false;


  constructor( private auth: SignupService, private userStore: UserStoreService) { }

  ngOnInit(): void {
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
        this.role1 = '';
        this. auth.signout();
        //this.router.navigateByUrl('/login')
      }
      else if (result.isDenied) {
      }

    });
  }
  showNotification() {
    this.displayPanel = true;
}
closeButton() {
    this.displayPanel = false;
   // this.displayLogout=false;
}
outsidePanel() {
    this.displayPanel = false;
}

}
