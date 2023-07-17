const { SlashCommandBuilder } = require("discord.js")
const { Octokit } = require("@octokit/rest")
var fs = require('fs')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('issues')
        .setDescription('Get all available issues'),
    async execute(interaction) {

        await interaction.deferReply();

        const octokit = new Octokit({ auth: process.env.GITHUB_ACCESS_TOKEN })
        const issues = await octokit.issues.listForRepo({
            owner: 'sailscastshq',
            repo: 'boring-stack',
            per_page: 100
        })

        await interaction.editReply(
            `Found ${issues.data.map((item) => item.pull_request ? null : item)
                .filter(item => item).length} issues on the boring-stack repo.`
        )
        
    }
}
