import { HttpClient } from '@angular/common/http';
import { Directive, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { WEB_API_URL } from '../../core/http/api-url.token';
import { HttpMethod } from './http-method.enum';

@Directive()
export abstract class BaseRequest {

  private readonly apiUrl = inject(WEB_API_URL)
  private SERVICE!: string

  constructor(
    private http: HttpClient
  ) {
    this.SERVICE = this.setService()
  }

  protected abstract setService(): string

  private getURLResource(): string {
    return `${this.apiUrl}/${this.SERVICE}`
  }

  protected generateRequest(method: HttpMethod, endPoint: string, data?: { [key: string]: any }, queryParams?: { [key: string]: any }): Observable<any> {
    let url = this.getURLResource()
    let request

    switch (method) {
      case HttpMethod.DELETE:
        request = this.http.delete(`${url}/${endPoint}`, queryParams)
        break
      case HttpMethod.GET:
        request = this.http.get(`${url}/${endPoint}`, queryParams)
        break
      case HttpMethod.PATCH:
        request = this.http.patch(`${url}/${endPoint}`, data, queryParams)
        break
      case HttpMethod.POST:
        request = this.http.post(`${url}/${endPoint}`, data, queryParams)
        break
    }

    return request
  }

}
