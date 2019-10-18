const TelegramBot = require('node-telegram-bot-api');
const express = require('express')
const compromise = require('compromise')
const expressApp = express()

const port = process.env.PORT || 3000
expressApp.get('/', (req, res) => {
  res.send('Hello World!')
})
expressApp.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
const request = require('request');

const PRESENT_INDEFINITE = 'PRESENT_INDEFINITE'
const PRESENT_CONTINUOUS = 'PRESENT_CONTINUOUS'
const PRESENT_PERFECT = 'PRESENT_PERFECT'
const RESENT_PERFECT_CONTINUOUS = 'RESENT_PERFECT_CONTINUOUS'

// replace the value below with the Telegram token you receive from @BotFather
const token = '959980695:AAEszMQzydo7l1CDaf40Sk7CgSetrSQa1nM';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, 'хуита');
});

// bot.onText(/\/test (.+)/, (msg, match) => {
//     const chatId = msg.chat.id;
//     const resp = 'Какую команду хотите выполнить?';
  
//     bot.sendMessage(chatId, resp, {
//         reply_markup: {
//             inline_keyboard: [[
//                 {
//                     text:'ᚠ погадать на мухоморах',
//                     callback_data: 'погадать на мухоморах',
//                 },
//                 {
//                     text:'ᚤ призвать к оружию!',
//                     callback_data: 'призвать к оружию',
//                 },
//                 {
//                     text:'ᚫ `дать Гоше подзатыльник',
//                     callback_data: 'дать Гоше подзатыльник',
//                 },
//             ]]
//         }
//     });
//   });


let notes = [];
// const chatId= msg.chat.id;
bot.onText(/\/repeat (.+)/, (msg, match) => {
    var userId = msg.from.id;
    var text = match[1];
    var timeAdded = 600;
    
    notes.push({ 'uid': userId, 'timeAdded': timeAdded, 'text': text });

    // bot.sendMessage(userId, `Great, ${msg.from.first_name}! What exactly do you want to repeat?`);
    bot.sendMessage(
        msg.chat.id, 
        `Great, ${msg.from.first_name}! What exactly do you want to repeat?`,
        {
        reply_markup: {
            // keyboard: [[
            inline_keyboard: [[
                {
                    text:'Pr. Indefinite',
                    callback_data: PRESENT_INDEFINITE,
                },
                {
                    text:'Pr. Continuous!',
                    callback_data: PRESENT_CONTINUOUS,
                },
                {
                    text:'Pr. Perfect',
                    callback_data: PRESENT_PERFECT,
                },
                {
                    text:'Pr. Perf. Cont.',
                    callback_data: RESENT_PERFECT_CONTINUOUS,
                },
            ]]
        }
        }
    );
});

const tensesToRepeat = {
        present: {
            indefinite: false,
            consituous: true,
            perfect: false,
            perfectContinuous: false,
        },
        past: {
            indefinite: true,
            consituous: false,
            perfect: false,
            perfectContinuous: false,
        },
        future: {
            indefinite: false,
            consituous: false,
            perfect: false,
            perfectContinuous: false,
        }
    }

    
    const inspect = obj => {
        const textArray = []
        for (const prop in obj) {
            for (const prop2 in obj[prop]) {
                if (obj[prop][prop2]) {
                    console.log(`${prop} ${prop2}`)
                    text.push(`${prop} ${prop2}`)
                }
            }
        }
        return textArray.join()
    }
    
    
    let messageSentId = null;


    const doc = nlp(`we don't need no education`).out('text')
    

bot.on('callback_query',  query=>{
    const {message: {chat, message_id, text}= {}} = query
    switch (query.data) {
        case PRESENT_INDEFINITE:
            bot.sendMessage(chat.id, doc)
            // .then((messageSent) => {
            //     messageSentId = messageSent.message_id
            //     bot.editMessageText(inspect(tensesToRepeat), {chat_id:chat.id, message_id:messageSentId})
            // })
            // if(tensesToRepeat.present.indefinite === false) {
            //     tensesToRepeat.present.indefinite = true;
            //     } else {
            //         tensesToRepeat.present.indefinite = false;
            //         // bot.editMessageText(inspect(tensesToRepeat), {chat_id:chat.id, message_id:messageSentId})
            //         // bot.deleteMessage(chat.id, messagesSentIds[0])
                    
            //     }
            break
        case PRESENT_CONTINUOUS:
            console.log('PRESENT_CONTINUOUS');
            bot.sendMessage(chat.id, 'выбрано время: Present Continuous');
            break
        case PRESENT_PERFECT:
            bot.sendMessage(chat.id, 'выбрано время: Present Perfect');
            break
        case RESENT_PERFECT_CONTINUOUS:
            bot.sendMessage(chat.id, 'выбрано время: Present Perfect Continuous');
            break
        default:
            break
    }
    bot.answerCallbackQuery({
        callback_query_id: query.id
    })
})


var robot = "I'm robot";
bot.on('message', (msg) => { 
    if (msg.text.indexOf(robot) === 0) {
        bot.sendMessage(msg.chat.id, "\n <i>italic</i> \n  Yes I'm <b>robot</b> <strong>robot</strong>  but not in that way!", {parse_mode : "HTML"});
    }

});


