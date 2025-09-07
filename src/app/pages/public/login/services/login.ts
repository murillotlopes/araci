import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Auth } from '../../../../requests/auth';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(
    private authApi: Auth
  ) { }

  login(data: { email: string, password: string }): Observable<boolean> {
    return this.authApi.login(data).pipe(
      tap(res => {
        // Aqui coloca a lógica pra salvar o token no storage do navegador
      }),
      map(() => true)
    )
  }

}
