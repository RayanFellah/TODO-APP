import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Task } from 'src/app/model/task';
import { DONE, IN_PROGRESS, TODO } from 'src/assets/constants';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  todoInput: string = '';
  todo: Task[] = [];
  inProgress: Task[] = [];
  done: Task[] = [];
  isEditing: boolean = false;
  updateId: number | undefined;
  constructor() {}
  ngOnInit() {
    const storedTodo = localStorage.getItem('Tasks');
    if (storedTodo) {
      this.todo = JSON.parse(storedTodo)[TODO];
      this.inProgress = JSON.parse(storedTodo)[IN_PROGRESS];
      this.done = JSON.parse(storedTodo)[DONE];
    }
    localStorage.setItem('Tasks', JSON.stringify({
      TODO: this.todo,
      IN_PROGRESS: this.inProgress,
      DONE: this.done
    }));
    console.log(storedTodo)
  }
  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      localStorage.setItem('Tasks', JSON.stringify({
        TODO: this.todo,
        IN_PROGRESS: this.inProgress,
        DONE: this.done
      }));
    }
  }
  addTaskTodo(task: string): void {
    this.todo.push({
      description: task,
      date: new Date(),
      done: false,
    })
    this.todoInput = '';
    localStorage.setItem('Tasks', JSON.stringify({
      TODO: this.todo,
      IN_PROGRESS: this.inProgress,
      DONE: this.done,
    }));
  }
  deleteTask(index: number, list: Task[]) {
    if (index === this.updateId) {
      this.isEditing = false;
    };
    list.splice(index, 1);
    localStorage.setItem('Tasks', JSON.stringify({
      TODO: this.todo, 
      IN_PROGRESS: this.inProgress,
      DONE: this.done
    }));
    return list;
  }
  editTask(index: number, list: Task[]) {
    this.isEditing = true;
    this.updateId = index;
    const taskToEdit = list[index];
    this.todoInput = taskToEdit.description;
  }
  updateTaskTodo(list: Task[]) {
    list[this.updateId as number] = {description: this.todoInput, date: new Date(), done: false};
    this.isEditing = false;
    localStorage.setItem('Tasks', JSON.stringify({
      TODO:this.todo, 
      IN_PROGRESS: this.inProgress,
      DONE:this.done
    }));
  }
}
