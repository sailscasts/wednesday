const fs = require('node:fs')
const path = require('node:path')
require('dotenv').config()
const { Client, Events, GatewayIntentBits, Collection } = require('discord.js')
const cron = require('node-cron')
const { celebrants } = require('./data')
const store = require('./data/birthdays.json')

const client = new Client({ intents: [GatewayIntentBits.Guilds] })

client.commands = new Collection()
const commandsPath = path.join(__dirname, 'commands')
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith('.js'))

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file)
  const command = require(filePath)
  // Set a new item in the Collection with the key as the command name and the value as the exported module
  if ('data' in command && 'execute' in command) {
    client.commands.set(command.data.name, command)
  } else {
    console.log(
      `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
    )
  }
}

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return
  const command = interaction.client.commands.get(interaction.commandName)

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`)
    return
  }
  
  cron.schedule('0 0 * * *', async function () {
    console.log('-------------------------------');
    console.log('running a task every 24 hours');

    const cele = await celebrants(store)
    cele.map(data => client.channels.cache.get(`${process.env.CHANNEL_ID}`).send(`Hi it's wednesday! ${data.name}`) )
    

    console.log('done!')

  });

  try {
    await command.execute(interaction)
  } catch (error) {
    console.error(error)
    await interaction.reply({
      content: 'There was an error while executing this command!',
      ephemeral: true,
    })
  }
})

client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`)
})

client.login(process.env.TOKEN)
