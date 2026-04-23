import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { AuthService } from '../../services/auth.service';

export interface Task {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  createdDate: Date;
  userId: number;
}

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  taskForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  isEditMode = false;
  taskId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      isCompleted: [false]
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.taskId = +id;
        this.loadTask(this.taskId);
      }
    });
  }

  loadTask(id: number): void {
    this.isLoading = true;
    this.taskService.getTask(id).subscribe(
      task => {
        this.taskForm.patchValue({
          title: task.title,
          description: task.description,
          isCompleted: task.isCompleted
        });
        this.isLoading = false;
      },
      error => {
        this.errorMessage = 'Failed to load task.';
        this.isLoading = false;
      }
    );
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      const taskData = {
        title: this.taskForm.get('title')?.value,
        description: this.taskForm.get('description')?.value,
        isCompleted: this.taskForm.get('isCompleted')?.value
      };

      if (this.isEditMode && this.taskId) {
        this.taskService.updateTask(this.taskId, taskData).subscribe(
          response => {
            this.router.navigate(['/tasks']);
          },
          error => {
            this.errorMessage = 'Failed to update task.';
            this.isLoading = false;
          }
        );
      } else {
        this.taskService.createTask(taskData).subscribe(
          response => {
            this.router.navigate(['/tasks']);
          },
          error => {
            this.errorMessage = 'Failed to create task.';
            this.isLoading = false;
          }
        );
      }
    }
  }

  cancel(): void {
    this.router.navigate(['/tasks']);
  }
}
