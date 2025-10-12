import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DefaultRequestMethod } from './shared/default.request';
import { HttpMethod } from './shared/http-method.enum';

@Injectable({
  providedIn: 'root'
})
export class UserRequest extends DefaultRequestMethod {

  protected override setService(): string {
    return 'user'
  }

  public register(data: { email: string, password: string }): Observable<void> {
    return this.generateRequest(HttpMethod.POST, 'register', data)
  }

}
