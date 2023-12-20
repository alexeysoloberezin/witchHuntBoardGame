# Используйте официальный образ Node.js
FROM node:18

# Установите рабочую директорию в /usr/src/app
WORKDIR /usr/src/app

# Копируйте package.json и package-lock.json для установки зависимостей
COPY package*.json ./

# Установите зависимости
RUN npm install

# Копируйте исходный код приложения
COPY . .

# Укажите порт, который приложение будет слушать
EXPOSE 3000

# Команда для запуска приложения
CMD ["npm", "run", "start:prod"]
