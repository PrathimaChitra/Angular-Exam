import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Student } from './Shared/student.model';


@Injectable({
  providedIn: 'root'
})
export class StudentdetailsService {
  public studentUrl:string='https://localhost:7000/api/Student/';
  readonly baseURL = 'https://localhost:7000/api/Student';
  stu:Student = new Student()
  constructor(private http:HttpClient) { }

  public getStudent(){
    return this.http.get(this.baseURL);
  }
  public postStudent(){
    return this.http.post(this.baseURL,this.stu);
  }
 
  public deleteStudentApi(id:number){
    return this.http.delete(`${this.baseURL}/${id}`);  
  }
  public updateStudentApi(){
    return this.http.put(`${this.baseURL}/${this.stu.id}`,this.stu);  
  }
  public  getStudentDetailsById(id:number){
    return this.http.get(`${this.baseURL}/${id}`);    
  }
}


