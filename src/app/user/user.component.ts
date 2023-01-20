import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../Shared/user.model';
import { SignupService } from '../signup.service';
import { NgConfirmService } from 'ng-confirm-box'
import { NgToastService } from 'ng-angular-popup'
import { UserStoreService } from '../user-store.service';
import { object } from '@amcharts/amcharts5';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  searchText = { name: '', }
  addUserForm : FormGroup;
  submitted: any;
  display_userDetails = true;
  public role: string = "";
  edit = false;
  display_editUser = false;
  public isReadonly: boolean;
  role1 : any;
  user : any;
  activePage = 0;
  dataPerPage:number=5;
  public selectedPage=1;
  products:any[]=[];
  editUserForm:any;

  constructor(public signupapi: SignupService, private router: Router, private formBuilder: FormBuilder, private confirmService: NgConfirmService, private toast: NgToastService, private userStore: UserStoreService) { }

  ngOnInit(): void {

    this.getAllUser();
    this.displayDetail();
    this.userStore.getRoleFromStore().subscribe((val: any) => {
      const roleFromToken = this.signupapi.getRoleFromtoken();
      this.role = val || roleFromToken
    });
  }
  displayDetail() {
    this.display_userDetails = true;

    this.addUserForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.pattern("[a-zA-Z].*")]],
      userName: ['', [Validators.required,]],
      password: ['', [Validators.required,]],
      mobile: ['', [Validators.required,]],
      userType: ['', [Validators.required,]]
    })
  }

  getAllUser() {
    this.signupapi.getUserApi();
   
    this.display_editUser = false;
    let pageIndex=(this.selectedPage-1)*this.dataPerPage;
    this.products=this.signupapi.list.slice(pageIndex,this.dataPerPage);
  }


  deleteUser(id: number) {

    Swal.fire({
      title: "Are you sure want to  delete  the User?",
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
        this.signupapi.deleteUserApi(id).subscribe(
          (res: any) => {
            this.getAllUser();
            this.display_userDetails = true;
            (this.toast.success({ detail: this.signupapi.user.name + res.message }));
          })
      }
      else if (result.isDenied) {
      }

    });
  }

  Add_User() {
    
    this.router.navigate(["signup"]);
  }
  onBack() {
    this.addUserForm.reset();
  }
  toBack() {
    this.display_userDetails = true;

    this.display_editUser = false;
  }

  changePageSize(event:Event)
  {
  const newSize=(event.target as HTMLInputElement).value
  this.dataPerPage=Number(newSize);
  this.changePage(1);
  }
  get pageNumber():number[]{
    return Array(Math.ceil(this.signupapi.list.length/this.dataPerPage))
    .fill(0).map((x,i) => i+1);
  }
  changePage(page:any){
    this.selectedPage=page;
    this.slicedStudent();

  }
 slicedStudent(){
  let pageIndex=(this.selectedPage-1)*this.dataPerPage;
    let endIndex=(this.selectedPage-1)*this.dataPerPage+this.dataPerPage;
    this.products=[];
    this.products=this.signupapi.list.slice(pageIndex,endIndex);
 }
 
 firstPage()
 {
  this.selectedPage=1;
  this.slicedStudent();
 }
 previousPage(page:any){
  this.selectedPage=page-1;
  this.slicedStudent();
 }
 nextPage(page:any){
  this.selectedPage=page+1;
  this.slicedStudent();
 }
 lastPage(){
  this.selectedPage=this.pageNumber.length;
  this.slicedStudent();
 }
  displayActivePage(activePageNumber: number): void {
    this.activePage = activePageNumber;
  }

  populateForm(selectedRecord: User) {
    this.display_userDetails=false;
    this.editUserForm = true;
    this.signupapi.user = Object.assign({}, selectedRecord);
  }

  editUser(form: NgForm) {
    this.signupapi.updateUserApi().subscribe(
      (res:any) => {   
        this.signupapi.getUserDetails().subscribe(
          res => this.signupapi.list = res as User[]
        )
      });
    this.display_userDetails=true;
    this.editUserForm = false;
  }
  back(){
    this.display_userDetails=true;
    this.editUserForm=false;

    
  }

}
