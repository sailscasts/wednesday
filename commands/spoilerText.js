const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('spoiler')
    .setDescription('Make a text spolier')
    .addStringOption(option =>
        option.setName('text')
            .setDescription('Write the text you want bold')
            .setRequired(true)),
  async execute(interaction) {
    const string = interaction.options.getString('text');
    await interaction.deferReply();
    await interaction.editReply(`||${string}||`);
  },
};
