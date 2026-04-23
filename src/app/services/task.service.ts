import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/tasks`);
  }

  getTask(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/tasks/${id}`);
  }

  createTask(task: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/tasks`, task);
  }

  updateTask(id: number, task: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/tasks/${id}`, task);
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/tasks/${id}`);
  }

  getTasksByStatus(status: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/tasks/status/${status}`);
  }
}
