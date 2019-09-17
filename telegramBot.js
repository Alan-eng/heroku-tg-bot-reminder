const TelegramBot = require('node-telegram-bot-api');
const request = require('request');

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
bot.onText(/\/test (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const resp = 'Какую команду хотите выполнить?';
  
    bot.sendMessage(chatId, resp, {
        reply_markup: {
            inline_keyboard: [[
                {
                    text:'ᚠ погадать на мухоморах',
                    callback_data: 'погадать на мухоморах',
                },
                {
                    text:'ᚤ призвать к оружию!',
                    callback_data: 'призвать к оружию',
                },
                {
                    text:'ᚫ `дать Гоше подзатыльник',
                    callback_data: 'дать Гоше подзатыльник',
                },
            ]]
        }
    });
  });

bot.on('callback_query', query => {
    console.log(query)
})
// Listen for any kind of message. There are different kinds of
// messages.

let notes = [];
bot.onText(/напомни (.+)/, (msg, match) => {
    var userId = msg.from.id;
    var text = match[1];
    var time = 600;

    notes.push({ 'uid': userId, 'time': time, 'text': text });

    bot.sendMessage(userId, `Отлично, ${msg.from.first_name}! Я обязательно напомню!`);
});


