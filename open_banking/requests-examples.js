// --------Получение ACCESS и REFRESH токенов ---------- //


const axios = require('axios');
let data = JSON.stringify({
  "username": "admin",
  "password": "123"
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'http://193.104.57.55:8000/api/v1/token/',
  headers: {
    'Content-Type': 'application/json'
  },
  data : data
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});


// -----------Обновить ACCESS токен--------------- //


let data = JSON.stringify({
  "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwMTAwNjg5MCwiaWF0IjoxNjkzMjMwODkwLCJqdGkiOiJlYmFmOTkyYTY3ZDQ0NzQwOTYwNDIzYzQxZjYyOWNmNiIsInVzZXJfaWQiOjF9.Xtpe9QcGw3gKg7w_HWCz7bBARsZzQmb-ONfPRWKm3B8"
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'http://193.104.57.55:8000/api/v1/token/refresh/',
  headers: {
    'Content-Type': 'application/json'
  },
  data : data
};


// --------Создание ресурса согласия на доступ к счету--------- //


let data = JSON.stringify({
  "Data": {
    "permissions": [
      "ReadAccountsBasic",
      "ReadAccountsDetail",
      "ReadBalances",
      "ReadTransactionsCredits",
      "ReadTransactionsDebits",
      "ReadTransactionsDetail"
    ],
    "expirationDateTime": "2020-03-15T00:00:00+00:00",
    "transactionFromDateTime": "2019-09-15T00:00:00+00:00",
    "transactionToDateTime": "2019-12-15T00:00:00+00:00"
  }
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'http://127.0.0.1:8000/open-banking/v1.3/aisp/account-consents/',
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkzMjMyNzMzLCJpYXQiOjE2OTMyMTI0NTYsImp0aSI6IjQ5NzdhZjliZmZmMjQ1NTdhYTYyZDBmNzYzZTU1ZDI0IiwidXNlcl9pZCI6MX0.cBe8VyWxzRflRcVWtGNTpG9W4Laag37TPsmhYtAU4LQ',
    'Content-Type': 'application/json'
  },
  data : data
};


// --------Получение ресурса согласия(Удаление также, но метод - DELETE)------ //

let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'http://127.0.0.1:8000/open-banking/v1.3/aisp/account-consents/1/',
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkzMjMyNzMzLCJpYXQiOjE2OTMyMTI0NTYsImp0aSI6IjQ5NzdhZjliZmZmMjQ1NTdhYTYyZDBmNzYzZTU1ZDI0IiwidXNlcl9pZCI6MX0.cBe8VyWxzRflRcVWtGNTpG9W4Laag37TPsmhYtAU4LQ',
    'Content-Type': 'application/json'
  },
};


// -----Получение поручения на извлечение--------------- //


let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'http://127.0.0.1:8000/open-banking/v1.3/aisp/account-consents/8/retrieval-grant/',
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkzMjM1NzY1LCJpYXQiOjE2OTMyMzA4OTAsImp0aSI6IjZhM2JhMDYxYzZjNzQxODhhMTYyM2NmMjA5ZDQ2MjkwIiwidXNlcl9pZCI6MX0.w3TecWa-tl1m06bIJz5oHAjWgY1HuiK4bPyaXKblKrw'
  }
};


// ---------Получение списка счетов----------------------- //

let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'http://127.0.0.1:8000/open-banking/v1.3/aisp/accounts/',
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkzMjM1NzY1LCJpYXQiOjE2OTMyMzA4OTAsImp0aSI6IjZhM2JhMDYxYzZjNzQxODhhMTYyM2NmMjA5ZDQ2MjkwIiwidXNlcl9pZCI6MX0.w3TecWa-tl1m06bIJz5oHAjWgY1HuiK4bPyaXKblKrw'
  }
};


// ------Получение детальной информации о счете --------------- //


let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'http://127.0.0.1:8000/open-banking/v1.3/aisp/accounts/1/',
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkzMjM1NzY1LCJpYXQiOjE2OTMyMzA4OTAsImp0aSI6IjZhM2JhMDYxYzZjNzQxODhhMTYyM2NmMjA5ZDQ2MjkwIiwidXNlcl9pZCI6MX0.w3TecWa-tl1m06bIJz5oHAjWgY1HuiK4bPyaXKblKrw'
  }
};


// ------------Баланс банковского счета-------------------- //


let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'http://127.0.0.1:8000/open-banking/v1.3/aisp/accounts/1/balances/',
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkzMjM1NzY1LCJpYXQiOjE2OTMyMzA4OTAsImp0aSI6IjZhM2JhMDYxYzZjNzQxODhhMTYyM2NmMjA5ZDQ2MjkwIiwidXNlcl9pZCI6MX0.w3TecWa-tl1m06bIJz5oHAjWgY1HuiK4bPyaXKblKrw'
  }
};



// ------------Балансы всех счетов---------------------- //



let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'http://127.0.0.1:8000/open-banking/v1.3/aisp/accounts/balances/',
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkzMjM1NzY1LCJpYXQiOjE2OTMyMzA4OTAsImp0aSI6IjZhM2JhMDYxYzZjNzQxODhhMTYyM2NmMjA5ZDQ2MjkwIiwidXNlcl9pZCI6MX0.w3TecWa-tl1m06bIJz5oHAjWgY1HuiK4bPyaXKblKrw'
  }
};

