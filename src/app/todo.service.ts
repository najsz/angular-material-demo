import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Todo} from './models/todo';
import {of} from 'rxjs/observable/of';
import {TodoPriority} from './models/todo-priority';
import {delay} from 'rxjs/operators';

/**
 * This service is a mock for an external server.
 */
@Injectable()
export class TodoService {

  constructor() {
  }

  private todos: Todo[] = [{
    id: 1,
    completed: false,
    note: 'Sparkly...',
    description: 'Clean the kitchen',
    priority: TodoPriority.HIGH
  }, {
    id: 2,
    completed: false,
    note: 'Food',
    description: 'Get groceries',
    priority: TodoPriority.MEDIUM
  }, {
    id: 3,
    completed: true,
    note: 'Really...',
    description: 'Take out the trash',
    priority: TodoPriority.LOW
  }];

  public getTodos(): Observable<Todo[]> {
    return of(this.todos)
      .pipe(
        delay(500)
      );
  }

  public deleteTodo(id: number): Observable<Todo[]> {
    const index = this.findTodo(id);
    this.todos.splice(index, 1);
    return this.getTodos();
  }

  public updateTodo(todo: Todo): Observable<Todo[]> {
    const index = this.findTodo(todo.id);
    this.todos.splice(index, 1, todo);
    return this.getTodos();
  }

  public addTodo(todo: Todo): Observable<Todo[]> {
    let id = this.todos[this.todos.length - 1].id;
    id++;
    this.todos.push({...todo, completed: false, id});
    return this.getTodos();
  }

  private findTodo(id): number {
    return this.todos.findIndex(item => item.id === id);
  }
}
