const { SlashCommandBuilder } = require('discord.js')
const fs = require('fs')
const { dir, fileName, rangeDays, rangeMonth } = require('../data')
const store = require('../data/birthdays.json')
const _ = require('lodash')

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

    let message = 'Thanks for the entry.'

    if (getUser) {
      if (!rangeDays.includes(day)) {
        message = 'Please enter your DOB again'
      }
      if (!rangeMonth.includes(month)) {
        message = 'Please enter your DOB again'
      }
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
