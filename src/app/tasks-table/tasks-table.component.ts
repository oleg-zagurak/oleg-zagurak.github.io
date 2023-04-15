import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Task } from './../app.component';
@Component({
  selector: 'app-tasks-table',
  templateUrl: './tasks-table.component.html',
  styleUrls: ['./tasks-table.component.css']
})
export class TasksTableComponent implements OnInit, OnChanges {
  public taskList: Task[] = [new Task('HTML', true), new Task('Javascript', true), new Task('CSS3'), new Task('SCSS'), new Task('Angular')];
  private editIndex: number = 0;
  public editMode: boolean = false;
  public editValue: string = '';
  private emptyList: boolean = false;
  @Output() taskCount = new EventEmitter<number>(true);
  @Input() newTask!: Task;
  constructor() { }

  ngOnInit(): void {
    this.taskCount.emit(this.taskList.length)
  }
  ngOnChanges(): void {
    let checkDuplicate: Task | undefined = this.taskList.find(task => (this.newTask && this.newTask.taskName === task.taskName));
    if (checkDuplicate === undefined && this.newTask) {
      this.taskList.push(this.newTask);
      this.taskCount.emit(this.taskList.length)

    }
  }
  get empty(): boolean{
    return this.taskList.length > 0 ? true : false;
  }

  changeStatus(index: number): void {
    this.taskList[index].setTaskStatus()
  }
  edit(index: number): void {
    this.editIndex = index;
    this.editMode = true;
    this.editValue = this.taskList[index].taskName;
  }
  delete(index: number): void {
    this.taskList.splice(index, 1);
    this.taskCount.emit(this.taskList.length);
  }
  save(name: string): void{
    if(name.trim()) {
      this.taskList[this.editIndex].taskName = name;
      this.editMode = false;
      this.editValue = '';
    }
  }
}
