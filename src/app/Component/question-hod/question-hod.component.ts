import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/Service/question.service';

@Component({
  selector: 'app-question-hod',
  templateUrl: './question-hod.component.html',
  styleUrls: ['./question-hod.component.scss']
})
export class QuestionHodComponent implements OnInit {

  constructor(private questionService:QuestionService) { }
AllQuestion:any;
  ngOnInit(): void {
    this.displayAllquestion();

  }
  displayAllquestion(){
    this.questionService.getAllQuestion().subscribe(
      (res:any)=>{
      this.AllQuestion=res.studentDetails;
    });
  }

}
