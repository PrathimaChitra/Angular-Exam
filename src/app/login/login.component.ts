import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../Shared/user.model';
import { NgConfirmService } from 'ng-confirm-box'
import { NgToastService } from 'ng-angular-popup'
import { SignupService } from '../signup.service';
import { UserStoreService } from '../user-store.service';
import { any } from '@amcharts/amcharts5/.internal/core/util/Array';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  public loginObj = new User();
 
  role:any;
  user:any;
    obj = any;
  submitted: boolean = false;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private api: SignupService, private confirmService: NgConfirmService, private toast: NgToastService, private userstore: UserStoreService) { }

  ngOnInit(): void {
    this.api.signout();
    this.loginForm = this.formBuilder.group({
      email:['', [Validators.required, Validators.pattern("[a-zA-Z]+[0-9]*.(@gmail|@yahoo|@solugenix).com") ]],
      password: ["",[ Validators.required,Validators.minLength(6), Validators.pattern('(?!.* )(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{6,}')]],
    })
  }

  private validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true });
      }
      else if (control instanceof FormGroup) {
        this.validateAllFormFields(control)
      }
    })
  }
  
  login() {
    this.loginObj.userName = this.loginForm.value.email;
    this.loginObj.password = this.loginForm.value.password;
    this.submitted = true;
    if (this.loginForm.valid) {
      this.api.login(this.loginObj).subscribe(
        (res: any) => {
              console.log(this.api.user);
              localStorage.setItem('token',res.token);
              let tokenPayload = this.api.decodedToken();
              tokenPayload = JSON.stringify(tokenPayload);
              localStorage.setItem('userDetails',tokenPayload);
              this.user= localStorage.getItem('user');
              tokenPayload = JSON.parse(tokenPayload);
              localStorage.setItem('role',tokenPayload.role);
              this.role = localStorage.getItem('role')
              localStorage.setItem('user8', JSON.stringify(this.loginObj));
              this.userstore.setNameforStore(tokenPayload.Name);
              this.userstore.setRoleforStore(tokenPayload.role);
              this.router.navigate(["dashboard"]);
              (this.toast.success({ detail: this.api.user.name + res.message }));
              this.loginForm.reset();
            },
      )}
    else {
      console.log("Form is not valid")
      this.validateAllFormFields(this.loginForm);
    }
  }
}




