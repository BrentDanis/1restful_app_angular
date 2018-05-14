import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit
{
  title = 'gitObjects()';
  description = 'You like dumb stuff, we like money, lets trade. --Signed Fancy Marketer';
  details = [];
  newtask = {title: "", description: ""};
  editTask = [];
  tasks = [];
  constructor(private _httpService: HttpService){
    // this.fullImagePath = 'assets/images/gitObjectsAngular.png'
  }

  ngOnInit()
  {
    this.getStuff()

  }
  
// code from alan demo
  getStuff(){
    console.log("i am doing your work")
    let tempObservable = this._httpService.getStuff()
    tempObservable.subscribe(data=>{
      this.tasks = data;
  });
}
newTaskForm(){
  let tempObservable = this._httpService.createTask(this.newtask);
  tempObservable.subscribe(data=>{
    console.log('we subscribed to createTask', this.newtask);
    this.getStuff();
    this.newtask = {title: "", description: ""};
  });
}
deleteTask(id){
  console.log('we are about to delete a task');
  let tempObservable = this._httpService.deleteTask(id);
  tempObservable.subscribe(data =>{
    console.log('we hit were able to delete');
    this.getStuff();
  })
}

showTask(id){
  console.log('we hit the showTask function');
  let tempObservable = this._httpService.showTask(id);
  tempObservable.subscribe(data=> {
    console.log('we are in the showTask function', data);
    this.details = data;
  })
}
sendToEdit(){
  this.editTask = this.details;
  this.details = {};
}
// updateTask(){
//   let Observable = this._httpService.updateTask(this.updateTask)
// }
updateTask(){
  console.log('going to make an update');
  let tempObservable = this._httpService.updateTask(this.editTask);
  tempObservable.subscribe(data =>{
    console.log('updated data!! WINNING!!');
  })
  this.getStuff();
  this.showTask(this.editTask._id);
  this.editTask = [];
}
}
