const TelegramApi = require('node-telegram-bot-api')

const token="7830303781:AAE-R_y4VlaKgGboz2Gj3WR18yQnA1sCE9k";

const bot = new TelegramApi(token,{polling: true})

const chats ={}

const gameOptions={
    reply_markup: JSON.stringify({
        inline_keyboard:[
            [{text:'1',callback_data:'1'},{text:'2',callback_data:'2'},{text:'3',callback_data:'3'}],
            [{text:'4',callback_data:'4'},{text:'5',callback_data:'5'},{text:'6',callback_data:'6'}],
            [{text:'7',callback_data:'7'},{text:'8',callback_data:'8'},{text:'9',callback_data:'9'}],
            [{text:'0',callback_data:'0'}],
        ]
    })
}
const againOptions={
    reply_markup: JSON.stringify({
        inline_keyboard:[
            [{text:'Сыграть ещё раз',callback_data:'/again'}]
        ]
    })
}

const startGame= async (chatId)=>{
    await bot.sendMessage(chatId,'Угадай число от 0 до 9')
    const randomNumber= Math.floor(Math.random()*10)
    chats[chatId]=randomNumber;
    await bot.sendMessage(chatId,'Загадал, время отгадывать',gameOptions)
}

const start=()=>{
    bot.setMyCommands([
        {command:'/start', description:'Приветствие'},
        {command:'/info',description:'Информация'},
        {command:'/game',description:'Игрушка'},
    ])
    
    bot.on('message', async msg=>{
        const text = msg.text;
        const chatId = msg.chat.id;

        console.log(msg);
    
        if(text === '/start'){
            await bot.sendSticker(chatId,'https://sl.combot.org/aipapai/webp/7xf09f9882.webp')
            return bot.sendMessage(chatId,'Привет друг');
        }
        if(text === '/info'){
            return bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name} ${msg.from.last_name}`);
        }
        if(text === '/game'){
           return startGame(chatId);
        }
        

    return bot.sendMessage(chatId,'Я тебя не понял, но записал твой высер на сервер🥰')
    
    })

    bot.on('callback_query', async msg=>{
        const data=msg.data;
        const chatId=msg.message.chat.id;

        if(data==='/again'){
            return startGame(chatId);
        }
        if(data==chats[chatId]){
            return await bot.sendMessage(chatId,`Ты угадал цифру ${chats[chatId]}`,againOptions )
        }
        else{
            return await bot.sendMessage(chatId,`Ты не угадал, бот загадал ${chats[chatId]}`,againOptions )
        }
        
    })
    
}

start()