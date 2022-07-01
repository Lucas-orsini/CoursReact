const Discord = require('discord.js');
const mySqlConnector = require('../src/mySqlConnector');

/**
 * @param {Discord.Client} client
 * @param {Discord.Message} message
 * @param {Array<String>} arguments
 */
module.exports.run = async(client, message, arguments) => {

    mySqlConnector.connect();
    let user = message.author;

    let userArray = await mySqlConnector.executeQuery("SELECT * FROM levelup WHERE user_id = " + user.id);
    await message.channel.send(`Your level is ${userArray[0].xp_level} and you have ${userArray[0].xp_count} xp.`);
};

module.exports.name = 'xp'