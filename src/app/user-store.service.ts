import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
 private name$=new BehaviorSubject<string>("");
 private role$=new BehaviorSubject<string>("");
 private username$=new BehaviorSubject<string>("");
 
  constructor() { }

  public  getNameFromStore(){
   return  this.name$.asObservable();
  
  }
  public setNameforStore(Name:string){
    this.name$.next(Name)
  }
  public  getRoleFromStore(){
    return  this.role$.asObservable();
   
   }
   public setRoleforStore(role:string){
     this.role$.next(role)
   }
   public  getuserNameFromStore(){
    return  this.username$.asObservable();
   
   }
   public setuserNameforStore(userName:string){
     this.username$.next( userName)
   }
 
}
