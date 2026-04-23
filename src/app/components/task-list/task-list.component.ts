import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: any[] = [];
  filterStatus: string = 'all';

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    if (this.filterStatus === 'all') {
      this.taskService.getTasks().subscribe(
        tasks => this.tasks = tasks,
        error => console.error('Error loading tasks', error)
      );
    } else {
      this.taskService.getTasksByStatus(this.filterStatus).subscribe(
        tasks => this.tasks = tasks,
        error => console.error('Error loading filtered tasks', error)
      );
    }
  }

  onFilterChange(status: string): void {
    this.filterStatus = status;
    this.loadTasks();
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe(
      () => this.loadTasks(),
      error => console.error('Error deleting task', error)
    );
  }

  toggleTaskStatus(task: any): void {
    task.status = task.status === 'completed' ? 'pending' : 'completed';
    this.taskService.updateTask(task.id, task).subscribe(
      () => this.loadTasks(),
      error => console.error('Error updating task', error)
    );
  }
}
