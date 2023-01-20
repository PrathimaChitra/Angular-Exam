import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgConfirmService } from 'ng-confirm-box';
import { DeptService } from 'src/app/Service/dept.service';
import { Department } from 'src/app/Shared/department';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {
DeptList:any;
addDeptform:FormGroup;
addDept:any;

displayDept:any;
depart:any;
DeptName:any;
DeptList1:any;

// departmentName=[{
//   DepartmentName:''
// }];

departmentName :string[]=[]
  constructor( public depttt:DeptService,private formbuilder:FormBuilder,private confirmService:NgConfirmService) {
    
   }

  ngOnInit(): void {

   this.displayDetails();
   this.getAllDept();
   this.getAllDeptName();
console.log(this.DeptList1);

  }
  getAllDeptName(){
    this.depttt.getDeptName().subscribe(
      (res: any) => {
        console.log(res);
        this.DeptList1= res
      })
  }

  displayDetails(){
this.addDeptform = this.formbuilder.group({
    deptname: [''],
    branch: ['']
})
}
getAllDept(){
  this.displayDept=true;
    this.depttt.getDepartment().subscribe(
      (res: any) => {
        console.log(res);
        this.DeptList= res.deptDetails;
///////////////////////////
        // this.departmentName=[];
        // for(let i=0;i< this.DeptList.length;i++)
        // {
        // //this.DeptName=(this.DeptList[i].departmentName);
        // //this.departmentName.push(this.DeptName)
        // this.departmentName.push(this.DeptList[i].departmentName)
        
        // }
        // console.log(this.departmentName);
   
      }) 
   
  }

  onSubmit(addDeptform:any){

      if (this.depttt.dept.departmentId == 0)
        this.addDeptartment(addDeptform);
      else
        this.updateDept(addDeptform);
    }

    Add_Dept() {
      this.addDept = true;
      this.displayDept=false;
    }
    addDeptartment(addDeptform: any) {
    
        this.depttt.postDepartment().subscribe(
          (res: any) => {
            console.log(res);
            this.confirmService.showConfirm("Are you sure want to  add the student ??",
              () => {
                this.getAllDept();
                
                this.addDeptform.reset();
                this.addDept=false;
             },
              () => {
                this.addDeptform.reset();
              }
            )
          })
      }
      updateStudentForm(selectedRecord:Department) {

  
        this.addDept=true;
        this.displayDept=false;
        this.depttt.dept = Object.assign({}, selectedRecord);
      }
       updateDept( addDeptform:any){
       
        this.depttt.updateDeptApi().subscribe(
         (res: any) => {
     
             this.getAllDept();
         });
         this.displayDept=true;
         this.addDept=false;
        }
        deleteDept(departmentId:number) {

          Swal.fire({
            title: "Are you sure want to  delete  the Department?",
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
              this.depttt.deleteDeptApi(departmentId).subscribe(
                (res: any) => {
                  this.getAllDept();
                  this.displayDept = true;
                })
            }
            else if (result.isDenied) {
            }
      
          });
        }
        cancel(){
          this.addDeptform.reset();

        }

    }
  
