import { Directive } from '@angular/core';
import { BaseRequest } from './base.request';
import { HttpMethod } from './http-method.enum';

@Directive()
export abstract class DefaultRequestMethod extends BaseRequest {

  public save(data: any) {
    return this.generateRequest(HttpMethod.POST, '', data)
  }

  public getByid(id: string) {
    return this.generateRequest(HttpMethod.GET, `${id}`)
  }

  public getList(params: any) {
    return this.generateRequest(HttpMethod.GET, ``, undefined, params)
  }

  public getOne(params: any) {
    return this.generateRequest(HttpMethod.GET, ``, undefined, params)
  }

  public update(id: any, data: any) {
    return this.generateRequest(HttpMethod.PATCH, `${id}`, data)
  }

  public delete(id: any) {
    return this.generateRequest(HttpMethod.DELETE, `${id}`)
  }

}