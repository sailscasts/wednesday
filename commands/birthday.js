const { SlashCommandBuilder } = require('discord.js')
const fs = require('fs')
const { dir, fileName, inputChecker } = require('../data')
const store = require('../data/birthdays.json')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('birthday')
    .setDescription('Users can input their date of birth')
    .addIntegerOption((option) =>
      option.setName('day').setDescription('Enter day (1-31)').setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName('month')
        .setDescription('Enter month (1-12)')
        .setRequired(true)
    ),
  async execute(interaction) {
    const day = parseInt(interaction.options.getInteger('day'))
    const month = parseInt(interaction.options.getInteger('month'))

    const username = interaction.user.username
    const getUser = store.find((data) => data.name === username)

    const message = inputChecker(day, month)

    if (getUser) {
      getUser.day = day
      getUser.month = month
      fs.writeFileSync(
        `${dir}\\${fileName}`,
        JSON.stringify(store, null, 2),
        'utf-8'
      )
    } else {
      store.push({ name: username, day, month })
      fs.writeFileSync(
        `${dir}\\${fileName}`,
        JSON.stringify(store, null, 2),
        'utf-8'
      )
    }

    await interaction.deferReply()

    await interaction.editReply(message)
  },
}
