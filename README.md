# Лабораторная работа №1: Попадание точки в область

**Дисциплина:** Веб-программирование  
**Студент:** Кобленц Мария Алексеевна  
**Группа:** P3206  
**Вариант:** 501832

## Описание

Веб-приложение определяет попадание точки с координатами (X, Y) и радиусом R в заданную геометрическую область. Область отрисовывается через HTML5 Canvas, результаты сохраняются в LocalStorage с учетом часового пояса устройства.

## Структура проекта

```
.
├── index.html          # Разметка страницы
├── styles.css          # Стили
├──script.js            # Логика (валидация, canvas, localStorage)
├── Dockerfile          # Образ на базе nginx:alpine
├── docker-compose.yml  # Конфигурация запуска
└── README.md
```

## Запуск через Docker

**Требования:** установленный [Docker Desktop](https://www.docker.com/products/docker-desktop/).

### Сборка и запуск

```bash
docker compose up -d --build
```

Приложение доступно по адресу: **http://localhost:8080**

### Полезные команды

```bash
docker compose logs -f        # Логи контейнера в реальном времени
docker compose restart web    # Перезапуск без пересборки
docker compose down           # Остановка и удаление контейнера
docker compose ps             # Статус контейнеров
```


## Стек

HTML5 · CSS3 (Flexbox) · Vanilla JavaScript (ES6+) · Canvas API · LocalStorage · Docker + Nginx · ESLint