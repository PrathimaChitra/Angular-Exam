import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { DepartmentComponent } from './Component/department/department.component';
import { ExamComponent } from './Component/exam/exam.component';
import { QuestionHodComponent } from './Component/question-hod/question-hod.component';
import { ResultComponent } from './Component/result/result.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthenticationGuard } from './RouteGuard/authentication.guard';
import { SignupComponent } from './signup/signup.component';
import { StudentDetailComponent } from './student-detail/student-detail.component';
import { StudentdashboardComponent } from './studentdashboard/studentdashboard.component';
import { UserGuard } from './user.guard';
import { UserComponent } from './user/user.component';

const routes: Routes = [
 { path:'login',component:LoginComponent},
 { path:'signup',component:SignupComponent},
 { path:'dashboard',component:StudentdashboardComponent},
 { path:'studentDetails',component:StudentDetailComponent},
 { path:'user',component:UserComponent},
 { path:'about',component:AboutUsComponent},
 { path:'profile',component:ProfileComponent},
 { path:'dept',component:DepartmentComponent},
 { path:'exam',component:ExamComponent},
 { path:'qnshod',component:QuestionHodComponent},
 { path:'result',component:ResultComponent},
 {path:'',redirectTo:'/dashboard',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
