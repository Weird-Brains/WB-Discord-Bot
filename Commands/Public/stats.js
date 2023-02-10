// Possible end-points:
// https://www.chess.com/callback/user/popup/{username} <- Get user status
// https://www.chess.com/callback/member/stats/{username} <- Rapid / Tactical (Get username, rating, highest_rating, games played, games won, officalRating)

const { ChatInputCommandInteraction, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("stats")
    .setDescription("Get a member's statistics")
    .addUserOption((option) => option.setName('user').setDescription('To view the user stats').setRequired(true)),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction
     */
    execute(interaction){
        interaction.reply({
            content: "This command is under development...",
            ephemeral: true
        });
    }
}