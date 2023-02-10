const { loadButtons } = require("../../Handlers/buttonHandler");
const { ModalBuilder, ActionRowBuilder, TextInputStyle, TextInputBuilder } = require("discord.js");


module.exports = {
    data: {
        name: `registration-form`
    },
    execute(interaction){
        const modal = new ModalBuilder()
        .setCustomId('checkmateModal')
        .setTitle('Registration Form')

    const nameInput = new TextInputBuilder()
        .setCustomId('nameInput')
        .setLabel('Full Name:')
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

    const emailInput = new TextInputBuilder()
        .setCustomId('emailInput')
        .setLabel('Email Id:')
        .setStyle(TextInputStyle.Short)
        .setRequired(true);
    
    const linkedInInput = new TextInputBuilder()
        .setCustomId('linkedInInput')
        .setLabel('Link to LinkedIn profile:')
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

    const githubInput = new TextInputBuilder()
        .setCustomId('githubInput')
        .setLabel('Link to github profile:')
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

    const techStackInput = new TextInputBuilder()
        .setCustomId('techStackInput')
        .setLabel('Which tech stacks have you worked with?')
        .setStyle(TextInputStyle.Short)
        .setRequired(false);


    const firstActionRow = new ActionRowBuilder().addComponents(nameInput);
    const secondActionRow = new ActionRowBuilder().addComponents(emailInput);
    const thirdActionRow = new ActionRowBuilder().addComponents(linkedInInput)
    const fourthActionRow = new ActionRowBuilder().addComponents(githubInput);
    const fifthActionRow = new ActionRowBuilder().addComponents(techStackInput);

    modal.addComponents(firstActionRow, secondActionRow, thirdActionRow, fourthActionRow, fifthActionRow);

    interaction.showModal(modal);
    }
}