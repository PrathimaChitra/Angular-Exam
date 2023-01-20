import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Department } from '../Shared/department';

@Injectable({
  providedIn: 'root'
})
export class DeptService {
  readonly baseURL = 'https://localhost:7000/api/Department';
   readonly deptNameUrl='https://localhost:7000/deptname';
  dept:Department = new Department()
  constructor(private http:HttpClient) { }

  public getDepartment(){
    return this.http.get(this.baseURL);
  }
  public postDepartment(){
    return this.http.post(this.baseURL,this.dept);
  }
  public deleteDeptApi(departmentId:number){
    return this.http.delete(`${this.baseURL}/${departmentId}`);  
  }
  public updateDeptApi(){
    return this.http.put(`${this.baseURL}/${this.dept.departmentId}`,this.dept);  
  }
  public getDeptName(){
    return this.http.get(this.deptNameUrl);  
  }
}
