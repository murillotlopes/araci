import { Component } from '@angular/core';

@Component({
  selector: 'app-skeleton-list',
  host: {
    'aria-busy': 'true',
    'aria-label': 'Carregando lista',
    role: 'status',
  },
  imports: [],
  templateUrl: './skeleton-list.html',
  styleUrl: './skeleton-list.scss',
})
export class SkeletonList {

}
