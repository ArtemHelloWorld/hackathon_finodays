# hackathon_finodays команда "Последний вагон"

## Приложение (./frontend)
Наше MVP - веб приложение на reactJS с использованием bootstrap

## Сервер (./open_banking)
Сервер написан на python и фреймворке Django REST. База данных - PostgreSQL. </br>
Документация по endpoint'ам тут - http://127.0.0.1:8000/docs </br>
Реализована регистрация пользователей по JWT токенам. </br>
И создан сервер-заглушка имитирующий работу сервера open-banking 

## Инструкция для развертывания

### open_banking

1. Переимновать .env-example в .env
2. Собрать образ и развернуть контейнер:

    ```sh
    $ docker-compose up -d --build
    ```

### frontend

1.  установка необходимых зависимостей
```sh
npm build
```
2. запуск локального ервера
```sh
npm start
```