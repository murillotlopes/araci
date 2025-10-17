import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { AuthRequest } from '../../../../requests/auth/auth.request';
import { BaseService } from '../../../shared/base.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends BaseService {

  constructor(
    private auttRequest: AuthRequest,
    router: Router,
    toastr: ToastrService
  ) {
    super(auttRequest, router, toastr)
  }

  public login(data: { email: string, password: string }): void {
    this.auttRequest.login(data).subscribe({

      next: (res => {
        const { accessToken, authType, expiresIn } = res

        localStorage.setItem('@token', accessToken)
        this.router.navigate(['/dashboard'])
        this.toastr.success('Seja bem vindo!')
      }),
      error: (error => {
        return throwError(() => error)
      })

    })
  }

}
