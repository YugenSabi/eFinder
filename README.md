# eFinder

- `backend` — NestJS API
- `docker` — Postgres, Kratos, MailHog

## Подготовка

```bash
cd backend
cp .env.example .env
cd ../docker
cp .env.example .env
```

## Запуск

```bash
cd docker
docker compose up -d
cd ../backend
npx prisma migrate dev
yarn install
yarn start:dev
```

## Сервисы

- Health: `http://localhost:4000/health`
- Swagger: `http://localhost:4000/docs`
- Kratos public: `http://localhost:4433`
- Kratos admin: `http://localhost:4434`
- MailHog: `http://localhost:8025`

## Проверка

1. Зарегистрируй пользователя в Kratos.
2. Открой письмо в MailHog.
3. Подтверди email.
4. Выполни логин.
5. Вызови `GET /auth/me` с Kratos cookie.
