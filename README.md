# eFinder

В репозитории:
- `frontend` — Next.js frontend
- `backend` — NestJS API
- `docker` — Postgres, Ory Kratos, MailHog

## Что нужно заранее

- `Node.js` 20+
- `Yarn`
- `Docker Desktop`
- `PostgreSQL client` не обязателен, но полезен для ручной проверки

Рекомендация по браузеру:
- запускать проект лучше в `Google Chrome`
- использовать обычное окно браузера, не инкогнито
- если раньше уже были старые cookie от `localhost:3000` или `localhost:4433`, перед первым чистым запуском лучше очистить данные сайта

## Порты проекта

- frontend: `http://localhost:3000`
- backend: `http://localhost:4000`
- swagger: `http://localhost:4000/docs`
- backend health: `http://localhost:4000/health`
- kratos public: `http://localhost:4433`
- kratos admin: `http://localhost:4434`
- mailhog ui: `http://localhost:8025`
- postgres: `localhost:5432`

## 1. Настройка env

Скопируй примеры env-файлов:

```bash
cd /Users/k1d_sadness/eFinder/backend
cp .env.example .env

cd /Users/k1d_sadness/eFinder/docker
cp .env.example .env

cd /Users/k1d_sadness/eFinder/frontend/dashboard
cp .env.example .env
```

Базовые значения уже подготовлены в примерах и обычно их достаточно.

### `backend/.env`

```env
PORT=4000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/efinder?schema=app
KRATOS_PUBLIC_URL=http://localhost:4433
KRATOS_ADMIN_URL=http://localhost:4434
```

### `docker/.env`

```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=efinder
POSTGRES_PORT=5432

KRATOS_DSN=postgres://postgres:postgres@postgres:5432/efinder?sslmode=disable
KRATOS_PUBLIC_PORT=4433
KRATOS_ADMIN_PORT=4434

MAILHOG_SMTP_PORT=1025
MAILHOG_UI_PORT=8025
```

### `frontend/dashboard/.env`

```env
NEXT_PUBLIC_APP_NAME=frontend
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_KRATOS_PUBLIC_URL=http://localhost:4433
NEXT_PUBLIC_LOCALE=ru
```

## 2. Установка зависимостей

Устанавливать нужно отдельно для frontend и backend.

### Backend

```bash
cd /Users/k1d_sadness/eFinder/backend
yarn install
```

### Frontend

```bash
cd /Users/k1d_sadness/eFinder/frontend
yarn install
```

## 3. Запуск Docker-сервисов

Поднятие сервисов Postgres, Kratos и MailHog:

```bash
cd /Users/k1d_sadness/eFinder/docker
docker compose up -d
```

Проверить, что контейнеры живы:

```bash
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
```

Ожидаемые контейнеры:
- `efinder_postgres`
- `efinder_kratos`
- `efinder_mailhog`

Проверка готовности Kratos:

```bash
curl -s http://localhost:4433/health/ready
```

Ожидаемый ответ:

```json
{"status":"ok"}
```

## 4. Миграции и Prisma

После запуска Docker нужно применить backend-миграции и сгенерировать Prisma client.

```bash
cd /Users/k1d_sadness/eFinder/backend
npx prisma generate
npx prisma migrate dev
```

Если база локальная и чистая, этого достаточно.

Проверить состояние миграций:

```bash
npx prisma migrate status
```

## 5. Запуск backend

Запускать в отдельном терминале:

```bash
cd /Users/k1d_sadness/eFinder/backend
yarn start:dev
```

После старта проверь:

```bash
curl -s http://localhost:4000/health
```

Swagger:

```text
http://localhost:4000/docs
```

## 6. Запуск frontend

Запускать в отдельном терминале:

```bash
cd /Users/k1d_sadness/eFinder/frontend
yarn dev
```

После старта открой:

```text
http://localhost:3000
```

## 7. Рекомендуемый порядок запуска

Порядок запуска:

1. Поднять Docker
2. Применить Prisma миграции
3. Запустить backend
4. Запустить frontend
5. Открыть проект в Chrome

## 8. Первый рабочий сценарий

1. Открой `http://localhost:3000`
2. Перейди на регистрацию
3. Зарегистрируй аккаунт
4. При локальной разработке письма не отправляются на реальную почту, они приходят в `MailHog`
5. Открой письмо в `http://localhost:8025`
6. Возьми код подтверждения
7. Подтверди аккаунт
8. Войди в систему
9. Проверь профиль

## 9. Проверка основных сервисов

### Backend

- `GET http://localhost:4000/health`
- `GET http://localhost:4000/docs`

### Kratos

- `GET http://localhost:4433/health/ready`

### MailHog

- `http://localhost:8025`
- письма регистрации, подтверждения и recovery при локальном запуске приходят именно сюда
- на реальный email при локальной разработке письма не отправляются

### Frontend

- `http://localhost:3000`

## 10. Готовые тестовые аккаунты

Для проверки проекта можно использовать уже подготовленные аккаунты.

Если нужно восстановить локальные тестовые аккаунты из SQL-дампа, используй команду:

```bash
docker exec -i efinder_postgres psql -U postgres -d efinder < backend/prisma/local-db-dump.sql
```


Общий пароль для всех аккаунтов:

```text
Olympians123?
```

### Участники

- `user1@gmail.com`
- `user2@gmail.com`
- `user3@gmail.com`

### Администратор

- `admin@gmail.com`

### Организаторы

- `organizator@gmail.com`
- `organizator2@gmail.com`

### Наблюдатель

- `observer@gmail.com`

![Тестовые аккаунты](docs/assets/test-accounts.jpg)

- Честно я надеюсь с дампом получится поднять их , но если что сами создайте аккаунты , админку через бд можно будет выдать просто , чтобы подтвердить статус для организации и тд 

## 11. Рекомендации по Chrome

Чтобы auth-flow через Kratos работал стабильно:

- используй `Google Chrome`
- открывай frontend через `http://localhost:3000`
- не меняй вручную домен или порт
- не держи много старых вкладок с предыдущими локальными версиями проекта
- если логин/регистрация ведут себя странно, очисти cookie для:
  - `localhost:3000`
  - `localhost:4433`

Если есть расширения, которые вмешиваются в cookie, запросы или редиректы, лучше временно их отключить.

p.s например с fire fox у нас ошибки были с кратосом

## 12. Статус проекта

На текущем этапе основные функции проекта работают корректно:

- регистрация и вход
- подтверждение аккаунта через MailHog
- роли пользователей
- профиль участника
- профиль организации
- админские и observer-сценарии
- создание и управление мероприятиями
- рейтинги, поиск и PDF-отчеты
( вообщем прям все что в задании было )

## 13. Дополнительные артефакты

- Сделали даже дизайник в Figma: `https://www.figma.com/design/TjMDoTretQg1YpUY4LMUOR/Untitled?node-id=0-1&t=OjNVPHVg6cPBXKku-1`

## 14. Быстрый чек-лист перед работой

- Docker запущен
- `postgres`, `kratos`, `mailhog` подняты
- backend запущен на `:4000`
- frontend запущен на `:3000`
- миграции Prisma применены
- открываешь проект в Chrome
