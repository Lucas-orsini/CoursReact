require('dotenv').config()
const Discord = require('discord.js')
const MysqlConnector = require('./src/MySqlConnector');
const TOKEN = 'OTkxNjA2NDg2Mjk4MDE3ODMy.G30Z5n.LAdHLvZyM5DZlJoVbYd_080ISneScBv2n1_zGo';
const commandLoader = require("./commandLoader")
MysqlConnector.connect();

const bot = new Discord.Client({
    intents:['GUILD_MESSAGES', 'GUILDS', 'GUILD_MEMBERS']
})

commandLoader.load(bot);
bot.on('messageCreate', async(message) => {

    let user = message.author;
    let userArray = await MysqlConnector.executeQuery("SELECT * FROM levelup WHERE user_id = " + user.id);

   
    if(userArray.length === 0){
        await MysqlConnector.executeQuery("INSERT INTO levelup(user_id, xp_count, xp_level) VALUES("+ user.id + ", 0, 0 )");
        userArray = await MysqlConnector.executeQuery("SELECT * FROM levelup WHERE user_id = " + user.id);

    }else{
       
        let userXpCount = userArray[0].xp_count;
        let userXpLevel = userArray[0].xp_level;

        await MysqlConnector.executeQuery("UPDATE levelup SET xp_count = "+ (userXpCount + 1) +" WHERE user_id = "+ userArray[0].user_id +"");

        if(userXpCount - 3 === userXpLevel){
            await MysqlConnector.executeQuery("UPDATE levelup SET xp_count = "+ 0 + ", xp_level = "+ (userXpLevel + 1) + " WHERE user_id = "+ userArray[0].user_id +"");
        }
    }

    if (message.content.startsWith("!")) {
        let words = message.content.split(' ');
        const commandName = words.shift().slice(1);
        const arguments = words;

        if (bot.commands.has(commandName)) {
        
            bot.commands.get(commandName).run(bot, message, arguments);
        } else {
           
            await message.delete();
            await message.channel.send(`The ${commandName} command does not exist.`);
        }

    }

    const censor = ['ntm','fdp','test'];
    const words = message.content.split(' ');
    let warning = userArray[0].warnings;
    console.log(userArray)
    words.forEach(word => {
        word = word.toLowerCase()
        if (censor.includes(word)) {
            if (warning < 2) {
                message.channel.send('On parle bien ici ' + message.author.toString() + ' : '+ (userArray[0].warnings + 1) + ' avertissement(s).');
                MysqlConnector.executeQuery("UPDATE levelup SET warnings = "+ (userArray[0].warnings + 1) +" WHERE user_id = "+ userArray[0].user_id +"");
            } else {
                message.author.send('Ban');
            }
            message.delete();
        }
    });

});
bot.on('guildMemberAdd', async member => {

    console.log('User: ' + member.user.username + ' has joined the server!');
    var role = await member.guild.roles.fetch("991619161144950874");
    member.roles.add(role);
})

bot.on('messageCreate', async(message) => {
    if (message.content.startsWith("!")){
        let words = message.content.split(' ');
        const commandName = words.shift().slice(1);
        const arguments = words;

        if (bot.commands.has(commandName)) {
            
            bot.commands.get(commandName).run(bot, message, arguments);
        } else {
     
            await message.delete();
            await message.channel.send(`The ${commandName} does not exist.`);
        }
       
        switch (commandName){
            case 'say':
                await message.channel.send(arguments.join(' '));
                break;

  
            case 'random':
                const firstNumber = arguments[0];
                const secondNumber = arguments[1];
                await message.reply(randomIntFromInterval(firstNumber, secondNumber).toString());
        }


    }
})
bot.login(TOKEN)

    .then(()=> {
        console.log("connexion reussie");
    }).catch(error=> {
        console.error(error);
    });


function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
    }