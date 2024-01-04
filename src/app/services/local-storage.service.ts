import { Injectable } from '@angular/core';
import { Task } from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }
  updateLocalStorage(tasksList: Task[], key: string) {
    localStorage.setItem('key', JSON.stringify(tasksList));
  }
}
