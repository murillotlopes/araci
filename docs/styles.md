# Guia de estilos do Araci

O arquivo `src/styles.scss` é o ponto central para tokens de design, estilos-base, grade e
utilitários compartilhados. Os arquivos SCSS dos componentes devem conter somente estrutura ou
comportamento visual exclusivo daquele componente.

## Tokens

Os tokens são CSS custom properties e podem ser usados em qualquer componente:

```scss
.example {
  padding: var(--space-4);
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--border-radius);
  background-color: var(--surface-color);
  color: var(--text-color);
  box-shadow: var(--shadow-sm);
}
```

As categorias disponíveis são:

- Cores de marca e feedback: `--primary-color`, `--secondary-color`, `--accent-color`,
  `--tertiary-color`, `--secondary-dark-color`, `--success-color`, `--error-color`,
  `--alert-color` e `--info-color`.
- Superfícies e texto: `--background-color`, `--surface-color`, `--surface-subtle-color`,
  `--text-color`, `--text-muted` e `--border-color`.
- Tipografia: `--font-size-xs` até `--font-size-3xl` e os line-heights centralizados.
- Espaçamento: `--space-0`, `--space-1`, `--space-2`, `--space-3`, `--space-4`, `--space-5`,
  `--space-6`, `--space-8`, `--space-12`, `--space-16` e `--space-24`.
- Controles: altura, padding, bordas, raios, foco, sombras e transições.

As cores claras e escuras permanecem no mesmo arquivo. Para manter o dark suave, altere primeiro os
tokens semânticos de `[data-theme='dark']`, evitando preto puro em componentes isolados.

## Breakpoints mobile-first

| Nome | Largura mínima |
| --- | ---: |
| `sm` | 576px / 36rem |
| `md` | 768px / 48rem |
| `lg` | 992px / 62rem |
| `xl` | 1200px / 75rem |
| `xxl` | 1400px / 87.5rem |

O estilo sem media query sempre representa celulares. Um componente ganha espaço ou complexidade
progressivamente:

```scss
.example {
  display: grid;
  grid-template-columns: 1fr;
}

@media (min-width: 48rem) {
  .example {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
```

## Grade

Uma `row` possui 12 colunas. Para preservar a estratégia mobile-first, classes sem infixo ficam com
100% da largura no celular e assumem sua fração a partir de `md`:

```html
<div class="row">
  <div class="col-12 col-lg-8">Conteúdo principal</div>
  <aside class="col-12 col-lg-4">Complemento</aside>
</div>
```

Estão disponíveis `col-1` até `col-12` e as variantes `col-sm-*`, `col-md-*`, `col-lg-*`,
`col-xl-*` e `col-xxl-*`. Use `col` para dividir igualmente o espaço restante.

## Utilitários atuais

- Espaçamento: `m-*`, `mt-*`, `mb-*`, `ms-*`, `me-*`, `mx-*`, `p-*`, `pt-*`, `pb-*`, `px-*`
  e `gap-*`, na escala de `0` a `5` compatível com o uso atual do Bootstrap.
- Layout: `container`, `container-fluid`, `row`, colunas, `fixed-top`, `w-100` e `ms-auto`.
- Texto e aparência: `text-center`, `fw-bold`, `rounded`, `shadow`, `cursor-pointer`, `txt-*` e
  `bk-*`.
- Botões do projeto: `app-button` como base, combinada com `app-button--primary` ou
  `app-button--secondary` para a variante visual.
- Componentes mínimos compatíveis: `btn`, `btn-primary`, `btn-sm`, `navbar-*` e `collapse`.

Antes de criar uma nova medida ou cor dentro de um componente, verifique se ela representa uma nova
decisão global. Se representar, adicione um token. Se for apenas geometria exclusiva do componente,
mantenha-a no SCSS local.

## Critério para agentes de IA

Antes de criar ou editar a estilização de uma página ou componente, o agente deve:

1. Ler os tokens, utilitários, grade e primitivas existentes em `src/styles.scss`.
2. Pesquisar se o mesmo padrão já é usado por outro componente.
3. Reutilizar a solução global existente sempre que ela atender ao requisito.
4. Promover a estilização para `src/styles.scss` quando ela representar uma decisão compartilhada ou
   tiver consumidores atuais ou previsíveis.
5. Manter no SCSS local somente estrutura, geometria, estado, animação ou responsividade exclusiva do
   componente.

Não devem ser criadas microvariações de cores, espaçamentos, raios, sombras, controles ou breakpoints
apenas para aproximar visualmente um componente. Quando a escala compartilhada não atender a uma
necessidade real, ela deve ser estendida semanticamente e documentada aqui.

Todo componente novo deve ser comparado com telas e componentes adjacentes antes da entrega. A
paleta, o dark de contraste suave, a tipografia, os espaçamentos, as bordas, os estados interativos e
a progressão mobile-first precisam permanecer coerentes com o restante do Araci.
