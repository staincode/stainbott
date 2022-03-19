const Discord = require('discord.js')

    exports.run = (client, message, args) => {
        // Yetkin Yok Kodu
        if(!message.member.roles.cache.has("923353115036643387")){
            const CodeMareFi = new Discord.MessageEmbed()
            .setDescription(`Bu komudu kullanmak için gerekli yetkilere sahip değilsin.`)
            .setColor('BLACK')
            .setFooter('❤️ StaiN❤️ RAT')
            return message.channel.send(CodeMareFi)
        }

        // Let Tanımları
        let miktar = args[0]
        
        // Hata Mesajları
        if(miktar > 100){
            const CodeMareFi = new Discord.MessageEmbed()
            .setDescription(`${message.author} - **En Fazla \`100\` Mesaj Silebilirim**`)
            .setColor('BLACK')
            .setFooter('❤️ StaiN❤️ RAT')
            return message.channel.send(CodeMareFi)
        }
        if(!miktar){
            const CodeMareFi = new Discord.MessageEmbed()
            .setDescription(`${message.author} - **Lütfen Silinecek Mesaj Sayısını Gir.**`)
            .setColor('BLACK')
            .setFooter('❤️ StaiN❤️ RAT')
            return message.channel.send(CodeMareFi)
        }
        if(isNaN(miktar)){
            const CodeMareFi = new Discord.MessageEmbed()
            .setDescription(`${message.author} - **Harf Değil, Rakam Giriceksin.**`)
            .setColor('BLACK')
            .setFooter('❤️ StaiN❤️ RAT')
            return message.channel.send(CodeMareFi)
        }

        // Sil
        if(miktar){
            message.channel.bulkDelete(miktar)
            
            const CodeMareFi = new Discord.MessageEmbed()
            .setDescription(`${message.author} - **Başarıyla ${miktar} Adet Mesaj Sildim**`)
            .setColor('BLACK')
            .setFooter('❤️ StaiN❤️ RAT')
            return message.channel.send(CodeMareFi).then(cmf => {
                cmf .delete({timeout: 5000})
            })
        }
    }

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['Temizle','Sil','SİL','sil','TEMİZLE']
}

exports.help = {
    name: 'temizle'
}