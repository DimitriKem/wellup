[DEMO https://igor24.gitlab.io/wellup-timeline/](https://igor24.gitlab.io/wellup-timeline/)

# Веб-интерфейс wellup.me расписания

## Как собрать?
Для запуска сборки и локального сервера требуются Node.js, тестировалось на `Node.js 5`.

Для установки зависимостей:

`npm install`

### Для разработки
Запуск локального сервера webpack-dev-server в режиме "hot"

`npm start`

Приложение доступно на `8086` порту ([http://localhost:8086/](http://localhost:8086/))
Выбор порта в файле `webpack.config.dev.js`

### Для сборки рабочей версии
`npm run build`

Приложение собирается в папку `\build`
