import { autoinject } from "aurelia-framework";
import { HttpClient, json } from "aurelia-fetch-client";

interface Todo {
  id?: number;
  name: string;
  isComplete: boolean;
}

@autoinject
export class App {
  private url = "http://localhost:3000/api/todos";
  newTodo = "";
  todos: Todo[] = [];

  constructor(private http: HttpClient) { 
    this.getTodos();
  }

  async getTodos() {
    const response = await this.http.fetch(this.url);
    this.todos = await response.json();
  }

  async addTodo() {
    await this.http.post(this.url, json({ name: this.newTodo }));
    await this.getTodos();
    this.newTodo = "";
  }

  async markCompleted(todo: Todo) {
    await this.http.post(this.url, json(todo));
    await this.getTodos();
  }

  async deleteTodo(id: number) {
    await this.http.delete(`${this.url}/${id}`);
    await this.getTodos();
  }
}
