const { MessageEmbed } = require("discord.js");
module.exports.run = (client, message, args) => {
  
  if(!['825765467859714108'].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new MessageEmbed().setColor('RED').setAuthor(`Başarısız !`).setDescription(`Bu Komutu Kullanmak İçin Yetkiniz Bulunmamakta  `))


  let tag = "⩔";
  const online = message.guild.members.cache.filter(u => u.presence.status != "offline").size
  const ttag = message.guild.members.cache.filter(m => m.user.username.includes(tag)).size
  const toplam = message.guild.memberCount
  const ses = message.guild.channels.cache.filter(channel => channel.type == "voice").map(channel => channel.members.size).reduce((a, b) => a + b) 

  const embed = new MessageEmbed()
  .setTimestamp()
  .setColor('BLACK')
  .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
  message.channel.send(embed.setDescription(`
  Sunucumuzda **Toplam** \`${toplam}\` Üye Bulunmaktadır.
  Anlık Olarak **Aktif** \`${online}\` Kullanıcı Bulunmaktadır.
  **Tagımızda** \`${ttag}\` Kullanıcı Bulunmaktadır.
  **Ses kanallarında** \`${ses}\` Kişi Bulunmaktadır.`));
};

  exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["say"],
  permLvl: 0,
}

  exports.help = {
  name: 'say'
}