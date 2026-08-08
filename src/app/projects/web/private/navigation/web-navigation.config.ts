import { NavigationItem } from '../../../../shared/ui/navigation/navigation-item';

export const WEB_NAVIGATION: NavigationItem[] = [
  {
    name: 'Área do usuário',
    link: '/user',
    permission: -1,
    icon: 'fa-solid fa-user',
    menu: [
      {
        name: 'Meus dados',
        link: '/user/self',
        icon: 'fa-solid fa-user-secret',
      },
    ],
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
            icon: 'fa-solid fa-mug-hot',
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
            icon: 'fa-solid fa-list',
          },
          {
            name: 'Viabilidade',
            link: '/my-business/project/feasibility',
            permission: -1,
            icon: 'fa-solid fa-list-check',
          },
        ],
      },
    ],
  },
  {
    name: 'CRM',
    link: '/crm',
    menu: [
      {
        name: 'Caixa',
        link: '/crm/pos',
        menu: [
          { name: 'Abrir', link: '/crm/pos/open' },
          { name: 'Fechar', link: '/crm/pos/close' },
        ],
      },
      { name: 'Venda', link: '/crm/sale' },
      { name: 'Ordem de Serviço', link: '/crm/service-order' },
    ],
  },
];
