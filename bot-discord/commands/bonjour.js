const Discord = require('discord.js');

/**
 * @param {Discord.Client} client
 * @param {Discord.Message} message
 * @param {Array<String>} arguments
 */
module.exports.run = async(client, message, arguments) => {

    const embed = new Discord.MessageEmbed();
    embed.setTitle('Prénom : KyHuz').setDescription('Fonctionnalité : Bot').setColor('RED')
        .setImage('https://d38b044pevnwc9.cloudfront.net/cutout-nuxt/enhancer/2.jpg')
    await message.channel.send({
        embeds: [embed]
    });
};

module.exports.name = 'bonjour'