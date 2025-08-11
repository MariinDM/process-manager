import { Component, inject, OnDestroy, OnInit, ViewChild, ChangeDetectorRef, input, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Websocket } from '../../../../shared/services/websocket';
import { TaskService } from '../../services/task-service';
import { AllColumns, Task, TaskStatus } from '../../task-interfaces';
import { CdkDropList, CdkDrag, transferArrayItem, moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-list-process',
  imports: [
    CommonModule,
    CdkDropList,
    CdkDrag
  ],
  templateUrl: './list-process.html',
  styleUrl: './list-process.scss'
})
export class ListProcess implements OnInit, OnDestroy {

  private websocketService = inject(Websocket);
  private taskService = inject(TaskService);
  private cdr = inject(ChangeDetectorRef);

  @Input() status: TaskStatus = 'pending';
  @Input() connectedDropLists: string[] = [];

  tasks: AllColumns = {
    pending: [],
    in_progress: [],
    completed: [],
    cancelled: []
  };

  ngOnInit() {
    this.websocketService.connect();

    this.websocketService.onTaskCreate().subscribe(task => {
      this.updateTaskStatus(task, task.status as TaskStatus);
    });

    this.websocketService.onTaskUpdate().subscribe(task => {
      this.updateTaskStatus(task, task.status as TaskStatus);
    });

    // 🗑️ Listener para eliminación de tareas

    // this.websocketService.onTaskDeletion().subscribe(task => {
    //   const tmpStatus = task.status as TaskStatus;
    //   this.tasks[tmpStatus] = this.tasks[tmpStatus].filter(t => t.id !== task.id);
    //   this.cdr.detectChanges();
    // });

    this.getTaskByStatus(this.status);
  }

  ngOnDestroy() {
    this.websocketService.disconnect();
  }

  getTaskByStatus(status: string, limit?: string, active: boolean = true) {
    this.taskService.getTasksByStatus(status, limit, active).subscribe({
      next: (response) => {
        console.log(response);
        const tmpStatus = status as TaskStatus;
        this.tasks[tmpStatus] = response.data;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('❌ Error al cargar tareas por estado:', error);
      }
    });
  }

  getStatusLabel(status: string | undefined): string {
    const statusMap: Record<string, string> = {
      'pending': '⏳ Pendiente',
      'in_progress': '🔄 En Progreso',
      'completed': '✅ Completada',
      'cancelled': '❌ Cancelada'
    };

    return statusMap[status || 'pending'] || '📝 Sin Estado';
  }

  formatDate(dateString: string | undefined): string {
    if (!dateString) return '';

    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return 'Hace unos minutos';
    } else if (diffInHours < 24) {
      return `Hace ${Math.floor(diffInHours)} horas`;
    } else {
      return date.toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    }
  }

  drop(event: CdkDragDrop<Task[]>) {
    const previousContainer = event.previousContainer;
    const currentContainer = event.container;

    if (previousContainer === currentContainer) {
      moveItemInArray(currentContainer.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(previousContainer.data, currentContainer.data, event.previousIndex, event.currentIndex);
    }
  }

  updateTaskStatus(task: Task, newStatus: TaskStatus) {
    const tmpStatus = task.status as TaskStatus;
    const existingIndex = this.tasks[tmpStatus].findIndex(t => t.id === task.id);

    console.log({ existingIndex });

    if (existingIndex !== -1) {
      this.tasks[tmpStatus][existingIndex] = task;
    } else {
      this.tasks[tmpStatus].push(task);
    }
    this.cdr.detectChanges();
  }
}
