import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { StudentdashboardComponent } from './studentdashboard/studentdashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { StudentDetailComponent } from './student-detail/student-detail.component';
import { NgToastModule } from 'ng-angular-popup';
import { UserComponent } from './user/user.component';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { BarGraphComponent } from './bar-graph/bar-graph.component';
import { LineGraphComponent } from './line-graph/line-graph.component';
import { PieGraphComponent } from './pie-graph/pie-graph.component';
import { NgConfirmModule } from 'ng-confirm-box';
import { AboutUsComponent } from './about-us/about-us.component';
import { ProfileComponent } from './profile/profile.component';
import { SortingDirective } from './sorting.directive';
import { EllipseDirective } from './ellipse.directive';
import { HeaderNavComponent } from './header-nav/header-nav.component';
import { DepartmentComponent } from './Component/department/department.component';
import { StudentdetailsService } from './studentdetails.service';
import { DeptService } from './Service/dept.service';
import { ExamComponent } from './Component/exam/exam.component';
import { QuestionHodComponent } from './Component/question-hod/question-hod.component';
import { ResultComponent } from './Component/result/result.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    StudentdashboardComponent,
    StudentDetailComponent,
    UserComponent,
    BarGraphComponent,
    LineGraphComponent,
    PieGraphComponent,
    AboutUsComponent,
    ProfileComponent,
    SortingDirective,
    EllipseDirective,
    HeaderNavComponent,
    DepartmentComponent,
    ExamComponent,
    QuestionHodComponent,
    ResultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgToastModule,
    FilterPipeModule,
    NgConfirmModule,
    
  ],
  providers: [DeptService],
  bootstrap: [AppComponent],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }
