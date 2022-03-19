const Discord = require("discord.js");


exports.run = (client, message, args) => {
  const kurallar = new Discord.MessageEmbed()
    .setDescription(`**SUNUCU KURALLARI**


- **Tehdit edici küfürler, argo, kötü söz, nefret söylemi içeren** sunucular başlatma, bu sunucuları destekleme veya koordine etme. Bir kişiye veya **topluluğa ırk, etnik köken, ulusal köken, cinsiyet, toplumsal cinsiyet, cinsel yönelim, din veya engel** gibi niteliklerinden ötürü saldırıda bulunmak yasaktır.
- Yöneticilerin, yetkililerin ve sunucu üyelerinin **onurunu kırmak, onu küçük düşürmek** gibi eylemler yasaktır.
- Mesaj yazarken **büyük harf** kullanmak **bağırmak** anlamına geleceği için kesinlikle büyük harf kullanarak yazı yazmayınız.
- Discord sohbet merkezi olduğu için gereksiz kişisel tartışmalara ve atışmalara girmek yasaktır.
- Başkasına ait kişisel bilgiler yayınlamak yasaktır.
- Yetkililer her yazılan mesajı gözden kaçırabilir, sizden ricamız lütfen böyle sorunları yetkilileri etiketleyerek bildiriniz.
- Çekiliş, kanal, yayıncı ve sunucu reklamı yapmak yasaktır sadece reklam kanalında kendi sunucunuzun reklamını yapabilirsiniz.
- Oyun hesabı, hediyelik eşya, oyun ekipmanı vb. şeylerin satışı/takası ve referans linkleri paylaşımı ve dilenmek yasaktır sadece satış  kanallarında yapılmaktadır.
- İllegal, yasa dışı sayılacak işler yasaktır.
- Uygunsuz kullanıcı adı ve profil fotoğrafı koymak yasaktır.
- Oyunlarda hile kullanarak sunucu üyelerini rahatsız etmek yasaktır.
- Sunucumuzdaki oyun odalarını kullanmayıp adam çekmeye çalışmak yasaktır.
- **Aşağılamak, küçük düşürmek, ifşalamak** yasaktır.
- Fotoğraf & video kanallarına **+18, pornografik** içerikler atmak yasaktır.
- **Spoiler** mesajı atmak ve spoiler vermek kesinlikle yasaktır. Sadece spoiler kanalına spoiler verilebilir.
- **Stain Sunucusuna Giren Herkesin Kuralları Okumuş ve Kabul Etmiş Sayılackatır.


- ** Discord Topluluk kurallarına uymadığınız sürece sunucumuzdan kalıcı olarak banlanacaksınız.**
• Discord Topluluk kuralları hakkında daha fazla bilgi almak istiyorsanız, https://discord.com/terms & https://discord.com/guidelines sitesini bir gözden geçirin.


• Klasik Discord sunucu kurallarına uymanız yeterli olacaktır.`)
    .setColor("RANDOM")
    .setFooter(`${message.guild.name}`)
  message.channel.send(kurallar);
};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
exports.help = {
  name:"rules"
}