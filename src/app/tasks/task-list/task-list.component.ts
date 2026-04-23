import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

export interface Task {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  created?: string;
  createdDate?: Date;
  updated?: string;
  userId: number;
  user?: any;
}

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  isLoading = false;
  errorMessage = '';
  currentFilter: 'all' | 'pending' | 'completed' = 'all';

  constructor(
    private taskService: TaskService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    this.loadTasks();
  }

  loadTasks(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.taskService.getTasks().subscribe(
      tasks => {
        console.log('Tasks received from backend:', tasks);
        this.tasks = tasks;
        this.filterTasks();
        this.isLoading = false;
      },
      error => {
        this.errorMessage = 'Failed to load tasks. Please try again.';
        this.isLoading = false;
      }
    );
  }

  setFilter(filter: 'all' | 'pending' | 'completed'): void {
    this.currentFilter = filter;
    this.filterTasks();
  }

  filterTasks(): void {
    switch (this.currentFilter) {
      case 'pending':
        this.filteredTasks = this.tasks.filter(task => this.isTaskCompleted(task) === false);
        break;
      case 'completed':
        this.filteredTasks = this.tasks.filter(task => this.isTaskCompleted(task) === true);
        break;
      default:
        this.filteredTasks = this.tasks;
    }
  }

  isTaskCompleted(task: any): boolean {
    return task.isCompleted === true || task.status === 'completed';
  }

  toggleTaskStatus(task: Task): void {
    const currentStatus = this.isTaskCompleted(task);
    
    console.log('Toggling task status:', { taskId: task.id, currentStatus, newStatus: !currentStatus });
    
    this.taskService.toggleTaskStatus(task.id).subscribe(
      response => {
        console.log('Toggle response:', response);
        // After successful toggle, reload tasks to get updated status
        this.loadTasks();
      },
      error => {
        console.error('Failed to update task status:', error);
        this.errorMessage = 'Failed to update task status.';
      }
    );
  }

  deleteTask(taskId: number): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(taskId).subscribe(
        () => {
          this.tasks = this.tasks.filter(task => task.id !== taskId);
          this.filterTasks();
        },
        error => {
          this.errorMessage = 'Failed to delete task.';
        }
      );
    }
  }

  getEmptyMessage(): string {
    switch (this.currentFilter) {
      case 'pending':
        return 'No pending tasks. Great job!';
      case 'completed':
        return 'No completed tasks yet.';
      default:
        return 'No tasks found. Create your first task!';
    }
  }
}
