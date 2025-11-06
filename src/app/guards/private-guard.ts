import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MenuInterface } from '../interfaces/menu.interface';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class PrivateGuard implements CanActivate {
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    // TODO: além das regras abaixo, conferir se tem token e se ainda é valido.
    // * Do contrário, deslogar o usuário

    // 1 - Verificar se a rota está no menu
    // 2 - Verificar se a ação que realiza é permitida para ela
    // 3 - Caso ela tente entrar numa rota protegida
    // o sistema deverá desloga-la || ou melhor seria jogar para o dashboard?
    const url = state.url

    if (url === '/dashboard') return true

    // Recuperar o menu
    const menu = sessionStorage.getItem('@pin_menu')

    if (!menu) return this.logout()

    // Transformar em lista sem niveis
    const menuParse = JSON.parse(menu)

    if (!Array.isArray(menuParse)) return this.logout()

    const menuList = menuParse.flat(Infinity) as MenuInterface[]

    // Verificar se a rota acessada está presente na lista: continua ou derruba
    const menuFound = menuList.find(menu => menu.link?.includes(url))

    if (!menuFound || menuFound.permission === 0) return this.logout()

    // Verificar se existe ação sendo realizada Ex: /:id, /new
    const userAction = url.replace(menuFound.link as string, '')

    if (!userAction && menuFound.permission === 1) return true

    if (menuFound?.permission && menuFound?.permission > 1) return true

    // TODO: implementar esse final de controle no BaseForm e BaseList
    // Verificar se naquela rota o usuário pode realizar aquela ação
    // permission pode ser:
    // 0: sem acesso - derrubar
    // 1: visualizar apenas o que criou - user/
    // 2: cria, visualiza e edita apenas o que ele criou - /user, /user/new, user/:id
    // 3: cria e visualiza geral, mas edita apenas o que ele criou - /user, /user/new, user/:id
    // 4: cria, visualiza e edita geral - /user, /user/new, user/:id
    // 5: cria, visualiza e edita geral - /user, /user/new, user/:id - Coordenador
    // 6: cria, visualiza e edita geral - /user, /user/new, user/:id - Gerente
    // 7: cria, visualiza e edita geral - /user, /user/new, user/:id - Proprietário

    return this.logout()
  }

  private logout() {
    this.authService.logout()
    return false
  }

}
