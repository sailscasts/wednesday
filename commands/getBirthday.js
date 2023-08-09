const { SlashCommandBuilder } = require('discord.js')
const store = require('../data/birthdays.json')
const { monthNames, rangeMonth, date } = require('../data')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('dob')
    .setDescription('Users can view their DOB'),
  async execute(interaction) {
    let message = 'No DOB entered'
    const username = interaction.user.username
    const getUser = store.find((data) => data.name === username)

    if (getUser) {
      message = `Hi, ${username}. Your DOB: ${date(getUser.day)} ${
        monthNames[getUser.month - 1]
      }`
    }

    await interaction.deferReply()

    await interaction.editReply(message)
  },
}
