import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) {
    //this.getTasks();
  }
  getTasks(){
    // our http response is an Observable, store it in a variable
    //let tempObservable = this._http.get('/tasks');
    // subscribe to the Observable and provide the code we would like to do with our data from the response
    //tempObservable.subscribe(data => console.log("Got our tasks!", data));
    return this._http.get('/tasks')
 }

 //code from Alan demo
 getStuff(){
   console.log('i am in the clog twice');
   return this._http.get('/tasks/');
 }
 //createing new task and adding it to  MongoDB
 createTask(input){
   return this._http.post('/tasks', input);
 }
 deleteTask(id){
   return this._http.delete('/tasks/' + id);
 }
//  updateTask(data){
//    return this._http.put('/tasks/edit/' + data._id, data);
//  }
 showTask(id){
   return this._http.get('/tasks/' + id);
 }
 updateTask(input){
   return this._http.put('/tasks/' + input._id, input)
 }
}
