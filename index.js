import express from 'express';//=============================Подключение express
import mongoose from 'mongoose';//===============================Подключение mongoose
import {registerValidation} from './validations/aith.js';//===============================Подключение валидации регистрации

import chechAuth from './utils/chechAuth.js'
import * as UserController from './controllers/UserController.js'

mongoose.connect('mongodb+srv://wessertv:1QAZ2wsx3EDC.@cluster0.jdmcm3o.mongodb.net/blog')//==================Подключение к базе данных
.then(() => console.log('DB ok'))//==============================================Если подключение к базе данных прошло успешно
.catch((err) => console.log('DB error', err));//==============================================Если подключение к базе данных не прошло

// ==========================================================================Создаем express приложение

const app = express();

app.use(express.json());//===============================================Подключение json

app.get('/', (req, res) => {   // ==============================Если на главную страницу идет запрос, то она выполняет следующее действие
    res.send('Hello Wolrd!');
});

// ===============================================================================Запрос на авторизацию

app.post('/auth/login', UserController.login, );

//===============================================================================Запрос на регистрацию
app.post('/auth/register', registerValidation, UserController.register, );

//==============================================================================Запрос на получение данных пользователя
app.get('/auth/me', chechAuth, UserController.getMe, );


app.listen(4444, (err) =>{
    if (err){
        return console.log(err);
    }

    console.log('Server OK');//===============================================================Если сервер запущен, то выводим сообщение
});