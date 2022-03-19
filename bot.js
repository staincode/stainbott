// Ana Modüller
const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');

// Diğer Modüller
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
const express = require('express');
const db = require('quick.db')
const http = require('http');
const app = express();

// Util Dosya İsteği
require('./util/eventLoader')(client);

// Konsola Mesaj Gönderelim
const log = message => {
  console.log(`${message}`)
};

// Tools Kısmı Sürekli Dönmesin
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);


client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => { console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
 
});


////////////////////////// # KOMUTLAR BAŞLANGICI //////////////////////////




/////////// Hoşgeldin Sistemi////////////
client.on('guildMemberAdd', member => {
  if(member.bot) return;
  client.channels.cache.get('941864479682084907').send(`${member} sunucumuza hoş geldin!`);
});
///////////HOŞGELDİN SİSTEMİ SON //////////////



////////////////// SA AS SİSTEMİ/////////////////
client.on('message', async message => {
  if (message.content.toLowerCase() === "sa")
 { message.channel.send("⭐Aleyküm Selam StaiN Sunucumuza Hoş Geldin⚡")
   }     });
   
////////////////////// SA AS SİSTEMİ SON//////////////////


////////////////// GİRİŞ KISMI (LOGİN)/////////////////////
client.login(ayarlar.token);

client.on('ready', () => {
  console.log(`Bot ${client.user.username} Adıyla Giriş Yaptı`)
  })
///////////////////////////////////////////////////////////////

/////////////////// BAN SİSTEMİ ///////////////////////////////

/////////////////// CAPLOCK ENGEL SİSTEMİ /////////////////////
/// CodeMareFi
///

client.on("message", async msg => {
  if (msg.channel.type === "dm") return;
  if (msg.author.bot) return;
  if (msg.content.length > 1) {
    if (db.fetch(`capslock_${msg.guild.id}`)) {
      let caps = msg.content.toUpperCase();
      if (msg.content == caps) {
        if (!msg.member.permissions.has("ADMINISTRATOR")) {
          if (!msg.mentions.users.first()) {
            msg.delete();
            return msg.channel.send(`${msg.member}, Capslock Kapat Bro.`).then(nordx => nordx.delete({timeout: 5000}))
              
          }
        }
      }
    }
  }
});
///////////////////////////////////// CAPSLOCK ENGEL SİSTEMİ SON //////////////////

///////////////////////////////////// KÜFÜR ENGEL SİSTEMİ ////////////////////////
client.on('message', message => {
  if(!message.guild){return}
  
  // Datadaki "Küfür Engel" Kısmını Çağıralım
  let payidarküfürengel = db.fetch(`payidarküfürengel_${message.guild.id}`)

  // Komutlarımıza Geçelim, Eğer Küfür Engel Sistemi Aktif İse Küfür Yazan Kullanıcıya Uyarı Verelim
  if(payidarküfürengel === 'aktif'){
    // Küfür Ayarlamaları
    const payidariküfürliste = ['AMK','Amk','amk','Amına koyayım','AMINA KOYAYIM','amına koyayım','aq','sg','oç','Oç','Sg','Aq','Aw','Sikerim','sikerim','SİKERİM','Amına sokarım','AMINA SOKARIM','amına sokarım','götünü sikerim','Götünü Sikerim','GÖTÜNÜ SİKERİM','Götünü Sikerim,sik,ANANIN AMINA,Piç,İt,Kıllı,Salak,Mal,Enai,Aptal,oc,oç,s*krm,skrm']
    if(payidariküfürliste.some(payidar  => message.content.includes(payidar))){
      // Kullanıcının Mesajını Silelim
      message.delete();

      // Küfür eden terbiyesize uyarı mesajı atalım ve bu 5 saniye sonra chati kirletmemek açısından silinsin.
      const keslanterbiyesizherif = new Discord.MessageEmbed()
      .setDescription(`${message.author} - **Hey Dostum!. Lütfen Kelimelerine Dikkat Et. Rahatsız Olan İnsanlarda Var. Biraz Saygılı Ol**`) 
      .setColor('#36393F')
      message.channel.send(keslanterbiyesizherif).then(payidarsil => {
        payidarsil.delete({timeout: 5000})
      })
    }
  } else {
    return
  }
})
////////////////////// KÜFÜR ENGEL SİSTEMİ SON /////////////////////////

