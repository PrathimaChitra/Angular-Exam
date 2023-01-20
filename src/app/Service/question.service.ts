import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
 readonly imageurl='https://localhost:7000';
 readonly qnsAllUrl='https://localhost:7000/qnssss';

  readonly rootUrl='https://localhost:7000/api/Quiz';
 readonly particateUrl='https://localhost:7000/updateOutput'
  question:any=[];
  seconds:number;
  timer:any;
  qnProgress:number;
  correctAnswerCount:number=0;
  constructor( private http:HttpClient) { }

displayTimeElaspsed(){
  return Math.floor(this.seconds/3600)+':'+Math.floor(this.seconds/60)+':'+Math.floor(this.seconds%60);
}
  getQuestionn(){
    return this.http.get(this.rootUrl);
  }
  getAllQuestion(){
    return this.http.get(this.qnsAllUrl)
  }
  getAnswer()
  {
    var body=this.question.map((x:any) =>x.qnID);
    return this.http.post(this.rootUrl,body);
  }
  getStudentDetails(){
    var student=JSON.parse(localStorage.getItem('userDetails'));
    return student.name;
  }
  submitScore() {
    var body = JSON.parse(localStorage.getItem('userDetails'));
    body.Score = this.correctAnswerCount;
    body.TimeSpent = this.seconds;
    return this.http.post(this.particateUrl, body);
  }

}
