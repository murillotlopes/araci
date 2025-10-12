import { HttpClient } from '@angular/common/http';
import { Directive } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { HttpMethod } from './http-method.enum';

@Directive()
export abstract class BaseRequest {

  private API_URL = environment.apiUrl
  private SERVICE!: string

  constructor(
    private http: HttpClient,
    private toastr: ToastrService
  ) {
    this.SERVICE = this.setService()
  }

  protected abstract setService(): string

  private getURLResource(): string {
    return `${this.API_URL}/${this.SERVICE}`
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

    return request.pipe(
      catchError(err => this.handleError(err))
    )

  }

  private handleError(error: any) {

    const statusCode = error?.error?.statusCode || error?.status
    const message = error?.error?.message || error?.message
    const details = error?.error?.details

    if (statusCode >= 500) this.toastr.error(message, this.getTitleError(statusCode))
    else this.toastr.warning(message, this.getTitleError(statusCode))

    console.error(error) // TODO: depois remover
    if (details) console.error(error)

    return throwError(() => error)
  }

  protected getTitleError(statusCode: number): string {

    if (statusCode >= 400 || statusCode < 500) {

      if (statusCode === 400) return 'Ops! Tem Algo Errado na Solicitação.'

      if (statusCode === 401) return 'Não Autorizado!'

      if (statusCode === 403) return 'Sem Permissão!'

      if (statusCode === 404) return 'Não Encontrado!'

      if (statusCode === 422) return 'Algo Errado ou Incompleto!'

      return 'Ops! Tem Algo Errado na Solicitação.'

    }

    if (statusCode >= 500) {

      if (statusCode === 503) return 'Falha em Um de Nossos Serviços!'

      if (statusCode === 500) return 'Falha Interna do Servidor!'

      return 'Falha Interna do Servidor!'

    }

    if (statusCode >= 200 || statusCode < 300) {

      if (statusCode === 200) return 'Deu certo!'

      if (statusCode === 201) return 'Criado!'

      if (statusCode === 202) return 'Recebido! Logo Iremos Processar.'

      if (statusCode === 204) return 'Deu certo!'

      return 'Deu certo!'

    }

    return 'Atenção!'

  }

}