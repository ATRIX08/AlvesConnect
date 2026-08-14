# Alves Connect Social Media

Portfólio em HTML, CSS e JavaScript puro, com backend Node.js para salvar os dados do admin.

## Como instalar

```bash
npm install
```

## Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto usando o `.env.example` como base:

```txt
PORT=3000
ADMIN_USERNAME=admin
ADMIN_PASSWORD=troque-essa-senha
SESSION_SECRET=troque-por-uma-frase-grande-e-aleatoria
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
```

Use uma senha real em `ADMIN_PASSWORD` e uma frase grande/aleatória em `SESSION_SECRET`.

O backend usa os dados nesta ordem:

```txt
1. Supabase, quando SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY existem
2. Arquivo local data/site-data.json
```

Projeto Supabase criado:

```txt
Nome: Alves Connect
Project ID: eeqwqufbavbdzldseeyt
Região: sa-east-1
```

Pegue as chaves em Supabase > Project Settings > API:

```txt
SUPABASE_URL = https://eeqwqufbavbdzldseeyt.supabase.co
SUPABASE_SERVICE_ROLE_KEY = service_role key
```

## Como rodar

```bash
npm start
```

Depois acesse:

```txt
http://localhost:3000
http://localhost:3000/admin.html
```

## Como adicionar vídeos

1. Abra `http://localhost:3000/admin.html`.
2. Entre com o usuário e senha definidos no `.env`.
3. Clique na aba `Vídeos`.
4. Preencha título, link e descrição.
5. Clique em `Salvar vídeo`.

Com Supabase configurado, o vídeo será salvo no banco. Sem Supabase, o projeto usa `data/site-data.json` como fallback local.

Na aba `Vídeos`, também é possível escolher um arquivo do computador ou celular. O admin pede uma URL assinada ao backend e envia o vídeo direto para o Supabase Storage. Use MP4, WEBM, OGG ou MOV com até 250MB.

## Como editar projetos, cases e contatos

Os projetos visuais do portfólio ficam em:

```txt
assets/js/site-config.js
```

Nesse arquivo você pode trocar título, categoria, descrição, thumbnail, vídeo e link externo. Pelo admin também é possível editar dados de case, como cliente, objetivo, serviço realizado, desafio, estratégia, execução e resultado.

Não cadastre resultados fictícios. O site está preparado para mostrar métricas reais apenas quando elas existirem.

No admin, a aba `Projetos` também permite escolher uma imagem do computador ou celular. A imagem é enviada direto para o Supabase Storage e o link da capa é preenchido automaticamente. Use imagens JPG, PNG, WEBP, GIF, HEIC ou HEIF com até 12MB.

Os links de Instagram, WhatsApp e e-mail também podem ser definidos no admin; se o Supabase estiver ativo, o admin passa a ser a fonte principal desses links.

## Como editar outras seções

No admin, a aba `Seções` permite editar:

```txt
Serviços
Logos de clientes
Depoimentos
Métricas/resultados
```

Nos serviços, é possível usar visual automático, imagem enviada pelo aparelho ou URL de vídeo. Em logos e depoimentos, o upload de imagem também preenche a URL automaticamente.

## Leads e orçamento

O formulário de contato salva as solicitações no backend em `/api/leads` e inclui:

```txt
Nome
Empresa
WhatsApp
Serviço
Investimento mensal planejado
Quando pretende começar
Mensagem
Status
Data
```

No Supabase, aplique `supabase/schema.sql` para criar/atualizar a tabela `leads`. Se a tabela ainda não existir, o backend mantém um fallback usando `site_content`, mas a tabela dedicada é o caminho recomendado.

Os leads aparecem na aba `Leads` do admin, onde é possível alterar o status entre `Novo`, `Em contato`, `Proposta enviada`, `Fechado` e `Perdido`.

## Arquivos principais

```txt
index.html
admin.html
server.js
.env.example
robots.txt
sitemap.xml
supabase/
  schema.sql
data/
  site-data.json
assets/
  css/
    styles.css
  js/
    site-config.js
    main.js
    admin.js
  img/
    logo-alves-connect-crop.png
```

## Segurança

O usuário, senha, `SESSION_SECRET` e `SUPABASE_SERVICE_ROLE_KEY` ficam somente no backend, via variáveis de ambiente. Não coloque `.env`, `.env.local` ou `.vercel` em repositório público.

O admin usa cookie `httpOnly`, sessão assinada, token CSRF nas ações que alteram dados e limite de tentativas no login. O formulário público também tem limite simples de envio por IP para reduzir spam.

O site envia headers de segurança como CSP, `Permissions-Policy`, `X-Frame-Options`, `X-Content-Type-Options`, HSTS e `Referrer-Policy`.

No Supabase, mantenha RLS ativo nas tabelas e use buckets com tipos MIME e tamanho máximo configurados. O bucket de imagens aceita JPG, PNG, WEBP, GIF, HEIC e HEIF até 12MB; o bucket de vídeos aceita MP4, WEBM, OGG e MOV até 250MB.
