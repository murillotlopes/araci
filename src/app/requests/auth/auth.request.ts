import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DefaultRequestMethod } from '../shared/default.request';
import { HttpMethod } from '../shared/http-method.enum';
import { AuthLoginInput, AuthLoginOutput } from './auth.io';

@Injectable({
  providedIn: 'root'
})
export class AuthRequest extends DefaultRequestMethod {

  protected override setService(): string {
    return 'auth'
  }

  public login(data: AuthLoginInput): Observable<AuthLoginOutput> {
    return this.generateRequest(HttpMethod.POST, 'signin', data)
  }

}
