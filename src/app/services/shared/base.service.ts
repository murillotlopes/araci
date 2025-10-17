import { Directive } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DefaultRequestMethod } from '../../requests/shared/default.request';

@Directive()
export abstract class BaseService {

  [key: string]: any;

  constructor(
    protected request: DefaultRequestMethod,
    protected router: Router,
    protected toastr: ToastrService
  ) { }

  public submitForm(data: any) {
    return this.request.save(data).subscribe({
      next: res => res,
      error: error => error
    })
  }

}