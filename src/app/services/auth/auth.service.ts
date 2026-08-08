import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { throwError } from 'rxjs'
import { WebSessionService } from '../../core/auth/session/web-session.service'
import { AuthRequest } from '../../requests/auth/auth.request'
import { NavigationItem } from '../../shared/ui/navigation/navigation-item'
import { BaseService } from '../shared/base.service'

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {

  constructor(
    private authRequest: AuthRequest,
    private webSession: WebSessionService,
    router: Router,
    toastr: ToastrService
  ) {
    super(authRequest, router, toastr)
  }

  public login(data: { email: string, password: string }): void {
    this.authRequest.login(data).subscribe({

      next: (res => {
        const { accessToken, authType, expiresIn } = res

        this.webSession.save({ accessToken, expiresIn, authType })

        const menuNavigate: NavigationItem[] = [
          {
            name: 'Área do usuário',
            link: '/user',
            permission: -1,
            icon: 'fa-solid fa-user',
            menu: [
              {
                name: 'Meus dados',
                link: '/user/self',
                icon: 'fa-solid fa-user-secret'
              }
            ]
          },
          {
            name: 'Meus Negócios',
            link: '/my-business',
            permission: -1,
            icon: 'fa-solid fa-lightbulb',
            menu: [
              {
                name: 'Projetos',
                link: '/my-business/project',
                permission: -1,
                icon: 'fa-solid fa-person-chalkboard',
                menu: [
                  {
                    name: 'Modelo',
                    link: '/my-business/project/bmc',
                    permission: -1,
                    icon: 'fa-solid fa-mug-hot'
                  },
                  {
                    name: '5W2H',
                    link: '/my-business/project/5w2h',
                    permission: -1,
                    icon: 'fa-solid fa-fire',
                  },
                  {
                    name: 'SWOT',
                    link: '/my-business/project/swot',
                    permission: -1,
                    icon: 'fa-solid fa-bolt',
                  },
                  {
                    name: 'Plano de Negócio',
                    link: '/my-business/project/plan',
                    permission: -1,
                    icon: 'fa-solid fa-list'
                  },
                  {
                    name: 'Viabilidade',
                    link: '/my-business/project/feasibility',
                    permission: -1,
                    icon: 'fa-solid fa-list-check'
                  }
                ]
              }
            ]
          },
          {
            name: 'CRM',
            link: '/crm',
            menu: [
              {
                name: 'Caixa',
                link: '/crm/pos',
                menu: [
                  {
                    name: 'Abrir',
                    link: '/crm/pos/open'
                  },
                  {
                    name: 'Fechar',
                    link: '/crm/pos/close'
                  }
                ]
              },
              {
                name: 'Venda',
                link: '/crm/sale',
              },
              {
                name: 'Ordem de Serviço',
                link: '/crm/service-order'
              }
            ]
          }
        ]

        this.webSession.saveNavigation(menuNavigate)

        this.router.navigate(['dashboard'])
        this.toastr.success('Seja bem vindo!')
      }),
      error: (error => {
        return throwError(() => error)
      })

    })
  }

  public logout(): void {
    this.webSession.clear()
    this.router.navigate(['login'])
  }

}
