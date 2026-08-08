# Codex e Angular MCP no Araci

## O que foi configurado

O Codex possui um servidor MCP global chamado `angular-araci`. Ele executa o Angular CLI instalado
neste repositório, sem baixar outra versão:

```text
/home/murillo/Projetos/gitHub/projetos/pindorama/araci/node_modules/.bin/ng mcp --read-only
```

O modo `--read-only` permite que o MCP forneça contexto, documentação, exemplos e boas práticas sem
alterar o projeto diretamente. O Codex continua podendo editar arquivos quando você solicita; essas
edições usam o fluxo normal de revisão e validação do Codex, não o servidor MCP.

O arquivo `AGENTS.md` na raiz complementa o MCP com arquitetura, convenções e verificações próprias
do Araci. Ele deve permanecer versionado junto com o projeto.

## Ativação

Depois de adicionar ou alterar um servidor MCP, inicie uma nova sessão do Codex ou recarregue a
janela da extensão. Uma conversa que já estava aberta não recebe novas ferramentas retroativamente.

No terminal, confira o registro com:

```bash
codex mcp list
codex mcp get angular-araci
```

Na interface de terminal interativa do Codex, use:

```text
/mcp
```

O servidor `angular-araci` deve aparecer habilitado. Se o `node_modules` for removido, execute
`npm ci` antes de iniciar uma nova sessão para restaurar o Angular CLI usado pelo servidor.

## Como pedir trabalho ao Codex

Você não precisa chamar cada ferramenta MCP manualmente. Descreva o resultado desejado e peça que o
Codex consulte o Angular MCP quando isso for importante. Exemplos:

```text
Analise este formulário com as boas práticas da versão Angular instalada e proponha a menor
refatoração possível. Consulte o Angular MCP antes de editar e execute o build ao final.
```

```text
Implemente uma página privada para editar o perfil, seguindo a estrutura existente em pages,
services, requests e ui. Use o Angular MCP para confirmar as APIs recomendadas.
```

```text
Revise as rotas e guards sem alterar o comportamento. Liste problemas encontrados, distinguindo
erros de sugestões opcionais, e cite as boas práticas retornadas pelo Angular MCP.
```

```text
Investigue este erro de template. Consulte a documentação Angular pelo MCP, explique a causa,
corrija e rode npm run build.
```

## Operação e manutenção

Para desabilitar temporariamente sem apagar a configuração, edite `~/.codex/config.toml` e defina
`enabled = false` na seção `mcp_servers.angular-araci`. Para removê-lo:

```bash
codex mcp remove angular-araci
```

Para recriar o registro depois de mover este repositório, remova-o e execute, usando o novo caminho:

```bash
codex mcp add angular-araci -- /caminho/para/araci/node_modules/.bin/ng mcp --read-only
```

Referências: [Angular MCP](https://angular.dev/ai/mcp),
[desenvolvimento Angular com IA](https://angular.dev/ai/develop-with-ai) e
[MCP no Codex](https://developers.openai.com/codex/mcp/).
