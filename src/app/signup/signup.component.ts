
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../Shared/user.model';
import { SignupService } from '../signup.service';
import { NgConfirmService } from 'ng-confirm-box'
import { NgToastService } from 'ng-angular-popup'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;
  submitted: boolean = false;
  public signObj = new User();
  constructor(private formBuilder: FormBuilder, private router: Router, public signupapi: SignupService, private confirmService: NgConfirmService, private toast: NgToastService) { }
  user: User[][] = [];
  ngOnInit(): void {
    this.displayDetails();

  }
  displayDetails() {
    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4), Validators.pattern("^[a-zA-Z]+$") ]],
      lastname:['',[Validators.required,Validators.minLength(2), Validators.pattern("^[a-zA-Z]+$") ]],
      gender:['',[Validators.required]],
      age:['',[Validators.required]],
      address:['',[Validators.required]],
      uid:['',[Validators.required]],
      userName: ['', [Validators.required, Validators.pattern("[a-zA-Z]+[0-9]*.(@gmail|@yahoo|@solugenix).com") ]],
      password:["",[ Validators.required,Validators.minLength(6), Validators.pattern('(?!.* )(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{6,}')]],
      mobile: ['', [Validators.required,Validators.maxLength(10)]],
      userType: ['', [Validators.required,]],

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
  signUp(signupForm: any) {
    this.signObj.name = this.signupForm.value.name;
    this.signObj.userName = this.signupForm.value.userName;
    this.signObj.password = this.signupForm.value.password;
    this.signObj.mobile = this.signupForm.value.mobile;
    this.signObj.userType = this.signupForm.value.userType;
    this.submitted = true;
    if (this.signupForm.valid) {

      this.signupapi.signUp().subscribe(
        (res: any) => {
         
         // alert(res.message);
        
          console.log(res);
          alert(res.message);
          (error:any)=>{
            // console.log(error);
            alert("Something went wrong");
          }
      

          this.confirmService.showConfirm("Are you sure want to  Register of " + this.signupapi.user.name + "??",
            () => {
              localStorage.setItem('user4', JSON.stringify(this.signObj));
              this.router.navigate(["dashboard"]);
              (this.toast.success({ detail: this.signupapi.user.name + res.message }));
              this.signupForm.reset();
            },
            () => {
              this.signupForm.reset();
            }
          )
        },
        (error:any)=>{
          console.log(error.message);
          alert(error.message);
        }
        );
    }
    else {
      console.log("Form is not valid")
      this.validateAllFormFields(this.signupForm);
    }
  }
  toBack(){
    this.router.navigate(["dashboard"]);
  }
}
