import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from 'src/app/Service/question.service';
import { SignupService } from 'src/app/signup.service';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit {
  questin: any = [];
  //qnID:''
  // qns:"",
  // imageName:"",
  // options:'',


  constructor(private router: Router, public qnss: QuestionService) { }

  ngOnInit() {
    if (parseInt(localStorage.getItem('seconds')) >0) {
      this.qnss.seconds = parseInt(localStorage.getItem('seconds'));
      this.qnss.qnProgress = parseInt(localStorage.getItem('qnProgress'));
      this.qnss.question = JSON.parse(localStorage.getItem('question'));
      if (this.qnss.qnProgress == 10)
        this.router.navigate(['/result']);
      else
        this.startTimer();
    }
    else{
    this.qnss.seconds = 0;
    this.qnss.qnProgress = 0;
    this.qnss.getQuestionn().subscribe(
      (res: any) => {
        this.qnss.question=res;
        //this.questin = res;
        this.startTimer();
        //console.log( this.qnss.question);
      }
    );
    }
   
  }
  startTimer() {
    this.qnss.timer = setInterval(() => {
      this.qnss.seconds++;
      localStorage.setItem('seconds',this.qnss.seconds.toString());
    }, 1000);
  }

  Answer(qID: any, choice: any) {
    this.qnss.question[this.qnss.qnProgress].answer = choice;
    localStorage.setItem('question',JSON.stringify(this.qnss.question));
    this.qnss.qnProgress++;
   localStorage.setItem('qnProgress',this.qnss.qnProgress.toString());
    if (this.qnss.qnProgress == 5) {
      clearInterval(this.qnss.timer);
      this.router.navigate(["/result"]);
    }
  }



}
