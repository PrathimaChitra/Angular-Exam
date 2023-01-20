import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from 'src/app/Service/question.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  constructor(public questionService:QuestionService,private router:Router) { }

  ngOnInit(): void {
     if(parseInt(localStorage.getItem('qnProgress'))==5){
      this.questionService.seconds = parseInt(localStorage.getItem('seconds'));
       this.questionService.qnProgress = parseInt(localStorage.getItem('qnProgress'));
       this.questionService.question = JSON.parse(localStorage.getItem('qns'));
    
    this.questionService.getAnswer().subscribe(
      (res:any)=>{
        this.questionService.correctAnswerCount=0;
        this.questionService.question.forEach((e:any,i:any) =>{
          if(e.answer==res[i])
          this.questionService.correctAnswerCount++;
        e.correct=res[i];
        });
      }
    );
    }
   else
   this. router.navigate(["/exam"]);
     }


  OnSubmit() {
    this.questionService.submitScore().subscribe(() => {
      //this.restart();
    });
  }
   restart() {
    localStorage.setItem('qnProgress', "0");
     localStorage.setItem('qns', "");
     localStorage.setItem('seconds', "0");
     this.router.navigate(['/exam']);
   }

}
