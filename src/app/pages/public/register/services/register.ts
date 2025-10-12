import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { UserRequest } from '../../../../requests/user.request';
import { BaseService } from '../../../shared/base.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService extends BaseService {

  constructor(
    private userRequest: UserRequest,
    router: Router,
    toastr: ToastrService
  ) {
    super(userRequest, router, toastr)
  }

  public register(data: { email: string, password: string }): void {
    this.userRequest.register(data).subscribe({

      next: (res => {
        this.router.navigate(['/login'])
        this.toastr.success('Cadastro realizado com sucesso.\nFaça login!')
      }),
      error: (error => {
        return throwError(() => error)
      })
    })
  }

}
