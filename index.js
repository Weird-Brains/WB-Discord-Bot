require('dotenv').config();
const { Client, GatewayIntentBits, Partials, Collection, ActivityType } = require("discord.js");
const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;

const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://"+process.env.DATABASE_USERNAME+":"+process.env.DATABASE_PASSWORD+"@weirdbrains.dyfo7je.mongodb.net/"+process.env.DATABASE_NAME);

const memberSchema = {
    discordId: String,
    name: String,
    email: String,
    linkedIn: String,
    github: String,
    techStack: String
}

const Member = mongoose.model("Member", memberSchema);

const client = new Client({ 
    intents: [Guilds, GuildMembers, GuildMessages], 
    partials: [User, Message, GuildMember, ThreadMember]
});

client.events = new Collection();
client.commands = new Collection();
client.buttons = new Collection();

const { loadEvents } = require("./Handlers/eventHandlers");
loadEvents(client);

const { loadButtons } = require("./Handlers/buttonHandler")
loadButtons(client);


client.login(process.env.BOT_TOKEN).then(() => {
    //console.log(`Bot has logged in as ${client.user.username}`);
    client.user.setPresence({
        activities: [{ name: `Your progress ^.^`, type: ActivityType.Watching}],
        status: 'idle'
    });
    //client.user.setActivity(`with ${client.guilds.cache.size} guilds`, {type: `Watching`});
}).catch((err)=>console.log(err));


const getMemberDetails = (async () => {
    let memberList = [];
    const server = await client.guilds.fetch("994626290105720903");
    const serverMemberList = await server.members.fetch().then(members => {
        memberList = members.filter(member => ((member.user.bot === false) && (member._roles.includes("1072900624502489129")))).map(member => member.user);
    });
    return memberList;
});

const randomFunction = (() => {
    console.log("This function was called");
});

module.exports = {getMemberDetails, randomFunction};

