import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public task!: Task;
  public amount!: number;
  createTask(name: string): void {
    if (name.trim()) {
      this.task = new Task(name);
    }
  }
  setAmount(amount: number): void {
    this.amount = amount;
  }
}


export class Task {
  private name !: string
  private static inprogress = "In PROGRESS"
  private static done = "DONE"
  private status = false;
  constructor(name: string, checked: boolean = false) {
    this.name = name;
    if (checked) this.setTaskStatus()
  }
  set taskName(name: string) {
    this.name = name;
  }
  get taskName(): string {
    return this.name
  }
  get taskProgress(): string {
    if (this.status) {
      return Task.done
    } else {
      return Task.inprogress
    }
  }
  get taskStatus(): boolean {
    return this.status
  }
  setTaskStatus() {
    this.status = !this.status;
  }
}