///////////////////// AFK SİSTEMİ //////////////////////////////////////
client.on("message" , message => {
  // Baş Tanımlar
  if(!message.guild) return;
  if(message.content.startsWith(ayarlar.prefix + 'afk')) return;

  // Let Tanımları & Data Veri Çekme İşlemleri
  let codemarefiafk = message.mentions.users.first()
  let codemarefikisi = db.fetch(`kisiid_${message.author.id}_${message.guild.id}`)
  let codemarefikisiisim = db.fetch(`kisiisim_${message.author.id}_${message.guild.id}`)

  // Eğer Afk Kişi Etiketlenirse Mesaj Atalım
  if(codemarefiafk){
    // Let Tanımları
    let cmfsebep = db.fetch(`cmfsebep_${codemarefiafk.id}_${message.guild.id}`)
    let codemarefikisi2 = db.fetch(`kisiid_${codemarefiafk.id}_${message.guild.id}`)

    if(message.content.includes(codemarefikisi2)){
      const cmfbilgiafk = new Discord.MessageEmbed()
      .setDescription(`${message.author} - Etiketlemiş Olduğun <@!${codemarefikisi2}> Kişisi Şuan **${cmfsebep}** Sebebiyle AFK`)
      .setColor("#36393F")
      .setFooter('Stain Gelişmekte Olan Bot !')
      message.channel.send(cmfbilgiafk)
    }
  }

  // Eğer Afk Kişi Mesaj Yazarsa Afk'lıktan Çıkaralım Ve Mesaj Atalım
  if(message.author.id === codemarefikisi){

    // Datadaki AFK Kullanıcı Verilerini Silelim
    db.delete(`cmfsebep_${message.author.id}_${message.guild.id}`)
    db.delete(`kisiid_${message.author.id}_${message.guild.id}`)
    db.delete(`kisiisim_${message.author.id}_${message.guild.id}`)

    // Afk'lıktan Çıktıktan Sonra İsmi Eski Haline Getirsin
    message.member.setNickname(codemarefikisiisim)

    // Bilgilendirme Mesajı Atalım
    const cmfbilgiafk = new Discord.MessageEmbed()
    .setAuthor(`Hoşgeldin ${message.author.username}`, message.author.avatarURL({dynamic: true, size: 2048}))
    .setDescription(`<@!${codemarefikisi}> Başarılı Bir Şekilde **AFK** Modundan Çıkış Yaptın.`)
    .setColor("#36393F")
    .setFooter('Stain Gelişmekte Olan Bot !')
    message.channel.send(cmfbilgiafk)
  }  
})
/////////////////////// AFK SİSTEMİ ////////////////////


////////////////////// Botu Sese Sokma /////////////////
client.on("ready", () => {
  client.channels.cache.get('952396060263854090').join();
});
///////////////////////// BOTU SESE SOKMA SON ///////////

//////////////////////// HOŞ GELDİN SİSTEMİ /////////////////
// Pâyidar Code - Pâyidar
client.on('guildMemberAdd', member => {
  if(member.bot) return;
  client.channels.cache.get('923353115653206068').send(`${member} ⭐Hey Sen Stain Üyesi Sunucumuza Hoş Geldin #kurallar Okumayı Unuttma Hadi Seslerde Takıl Şimdi.!`);
});
////////////////////////////////////// HOŞ GELDİN SİSTEMİ SON ///////////////////////////////

