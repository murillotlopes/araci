import { Component } from '@angular/core';

@Component({
  selector: 'app-skeleton-form',
  host: {
    'aria-busy': 'true',
    'aria-label': 'Carregando formulário',
    role: 'status',
  },
  imports: [],
  templateUrl: './skeleton-form.html',
  styleUrl: './skeleton-form.scss',
})
export class SkeletonForm {

}
