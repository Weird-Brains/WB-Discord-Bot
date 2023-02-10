const { InteractionCollector } = require("discord.js");
const { Member, memberSchema } = require("../index.js");

async function addUser(userData, interaction) {
    const newMember = new Member({
        discordId: userData.discordId,
        name: userData.name,
        email: userData.email,
        linkedIn: userData.linkedIn,
        github: userData.github,
        techStack: userData.techStack
    });

    Member.findOne({email: userData.email}, function(err, foundMember) {
        if(!foundMember){
            newMember.save(function(err){
                if(!err){
                    interaction.reply({
                        content: `:white_check_mark: You have been successfully registered!`,
                        ephemeral: true
                    });
                    
                    const giveRole = interaction.guild.roles.cache.get(process.env.ALLOTED_ROLE);
                    const takeRole = interaction.guild.roles.cache.get(process.env.REMOVED_ROLE);
                    interaction.member.roles.add(giveRole);
                    interaction.member.roles.remove(takeRole);
                } else {
                    interaction.reply({
                        content: `⚠ Some error occured ${err}`,
                        ephemeral: true
                    });
                }
            });        
        } else {
            interaction.reply({
                content: "⚠ Your account is already registered.",
                ephemeral: true
            });
        }
    });
}


module.exports = { addUser };