import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { throwError } from 'rxjs'
import { AuthRequest } from '../../requests/auth/auth.request'
import { BaseService } from '../shared/base.service'

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {

  constructor(
    private authRequest: AuthRequest,
    router: Router,
    toastr: ToastrService
  ) {
    super(authRequest, router, toastr)
  }

  public login(data: { email: string, password: string }): void {
    this.authRequest.login(data).subscribe({

      next: (res => {
        const { accessToken, authType, expiresIn } = res

        localStorage.setItem('@token', accessToken)
        this.router.navigate(['dashboard'])
        this.toastr.success('Seja bem vindo!')
      }),
      error: (error => {
        return throwError(() => error)
      })

    })
  }

  public logout(): void {
    sessionStorage.clear()
    this.router.navigate(['login'])
  }

}
