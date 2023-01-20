const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v10')

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN)

const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('events')
    .setDescription('See scheduled events.'),
  async execute(interaction) {
    await interaction.deferReply()
    const scheduledEvents = await rest.get(
      Routes.guildScheduledEvents(interaction.guild.id)
    )
    const embeds = scheduledEvents.map((event) => {
      const embed = new EmbedBuilder()
        .setColor(0x22ffdd)
        .setTitle(event.name)
        .setURL(`https://discord.gg/wA9zRrqwtJ?event=${event.id}`)
        .addFields(
          { name: 'Description', value: event.description },
          {
            name: 'Event starts',
            value: new Date(event.scheduled_start_time).toLocaleString(
              'en-US',
              {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              }
            ),
          },
          {
            name: 'Created by',
            value: event.creator.username,
          }
        )
      return embed
    })

    interaction.editReply({ embeds })
  },
}
