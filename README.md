Инструкция по локальному запуску проекта:

1. Установить зависимости из package.json, запустив команду 'npm install' в корне проекта
2. Добавить в корень проекта файл .env с переменными окружения:
   REACT_APP_API_BASE_URL=API бэкенда("http://localhost:8080")
   REACT_APP_OAUTH2_REDIRECT_URI=URL фронтенда для редиректа при авторизации через OAUTH2("http://localhost:3000/registration/oauth2/redirect"),
   REACT_APP_MERCH_SELLER_EMAIL=email владельца продавца мерча группы("email@gmail.com")
   REACT_APP_STRIPE_KEY=клиентский ключ оплаты STRIPE("pk_test_key")
   REACT_APP_STRIPE_NAME=логин  клиента STRIPE("stripe-name")
   REACT_APP_STRIPE_CURRENCY=Валюта в которой производится оплата за товары из магазина группы("CURRENCY")
3. Запустить проект , запустив команду 'npm run start' в корне проекта
4. Для проверки платежей используйте в магазине группы:
   НОМЕР КАРТЫ ОПЛАТЫ: 4242 4242 4242 4242,
   БРЕНД: Visa,
   CVC: Любые 3 цифры,
   ДАТУ: Любую будущую дату.
