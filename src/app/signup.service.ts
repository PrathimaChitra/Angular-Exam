import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from './Shared/user.model';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  readonly baseURL = 'https://localhost:7000/api/Login';
  user: User = new User();
  list: User[];
  private userPlayload: any;
  constructor(private http: HttpClient, private router: Router) {
    this.userPlayload = this.decodedToken();
  }

  public signUp() {
    return this.http.post(this.baseURL, this.user);
  }
  login(stuObj: any) {
    return this.http.post<any>(`https://localhost:7000/api/Login/login`, stuObj);
  }
  getUserApi() {
    return this.http.get(this.baseURL).subscribe(
      res => this.list = res as User[]
    );
  }
  getUserDetails(){
    return this.http.get(this.baseURL);
  }
  public deleteUserApi(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }
  public updateUserApi() {
    return this.http.put(`${this.baseURL}/${this.user.id}`, this.user)
  }
  public getUserById(id: number) {
    return this.http.get(`${this.baseURL}/${id}`);
  }

  storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue)
  }
  getToken() {
    return localStorage.getItem('token')
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token')
  }
  signout() {
    localStorage.clear();
    this.router.navigate(["login"]);

  }
  
  decodedToken() {
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    console.log(jwtHelper.decodeToken(token))
    return jwtHelper.decodeToken(token)
  }
  getNameFromToken() {
    if (this.userPlayload)
      return this.userPlayload.name;
  }
  getRoleFromtoken() {
    if (this.userPlayload)
      return this.userPlayload.role;
  }
 
  getuserNameFromtoken() {
    if (this.userPlayload)
      return this.userPlayload.email;
  }

  getmobileNameFromtoken() {
    if (this.userPlayload)
      return this.userPlayload.primarysid;
  }
  public getUser() {
    let userStr = localStorage.getItem("user");
    if (userStr != null) {
      return JSON.parse(userStr);
    } else {
      
      return null;
    }
  }
  public setUser(user: any) {

    localStorage.setItem('user', JSON.stringify(user));
  }
  public getUserRole(){
    let user= this.getUser();
    return user.role;
  }

}

