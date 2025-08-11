import { Component } from '@angular/core';
import { Nav } from '../../../../shared/components/nav/nav';
import { ListProcess } from '../../pages/list-process/list-process';
import { TaskStatus } from '../../task-interfaces';

@Component({
  selector: 'app-tracking-layout',
  imports: [Nav, ListProcess],
  templateUrl: './tracking-layout.html',
  styleUrl: './tracking-layout.scss'
})
export class TrackingLayout {

  columns: { id: number, name: TaskStatus }[] = [
    { id: 1, name: 'pending' },
    { id: 2, name: 'in_progress' },
    { id: 3, name: 'completed' },
    { id: 4, name: 'cancelled' },
  ];
}
