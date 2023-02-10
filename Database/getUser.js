const { InteractionCollector, ModalSubmitFields , EmbedBuilder} = require("discord.js");
const { Member, memberSchema } = require("../index.js");

async function getUser(mentionedUser, interaction){
    Member.findOne({userId: mentionedUser}, function(err, foundMember){
        if(!foundMember){
            interaction.reply({
                content: `The user is not registered.`,
                ephemeral: true
            });
        } else {
             const memberEmbed = new EmbedBuilder()
                .setColor("#083AA9")
                .setTitle(foundMember.name)
                .addFields(
                    { name: `Github` , value: `${foundMember.github}`},
                    { name: `Contact` , value: `${foundMember.linkedIn}`},
                    { name: `E-Mail` , value: `${foundMember.email}`},
                    { name: `Tech stacks:` , value: `${foundMember.techStack}`},
                )
            interaction.reply({
                embeds: [memberEmbed]
            });
        }
    })
    // interaction.reply({
    //     content: "The above command is under development",
    //     ephemeral: true
    // });
}

module.exports = { getUser }