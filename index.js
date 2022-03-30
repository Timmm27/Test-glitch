const Discord = require("discord.js");
const { Permissions } = require('discord.js');
const Client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_MEMBERS
    ]
});

Client.login(process.env.TOKEN);

var mutedroleid = '955904655605514280';
var prefix = "+";
const ms = require('ms');

Client.on("ready", () => {
    console.log("Le bot est connecté")
});

//statut personnalisé
Client.on("ready", () => {
    function randomStatut() {
        let statut = ["Dev by Mashira.#3188"]

        Client.user.setActivity(statut, {type: "LISTENING" });
    };
});




Client.on("messageCreate", message => {
    if (message.author.bot||message.channel.type === 'dm') return;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLowerCase();
    let args = messageArray.slice(1);

    var mutedrole = message.guild.roles.cache.get(mutedroleid);
    
    
    //commande help
    if (cmd === prefix + "help"){
        const embed_help = new Discord.MessageEmbed()
            .setColor("#FF0000")
            .setTitle("Liste des commandes")
            .setAuthor({name:message.author.username, iconURL:message.author.displayAvatarURL})
            .setDescription("**__Voici la liste de mes commandes :__**")
            .addField("```" + prefix + "help admin```","Affiche toutes les commandes réalisables par un admin !")
            .addField("```" + prefix + "help mod```","Affiche toutes les commandes réalisables par un modérateur !")
            .addField("```" + prefix + "help autre```", "Affiche toutes les commandes réalisables par un membre !")
            .addField("```" + prefix + "help set```", "Affiche toutes les commandes pour installer certaines choses !")
            .addField("Questions ?","Pour toutes questions sur une commande, veuillez contacter Mashira.#3188 !")
            .setTimestamp()
            .setFooter({text: "Dev by Mashira#3188", iconURL:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeohlMtrIdMrr9AKlJLfyhQsh7K1NHmeYpJQ&usqp=CAU"});
        
        const embed_help_autre = new Discord.MessageEmbed()
            .setColor("#FF0000")
            .setTitle("Liste des commandes")
            .setAuthor({name:message.author.username, iconURL:message.author.displayAvatarURL})
            .setDescription("**__Voici la liste de mes commandes :__**")
            .addField("```" + prefix + "infosbot```"," Affiche les informations du bot.")
            .addField("```" + prefix + "ping```", "Renvoie __pong__.")
            .addField("```" + prefix + "prefix```", "Renvoie le préfix actuel du bot.")
            .addField("```" + prefix + "latence```", "Renvoie la latence du bot et la tienne.")
            .addField("```" + prefix + "say```", "Renvoie ce que vous voulez que le bot dise.")
            .addField("```" + prefix + "8ball```", "Pose une question au bot, il te répondra...")
            .addField("```" + prefix + "membres```", "Renvoie le nombre de membres sur le serveur.")
        
        const embed_help_set = new Discord.MessageEmbed()
            .setColor("#FF0000")
            .setTitle("Liste des commandes")
            .setAuthor({name:message.author.username, iconURL:message.author.displayAvatarURL})
            .setDescription("**__Voici la liste de mes commandes :__**")
            .addField("```" + prefix + "setprefix```","Changer le préfix du bot.")
            .addField("```" + prefix + "set rules```","Mettre en place un système de règles.")
            .addField("```" + prefix + "set premium```"," Affiche l'embed du salon premium.")
            .addField("```" + prefix + "set infos```"," Affiche l'embed du salon informations.")
            .addField("```" + prefix + "set infos tools```"," Affiche l'embed du salon infos-tools.")
            .addField("```" + prefix + "set mutedrole```","Installez le role mute avec son ID.")


        const embed_help_mod = new Discord.MessageEmbed()
            .setColor("#FF0000")
            .setTitle("Liste des commandes")
            .setAuthor({name:message.author.username, iconURL:message.author.displayAvatarURL})
            .setDescription("**__Voici la liste de mes commandes :__**")
            .addField("```" + prefix + "lock```","Les membres ne peuvent plus parler sur le salon en question.")
            .addField("```" + prefix + "clear```","Supprime un nombre de message définit.")
            .addField("```" + prefix + "mute```","Réduire au silence un membre.")
            .addField("```" + prefix + "addrole```","Ajouter un rôle à un membre.")
            .addField("```" + prefix + "kick```","Expulser un membre.")
            .addField("```" + prefix + "ban```","Bannir un membre.")
            .addField("```" + prefix + "unmute```","Remettre le droit de parole à un membre mute.")
            .addField("```" + prefix + "unban```","Débannir un membre.")
        
        const embed_help_admin = new Discord.MessageEmbed()
            .setColor("#FF0000")
            .setTitle("Liste des commandes")
            .setAuthor({name:message.author.username, iconURL:message.author.displayAvatarURL})
            .setDescription("**__Voici la liste de mes commandes :__**")
            .addField("```" + prefix + "lock```","Les membres ne peuvent plus parler sur le salon en question.")
            .addField("```" + prefix + "unlock```","Les membres peuvent à nouveau parler sur ce salon.")
            .addField("```" + prefix + "addrole```","Ajouter un rôle à un membre.")
            .addField("```" + prefix + "delrole```","Retirer un rôle à un membre.")

        
        if (args[0] === undefined){
            message.channel.send({embeds :[embed_help]})
            console.log(`${cmd} utilisé par ${message.author.username}`)
        }
        
        if (args[0] === "autre") {
            message.channel.send({embeds :[embed_help_autre]})
            console.log(`${cmd} ${args[0]} utilisé par ${message.author.username}`)
        }

        if (args[0] === "set") {
            message.channel.send({embeds :[embed_help_set]})
            console.log(`${cmd} ${args[0]} utilisé par ${message.author.username}`)
        }

        if (args[0] === "admin") {
            message.channel.send({embeds :[embed_help_admin]})
            console.log(`${cmd} ${args[0]} utilisé par ${message.author.username}`)
        }

        if (args[0] === "mod") {
            message.channel.send({embeds :[embed_help_mod]})
            console.log(`${cmd} ${args[0]} utilisé par ${message.author.username}`)
        }
    }
    
    //commande set
    else if (cmd === prefix + "set" ){
        const embed_infobot = new Discord.MessageEmbed()
            .setColor("#FF0000")
            .setTitle("Info sur le Bot")
            .setAuthor({name:message.author.username, iconURL:message.author.displayAvatarURL})
            .setDescription("**__Voici les informations sur le bot La Grotte :__**")
            .addField("Destiné  à :","Ce bot est destiné au serveur 'La Grotte'. Il en est le bot pour la modération et plus encore.")
            .addField("+ d'infos","Pour plus d'informations, veuillez contacter le créateur de 'La Grotte' ou encore le développeur de ce bot Mashira.#3188.")
            .setTimestamp()
            .setFooter({text: "Dev by Mashira#3188", iconURL:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeohlMtrIdMrr9AKlJLfyhQsh7K1NHmeYpJQ&usqp=CAU"});
        

        const embed_rules = new Discord.MessageEmbed()
            .setColor("#FF0000")
            .setTitle("Réglement du serveur")
            .addField("**__Règle n°1 :__**","Le spam à l’écrit et en vocal (Soundboard, earrape/bass boosted) et le trolling est formellement interdit.")
            .addField("**__Règle n°2 :__**","Il est interdit de poster des liens ainsi que de faire de la publicité de tout réseau social (Youtube, Twitter, etc...) sous peine d'un bannissement définitif du serveur.")
            .addField("**__Règle n°3 :__**","Respectez-vous les uns et les autres pour une bonne convivialité.")
            .addField("**__Règle n°4 :__**","Nous ne réglons pas les affaires privées et les chamailleries. Pour une demande particulière, veuillez mp le créateur: LD#1598 ou alors l'administrateur : Mashira#0007.")
            .addField("**__Règle n°5 :__**","Il est interdit de s'approprier le travail d'autres créateurs, internes ou externes au serveur, sous risque de lourdes sanctions externes et internes au serveur.")
            .addField("**__Règle n°6 :__**","Il vous est bien entendu demandé de respecter les conditions d'utilisation de discord : **https://discordapp.com/terms https://discordapp.com/guidelines**")
            .setFooter({text: "Dev by Mashira#3188", iconURL:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeohlMtrIdMrr9AKlJLfyhQsh7K1NHmeYpJQ&usqp=CAU"})
    
        const row_rules = new Discord.MessageActionRow()
            .addComponents(new Discord.MessageButton()
                .setCustomId("bouton_rules")
                .setLabel("Accepter le règlement")
                .setStyle("SUCCESS")
                .setEmoji("✔")
            )

        
        const embed_premium = new Discord.MessageEmbed()
            .setColor("#FF0000")
            .setTitle("Informations sur la version Premium")
            .addField("**__Ce qu'il y a en plus ? :__**","\n **Beaucoup plus de : \n \n - Logiciels, Cracks & Jeux-Videos (forza5, gtaV, ect...) \n \n - De comptes offerts (netflix, dysney, ect...) \n \n - De methodes pour ce faire de l'argent (carding, , ...) \n \n - Une formation de hacking spécialisée (rat, dox, ...)**")
            .addField("**__Le prix ? :__**"," \n 15 euros seulement !! Vous pouvez largement rentabilisé avec toutes les techniques pour se faire de l'argent facilement. Veuillez mp LD#1598 pour passer commande !! ")
            .setFooter({text: "Dev by Mashira#3188", iconURL:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeohlMtrIdMrr9AKlJLfyhQsh7K1NHmeYpJQ&usqp=CAU"});
        
        
        const embed_infos = new Discord.MessageEmbed()
            .setColor("#FF0000")
            .setTitle("Informations sur le serveur.")
            .addField("**__Les demandes particulières :__**","Pour toutes demandes particulières, quelle qu'elle soit, ouvrez un ticket. Aucune réponse ne sera fournis si vous ne faite pas de ticket et est passible de sanctions.**")
            .addField("**__Payements :__**", "Les payements se font via PayPal. Nous verrons part la suite pour proposer d'autres systèmes de payements. C'est d'abord **VOUS** qui payer, et ensuite, un membre du staff pourra vous inviter sur le serveur premium.")
            .addField("**__Remboursement :__**","Nous ne remboursons pas !! A part pour certains problèmes qui peuvent arriver. Dans tous les cas, c'est à l'equipe du staff de juger si un remboursement peut être effectué. Merci de votre compréhension.")
            .setFooter({text: "Dev by Mashira#3188", iconURL:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeohlMtrIdMrr9AKlJLfyhQsh7K1NHmeYpJQ&usqp=CAU"});
        
        
        const embed_infos_tools = new Discord.MessageEmbed()
            .setColor("#FF0000")
            .setTitle("Informations sur la categorie tools.")
            .addField("**__Infos :__**","Les tools proposés gratuitement pour discord sont uniquement utilisable sur pc !!! \n \n Tous actes avec ces tools ne sont en aucun cas de la responsabilité du createur et du serveur ! Il est de la votre !!\n \n Ces tools ont été coder par des personnes externes au serveur, mais pour un quelconque problème, veuillez contacter Mashira.#3188 directement. \n \n Enfin, pour toutes questions, pingez Mashira.#3188, il vous repondra dès qu'il le pourra.")
            .setFooter({text: "Dev by Mashira#3188", iconURL:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeohlMtrIdMrr9AKlJLfyhQsh7K1NHmeYpJQ&usqp=CAU"});


        if (args[0] === "rules") { 
            message.channel.send({embeds: [embed_rules],components: [row_rules]});
            console.log(`${cmd} ${args[0]} utilisé par ${message.author.username}`)
        }
        else if (args[0] === "premium") { 
            message.channel.send({embeds: [embed_premium]})
            console.log(`${cmd} ${args[0]} utilisé par ${message.author.username}`)
        }
        else if (args[0] === "infos") { 
            if (args[1]=== undefined) {
                message.channel.send({embeds: [embed_infos]})
                console.log(`${cmd} ${args[0]} utilisé par ${message.author.username}`)
            }
            else if (args[1] === "tools") {
                message.channel.send({embeds: [embed_infos_tools]})
                console.log(`${cmd} ${args[0]} utilisé par ${message.author.username}`)
            }
        }
        else if (args[0] === "mutedrole") { 
            
            mutedroleid = args[1]
            message.channel.send(`L'id du rôle utilisé pour les commandes de mute est maintenant ${mutedroleid}`)
            console.log(`${cmd} ${args[0]} ${args[1]} utilisé par ${message.author.username}`)
        }
    }
    
    //commande infobot
    else if (cmd === prefix + "infobot"){
        const embed_infobot = new Discord.MessageEmbed()
            .setColor("#FF0000")
            .setTitle("Info sur le Bot")
            .setAuthor({name:message.author.username, iconURL:message.author.displayAvatarURL})
            .setDescription("**__Voici les informations sur le bot La Grotte :__**")
            .addField("Destiné  à :","Ce bot est destiné au serveur 'La Grotte'. Il en est le bot pour la modération et plus encore.")
            .addField("+ d'infos","Pour plus d'informations, veuillez contacter le créateur de 'La Grotte' ou encore le développeur de ce bot Mashira.#0007.")
            .setTimestamp()
            .setFooter({text: "Dev by Mashira#3188", iconURL:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeohlMtrIdMrr9AKlJLfyhQsh7K1NHmeYpJQ&usqp=CAU"});
        message.channel.send({embeds: [embed_infobot]})
        console.log(`${cmd} utilisé par ${message.author.username}`)
    }
    //commande ping
    else if(cmd === prefix + "ping"){
        message.channel.send ("pong !")
        console.log(`${cmd} utilisé par ${message.author.username}`)
    }
    
    //commande latence
    else if (cmd === prefix + "latence"){
        var yourping = new Date().getTime() - message.createdTimestamp
        var botping = Math.round(Client.ws.ping)
        
        message.channel.send(`Ton ping : ${yourping} \nCelui du Bot : ${botping}`)
        console.log(`${cmd} utilisé par ${message.author.username}`)
    }
    
    //commande prefix 
    else if (cmd === prefix + "prefix"){
        message.reply("Mon préfix est `" + prefix + "`. Pour le changer, tapez `+setprefix`. Utiliser la commande `+help` pour en savoir plus !")
        console.log(`${cmd} ${args[0]} utilisé par ${message.author.username}`)
    }
    
    
    //commande setprefix
    else if (cmd === prefix + "setprefix"){
        if (message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)){
            prefix = args[0]
            message.reply("Vous avez changer le préfix. Le nouveau est `" + prefix + "`")
            console.log(`${cmd} ${args[0]} utilisé par ${message.author.username}`)
        }
        else (message.reply("Vous n'avez pas les permissions requisent pour pouvoir effectuer cette commande."))
    }

    //commande clear 
    else if (cmd === prefix + "clear"){
        if(!message.member.permissions.has([Permissions.FLAGS.MANAGE_MESSAGES,Permissions.FLAGS.ADMINISTRATOR])) return message.reply("Vous n'avez pas les permissions requisent pour pouvoir effectuer cette commande.");
        if(!args[0]) return message.channel.send("Tu dois spécifier un nombre de messages à supprimer !");
        message.delete(1);
        amount = message.content.split(' ')[1];
        if (amount > 100 ) amount = 100
        message.channel.bulkDelete(amount, true).then(() => {
            message.channel.send(`J'ai supprimé ${amount} messages. `).then((message) => {
                setTimeout(() => {
                  message.delete();
                }, 2500);
              })
            console.log(`${cmd} ${args[0]} utilisé par ${message.author.username}`)
        })
    }


    //commande ban
    else if (cmd === prefix + "ban") {
        if(!message.member.permissions.has([Permissions.FLAGS.BAN_MEMBER,Permissions.FLAGS.ADMINISTRATOR] )) return message.reply("Vous n'avez pas les permissions requisent pour pouvoir effectuer cette commande.");
        const user = message.mentions.users.first();
        if (!user) return message.reply("Mentionne quelqu'un à ban. ``" + prefix + "ban <user> [raison]``");
        if(user.id === message.author.id) return message.reply("Tu ne peux pas te ban toi même.");
        const reason = args.slice(1).join(" ");
        
        message.guild.members.cache.get(user.id).ban({reason: reason});
        message.channel.send(`${user} a été banni. Raison: **${reason != "" ? reason : "Aucune raison spécifiée."}**`);
        console.log(`${cmd} ${user.id} ${reason} utilisé par ${message.author.username}`)
        
    }

    //commande unban
    else if (cmd === prefix + "unban") {
        if(!message.member.permissions.has([Permissions.FLAGS.BAN_MEMBER,Permissions.FLAGS.ADMINISTRATOR] )) return message.reply("Vous n'avez pas les permissions requisent pour pouvoir effectuer cette commande.");
        const userid = args[0];
        if (!userid) return message.reply("Met l'id de la personne à débannir. ``" + prefix + "unban <user_id> [raison]``");
        const reason = args.slice(1).join(" ");
        message.guild.members.unban(userid);
        message.channel.send(`${userid} a été débanni. Raison: **${reason != "" ? reason : "Aucune raison spécifiée."}**`);
        console.log(`${cmd} ${user.id} ${reason} utilisé par ${message.author.username}`)
        
    }

    //commande kick
    else if (cmd ===  prefix + "kick") {
        if(!message.member.permissions.has([Permissions.FLAGS.KICK_MEMBERS,Permissions.FLAGS.ADMINISTRATOR])) return message.reply("Vous n'avez pas les permissions requisent pour pouvoir effectuer cette commande.");
        const user = message.mentions.users.first();
        if (!user) return message.reply("Mentionne quelqu'un à expulser. ``" + prefix + "kick <user> [raison]``");
        if(user.id === message.author.id) return message.reply("Tu ne peux pas te ban toi même.");
        const reason = args.slice(1).join(" ");
        message.guild.members.cache.get(user.id).kick(reason);
        message.channel.send(`${user} a été kick. Raison: **${reason != "" ? reason : "Aucune raison spécifiée."}**`);
        console.log(`${cmd} ${user.id} ${reason} utilisé par ${message.author.username}`)
        
    }

    //commande mute
    else if (cmd === prefix + "mute") {
        if(!message.member.permissions.has([Permissions.FLAGS.MUTE_MEMBERS,Permissions.FLAGS.ADMINISTRATOR])) return message.reply("Vous n'avez pas les permissions requisent pour pouvoir effectuer cette commande.");
        const user = message.mentions.users.first();
        if (!user) return message.reply("Mentionne quelqu'un à mute. ``" + prefix + "mute <user> [raison]``");
        const target = message.guild.members.cache.get(user.id);
        if(user.id === message.author.id) return message.reply("Tu ne peux pas te mute toi même.");
        if(target.roles.cache.has(mutedroleid)) return message.reply("Cet utilisateur a déjà été mute.");
        if(!mutedrole) return message.reply("Je ne peux pas trouver le rôle 'mute'");

        const reason = args.slice(2).join(" ");
        let time = args[1];
        if (!time) time = "24h";

        target.roles.add(mutedrole.id);

        message.channel.send(`${user} a été mute par ${message.author} pour ${ms(ms(time))}.\nRaison: **${reason != "" ? reason : "Aucune raison spécifiée."}**`);
        
        console.log(`${cmd} ${user.id} ${reason} ${time} utilisé par ${message.author.username}`)

        setTimeout(() => {
            target.roles.remove(mutedrole.id);
        }, ms(time));

    }

    //commande unmute
    else if (cmd === prefix + "unmute") {
        if(!message.member.permissions.has([Permissions.FLAGS.MUTE_MEMBERS,Permissions.FLAGS.ADMINISTRATOR])) return message.reply("Vous n'avez pas les permissions requisent pour pouvoir effectuer cette commande.");
        const user = message.mentions.users.first();
        if (!user) return message.reply("Mentionne quelqu'un à unmute. ``" + prefix + "unmute <user> [raison]``");
        const target = message.guild.members.cache.get(user.id);
        if(!target.roles.cache.has(mutedroleid)) return message.reply("Cet utilisateur n'est pas mute.");
        if(user.id === message.author.id) return message.reply("Tu ne peux pas t'unmute toi même.");
        if(!mutedrole) return message.reply("Je n'ai pas pu trouver le rôle 'mute'.");

        const reason = args.slice(1).join(" ");
        target.roles.remove(mutedrole.id);
        
        message.channel.send(`${user} a été unmute par ${message.author}.\nRaison: **${reason != "" ? reason : "Aucune raison spécifiée"}**`);
        console.log(`${cmd} ${user.id} ${reason} utilisé par ${message.author.username}`)
    }

    //commande lock 
    else if (cmd === prefix + "lock") {
        if (message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)){
            message.channel.permissionOverwrites.edit("936704029948514444", {
                SEND_MESSAGES: false
            });    
            message.channel.send("Les membres ne peuvent plus parler sur ce salon.")
            console.log(`${cmd} ${message.channel.id} utilisé par ${message.author.username}`)
        } else message.reply(`Vous n'avez pas les permissions requisent pour pouvoir effectuer cette commande.`)
    }

    //commande unlock 
    else if (cmd === prefix + "unlock") {
        if (message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)){
            message.channel.permissionOverwrites.edit("936704029948514444", {
                SEND_MESSAGES: true
            });    
            message.channel.send("Les membres peuvent à nouveau parler sur ce salon.")
            console.log(`${cmd} ${message.channel.id} utilisé par ${message.author.username}`)
        } else message.reply(`Vous n'avez pas les permissions requisent pour pouvoir effectuer cette commande.`)
    }


    //commande addrole
    else if (cmd === prefix + "addrole") {
        if(!message.member.permissions.has([Permissions.FLAGS.MANAGE_MESSAGES,Permissions.FLAGS.ADMINISTRATOR])) return message.channel.send("Vous n'avez pas les permissions requisent pour pouvoir effectuer cette commande.")

        let rMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!rMember) return message.channel.send("Mentionner un membre pour lui ajouter un rôle.")
    
        let role = message.guild.roles.cache.find(r => r.name == args[1]) || message.guild.roles.cache.find(r => r.id == args[1]) || message.mentions.roles.first()
        if(!role) return message.channel.send(`Mentionner ou donner un rôle à ajouter à ${rMember}`) 

        if(rMember.roles.cache.has(role.id)) {
            return message.channel.send(`${rMember.displayName}, a déjà ce rôle !`)
        } else {
            rMember.roles.add(role.id).catch(e => console.log(e.message))
            message.channel.send(`${rMember.displayName} a été ajouté à **${role.name}**`)
            console.log(`${message} utilisé par ${message.author.username}`)
            Client.channels.cache.get('937039928460709908').send(`${message.member.username} à reçu le rôle ${role.name}.`)
        }
    }

    //commande delrole
    else if (cmd === prefix + "delrole") {
        if(!message.member.permissions.has([Permissions.FLAGS.MANAGE_MESSAGES,Permissions.FLAGS.ADMINISTRATOR])) return message.channel.send("Vous n'avez pas les permissions requisent pour pouvoir effectuer cette commande.")

        let rMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if(!rMember) return message.channel.send("Mentionner un membre pour lui enlever un rôle.")
    
        let role = message.guild.roles.cache.find(r => r.name == args[1]) || message.guild.roles.cache.find(r => r.id == args[1]) || message.mentions.roles.first()
    
        if(!role) return message.channel.send(`mentionner ou donner un rôle à enlever à ${rMember}`) 

        if(!rMember.roles.cache.has(role.id)) {
            return message.channel.send(`${rMember.displayName}, n'a pas ce rôle !`)
        } else {
            rMember.roles.remove(role.id).catch(e => console.log(e.message))
            message.channel.send(`${rMember.displayName} a été retirer à **${role.name}**`)
            console.log(`${message} utilisé par ${message.author.username}`)
            Client.channels.cache.get('937039928460709908').send(`${message.member.username} à était retiré du rôle ${role.name}.`)
        }
    
    }

    //commnde say
    else if (cmd === prefix + "say"){
        let Content = args.join(" ");
        if (!Content) return message.channel.send(`Donne moi quelque chose à dire !`)
        message.delete();
        message.channel.send(Content);
        console.log(`${cmd} ${Content} utilisé par ${message.author.username}`)
    }

    //commande 8ball
    else if (cmd === prefix + "8ball"){
        let question = args.join(" ");
        if (!question) return message.channel.send(`Tu ne m'a pas donner ta question.`);
        else {
            let responses = [
                            'Peut-être.',
	                        'Je ne pense pas',
	                        "J'espère.",
	                        'Même pas dans tes rêves.',
	                        'Il y a de bonnes chances.',
	                        'Je pense aussi.',
	                        'Je pense que non.',
	                        'Jamais !',
	                        'abadakor ssuppaire.',
	                        'Ahaha! Vraiment?!?',
	                        "Désoler que tu l'apprene que maintenant...",
	                        'Le futur est déjà ecrit.',
	                        'Le futur est incertain.',
	                        "Qui s'en fou ?",
	                        'Probablement.',
	                        'Il y a une petite chance.',
	                        'Oui !'
            ];
            let response =responses[Math.floor(Math.random() * responses.length - 1)];
            message.channel.send(response)
            console.log(`${message} utilisé par ${message.author.username}`)
        }
    }   


    //commande membres
    else if (cmd === prefix + "membres") {
        message.channel.send(`Le serveur posséde ${message.guild.memberCount} membres. `)
        console.log(`${message} utilisé par ${message.author.username}`)
    }


    //antilinks
    else if (message.content.includes("https://")) {
        message.delete(1);
        message.channel.send("Les liens ne sont pas autorisés ici " + message.author.username + ".")
        console.log(`${message} censuré envoyé par ${message.author.username}.`)
    }
    else if (message.content.includes("http://")) {
        message.delete(1);
        message.channel.send("Les liens ne sont pas autorisés ici " + message.author.username + ".")
        console.log(`${message} censuré envoyé par ${message.author.username}.`)
    }
    else if (message.content.includes("www.")) {
        message.delete(1);
        message.channel.send("Les liens ne sont pas autorisés ici " + message.author.username + ".")
        console.log(`${message} censuré envoyé par ${message.author.username}.`)
    }
    else if (message.content.includes("discord.gg/")) {
        message.delete(1);
        message.channel.send("Les liens ne sont pas autorisés ici " + message.author.username + ".")
        console.log(`${message} censuré envoyé par ${message.author.username}.`)
    }
   
});


Client.on("guildMemberAdd", member => {
    Client.channels.cache.get('954064091712983061').send(`Bienvenue <@${member.id}> sur le serveur La Grotte !! Accepte les règles pour avoir accès à toute l'intégralité du serveur.`);
    member.roles.add("957249041153028146")
    Client.channels.cache.get('937039926439084043').send(`${member.username} a rejoint le serveur`)
    console.log(`${member} à rejoint le serveur !`)
});

Client.on("guildMemberRemove", member => {
    Client.channels.cache.get('937039926439084043').send(`${member.username} à quitter le serveur`)
    console.log(`${member} à quitter le serveur.`)
});


Client.on("interactionCreate", interaction => {
    if(interaction.isButton()){
        if(interaction.customId === "bouton_rules"){
            interaction.member.roles.remove("957249041153028146")
            interaction.member.roles.add("954679825816240150")
            interaction.reply({content:"Tu as maintenant accès à l'intégralité du serveur ! Profites-en !",ephemeral: true})
            console.log(`${interaction.member.username} à accepté le règlement.`)
        }
    }
}); 