////////////////////////////////////////////// REKLAM KİCK SİSTEMİ //////////////////////////
client.on("message", async message => {
  let cdb = require("croxydb")
      let uyarisayisi = await cdb.fetch(`reklamuyari_${message.author.id}`);
      let reklamkick = await cdb.fetch(`reklamkick_${message.guild.id}`)
      let kullanici = message.member;
      if (reklamkick == 'kapali') return;
      if (reklamkick == 'acik') {
          const reklam = ["discord.app", "discord.gg", "invite", "discordapp", "discordgg", ".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", ".party", ".rf.gd", ".az",];
          if (reklam.some(word => message.content.toLowerCase().includes(word))) {
              if (!message.member.hasPermission("ADMINISTRATOR")) {
                  cdb.add(`reklamuyari_${message.author.id}`, 1) //uyarı puanı ekleme
                  if (uyarisayisi === null) {
                      let uyari = new Discord.MessageEmbed()
                          .setColor("RANDOM")
                          .setFooter('Reklam kick sistemi', client.user.avatarURL())
                          .setDescription(`<@${message.author.id}> reklam kick sistemine yakalandın! Reklam yapmaya devam edersen kickleniceksin (1/3)`)
                          .setTimestamp()
                      message.channel.send(uyari)               
  }
                  if (uyarisayisi === 1) {
                      let uyari = new Discord.MessageEmbed()
                          .setColor("RANDOM")
                          .setFooter('Reklam kick sistemi', client.user.avatarURL())
                          .setDescription(`<@${message.author.id}> reklam kick sistemine yakalandın! Reklam yapmaya devam edersen kickleniceksin (2/3)`)
                          .setTimestamp()
                      message.channel.send(uyari)
                  }
                  if (uyarisayisi === 2) {
                      await kullanici.kick({
                          reason: `Reklam kick sistemi`,
                      })
                      let uyari = new Discord.MessageEmbed()
                          .setColor("RANDOM")
                          .setFooter('Reklam kick sistemi', client.user.avatarURL())
                          .setDescription(`<@${message.author.id}> 3 adet reklam uyarısı aldığı için kicklendi. Bir kez daha yaparsa banlanacak`)
                          .setTimestamp()
                      message.channel.send(uyari)
                  }
                  if (uyarisayisi === 3) {
                      await kullanici.ban({
                          reason: `Reklam ban sistemi`,
                      })
                      cdb.delete(`reklamuyari_${message.author.id}`)
                      let uyari = new Discord.MessageEmbed()
                          .setColor("RANDOM")
                          .setFooter('Reklam kick sistemi', client.user.avatarURL())
                          .setDescription(`<@${message.author.id}> kick yedikten sonra tekrar devam ettiği için banlandı.`)
                          .setTimestamp()
                      message.channel.send(uyari)
                  }
  
                  message.delete();
  
              }
          }
      }
  });
  ///////////////////////////////////////////////// REKLAM KİCK SON ///////////////////////////////////////////////////////////////////////////////////////////////////////
 
  //////////////////////////////////////////////// OTO ROL SİSTEMİ /////////////////////////////////////////////////////////////////////////////////////
  client.on('guildMemberAdd', (member) => {
    let rol = db.fetch(`otorol_${member.guild.id}`)
    let kanal = db.fetch(`otokanal_${member.guild.id}`)
    if(!kanal) return
    if(!rol) return 
    let kanalbulundu = member.guild.channels.cache.get(kanal)
    let rolbulundu = member.guild.roles.cache.get(rol)
    if(!kanalbulundu) return console.log(`${member.guild.name} Sunucusunda kanalı bulamadım! `)
    if(!rolbulundu)return console.log(`${member.guild.name} Sunucusunda Rolü bulamadım! `)
    
    
    member.roles.add(rol)
    kanalbulundu.send(member.user.username + ' Hoşgeldin ``' + rolbulundu.name +  '`` Rolü Başarıyla verildi')// Yazıyı Kendinize göre ayarlayın
    })
    /////////////////////////////////////////////// OTO ROL SİSTEMİ //////////////////////////////////////////////////////////////////////////////////