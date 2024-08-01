import { Component } from '@angular/core';
import { Itask } from './Itask';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'mini-trello';
  tasks: Itask[] = [];
  addTask(inputValue:string,name:string){
    this.tasks.push({ taskName: name,task: inputValue ,status: 'todo'})
  }
  ondragstart(event:DragEvent,item:Itask){
    let index = this.tasks.findIndex((id)=>id.task==item.task)
    event.dataTransfer?.setData('task',index.toString())
  }

  ondragover(event:DragEvent){event.preventDefault()}

  ondrop(event:DragEvent,status:string){
    let taskIndex = Number(event.dataTransfer?.getData('task'))
    let dropTask = this.tasks[taskIndex]
    this.tasks.splice(taskIndex, 1);
    dropTask.status = status
    this.tasks.push(dropTask)
    event.dataTransfer?.clearData()
  }
}
