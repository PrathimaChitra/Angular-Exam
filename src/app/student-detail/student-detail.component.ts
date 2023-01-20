import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { StudentdetailsService } from '../studentdetails.service';
import { Student } from '../Shared/student.model';
import { NgConfirmService } from 'ng-confirm-box'
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup'
import { SignupService } from '../signup.service';
import { UserStoreService } from '../user-store.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Swal from 'sweetalert2';
import { DepartmentComponent } from '../Component/department/department.component';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.scss'],

 
})
export class StudentDetailComponent implements OnInit {

  
  addStudentform!: FormGroup;
  display_addStudent = false;
  display_studentDetails = false;
  isBarGraphDisplay = false;
  isLineGraphDisplay = false;
  isPieChartDisplay = false;
  submitted: boolean = false;
  searchText= { firstName: '', }
  studentMark: any;
  public role: string = "";
  display = false;
  role1:any;
  display_editStudent:any;
  public studentListtt: any[] = [];
  displayDownload = false;

  activePage = 0;
  dataPerPage:number=5;
  public selectedPage=1;
  products:any[]=[];

  constructor(public studentdetails: StudentdetailsService, private auth: SignupService, private router: Router, private formBuilder: FormBuilder, private confirmService: NgConfirmService, 
    private toast: NgToastService, private userStore: UserStoreService) { }
  student = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    age: '',
    mark1: '',
    mark2: '',
    mark3: '',
    mark4: '',
  }
  studentList: any;
//deptttNameee=this.deptComponent.departmentName;

  ngOnInit(): void {
    this.role1 = localStorage.getItem('role');
  
    this.displayDetail();
    this.getAllStudent();
      
    //.log(this.deptttNameee);
   
  }
  displayDetail() {
    this.display_studentDetails = true;
    this.addStudentform = this.formBuilder.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.pattern("[a-zA-Z].*")]],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.pattern("[a-zA-Z].*")]],
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required,]],
      mark1: ['', [Validators.required,]],
      mark2: ['', [Validators.required,]],
      mark3: ['', [Validators.required,]],
      mark4: ['', [Validators.required,]],
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
  onSubmit(addStudentform: any) {
    if (this.studentdetails.stu.id == 0)
      this.addStudent(addStudentform);
    else
      this.updateStudent(addStudentform);
  }
  Add_Student() {
    this.display_addStudent = true;
    this.display_studentDetails = false;
  }
  addStudent(aadStudentform: any) {
    if (this.addStudentform.valid) {
      this.studentdetails.postStudent().subscribe(
        (res: any) => {
          console.log(res);
          this.confirmService.showConfirm("Are you sure want to  add the student ??",
            () => {
              this.getAllStudent();
              this.addStudentform.reset();
              (this.toast.success({ detail: this.student.firstName + " " + this.student.lastName + res.message }));
            },
            () => {
              this.addStudentform.reset();
            }
          )
        })
    }
    else {
      console.log("Form is not valid")
      this.validateAllFormFields(this.addStudentform);
    }
  }
  getAllStudent() {
    this.display_addStudent = false;
    this.display_editStudent =false;
    this.display_studentDetails = true;
    this.studentdetails.getStudent().subscribe(
      (res: any) => {
        console.log(res);
        this.studentList = res.studentDetails;
      })
      let pageIndex=(this.selectedPage-1)*this.dataPerPage;
    this.products=this.studentList.slice(pageIndex,this.dataPerPage);
     
  }
  deleteStudent(id: number) {

    Swal.fire({
      title: "Are you sure want to  delete  the student of " + this.studentdetails.stu.firstName + "??",
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
         this.studentdetails.deleteStudentApi(id).subscribe(
          (res: any) => {
            this.getAllStudent();

            (this.toast.success({ detail: this.student.firstName + " " + this.student.lastName + res.message }));
          })
      }
      else if (result.isDenied) {
      }

    });
  }
  updateStudentForm(selectedRecord: Student) {

    this.display_editStudent = true;
    this.display_addStudent=false;
    this.display_studentDetails = false;
    this.studentdetails.stu = Object.assign({}, selectedRecord);
  }
  updateStudent(stu: any) {
  
    this.studentdetails.updateStudentApi().subscribe(
      (res: any) => {
        console.log(res);

        Swal.fire({
          title: "Are you sure want to  update the student of " +  "??",
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
            this.addStudentform.reset();
            this.getAllStudent();
            
            (this.toast.success({ detail: this.studentdetails.stu.firstName + res.message }));
          }
          else if (result.isDenied) {
            this.addStudentform.reset();
          }
    
        });
        this.getAllStudent();
      })
  }

  onBack() {

  }
  onBackReport(){
    //this.display_addStudent=true;
    this.display_studentDetails=true;
    this.display=false;
  }

  selectStudent(student: any)                                                       //selecting student object for display graph
  {
    this.studentMark = student
  }
  displayGraph() {
    this.isBarGraphDisplay = true;
    this.isLineGraphDisplay = true;
    this.isPieChartDisplay = true;
    this.displayDownload = true;
  }
  detailsById(id: any) {
    this.display = true;
    this.display_studentDetails = false;
    this.studentdetails.getStudentDetailsById(id).subscribe(
      (res: any) => {
        console.log(res);
        this.studentListtt.push(res.studentDetails);
      })
  }
 
public makepdf(): void {
let DATA: any = document.getElementById('htmlData');
html2canvas(DATA).then((canvas) => {
let fileWidth = 180;
 let fileHeight = (canvas.height * fileWidth) / canvas.width;
const FILEURI = canvas.toDataURL('image/png');
 let PDF = new jsPDF('p', 'mm', 'a4');
 let position = 0;
 PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
 PDF.save('report.pdf');
 });
}



  toBack() {
    this.display_studentDetails = true;
    this.display_addStudent = false;
    this.display_editStudent = false;
    this.display = false;
  }


  changePageSize(event:Event)
  {
  const newSize=(event.target as HTMLInputElement).value
  this.dataPerPage=Number(newSize);
  this.changePage(1);
  }
  get pageNumber():number[]{
    return Array(Math.ceil(this.studentList.length/this.dataPerPage))
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
    this.products=this.studentList.slice(pageIndex,endIndex);
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

}






