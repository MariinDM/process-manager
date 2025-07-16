import { Component } from '@angular/core';
import { Nav } from '../../../../shared/components/nav/nav';
import { ListProcess } from '../../pages/list-process/list-process';

@Component({
  selector: 'app-tracking-layout',
  imports: [Nav, ListProcess],
  templateUrl: './tracking-layout.html',
  styleUrl: './tracking-layout.scss'
})
export class TrackingLayout {

}
