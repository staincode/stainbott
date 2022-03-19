const Discord = require('discord.js')

    exports.run = (client, message, args) => {
        var sözler = [
            "Söz 1",
            "Söz 2",
            "Söz 3",
            "Söz 4",
            "Söz 5",
            "Söz 6"
        ]
        
        let sözrandom = sözler[Math.floor(Math.random() * sözler.length)]

        const payidar = new Discord.MessageEmbed()
        .setDescription(`\`${sözrandom}\``)
        .setColor('BLACK')
        .setFooter('Havai Bot Code Hizmetleri')
        message.channel.send(payidar)
    }

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['Random-söz','RANDOM-SÖZ'],
    permLevel: 0
}

exports.help = {
    name: 'random-söz'
}