import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Movies } from "../interface/Movies";
import { User } from "../interface/User";

 

@Injectable({
    providedIn: 'root',
})

export class UserServices{
   
    baseURL : string ="http://localhost:3100/";
    constructor(private http : HttpClient){}
   
      getAllMovies(): Observable<any> {
        return this.http.get<Movies>(`${this.baseURL}api/v1/getAllMovies`);
      }
     
      login(person:User): Observable<any> {
         
        const headers = { 'content-type': 'application/json'}  
        const body=JSON.stringify(person);
        return this.http.post(`${this.baseURL}api/v1/login`, body,{'headers':headers})
      }


      signup(task:any): Observable<any> {
        const headers = { 'content-type': 'application/json'}  
        const body=JSON.stringify(task);
        return this.http.post(`${this.baseURL}api/v1/signup`, body,{'headers':headers})
      }

    
      addDataToStorage(userData:any){
        localStorage.setItem('userData',JSON.stringify(userData));
      }

      getDataFromStorage(storageKey: any) {
        return localStorage.getItem(storageKey);
      }

      clearStorageData(storageKey: any) {
        return localStorage.removeItem(storageKey);
      }
 

}
