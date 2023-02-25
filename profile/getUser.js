const { getMemberDetails } = require("../index");
const mongoose = require('mongoose');

const Member = mongoose.models.Member;

const data = (async () => {
    var idList = [];
    var mergedList = [];
    
    const memberList = await getMemberDetails();
    idList = memberList.map(member => member.id);

    const dbData = await getMembersById(idList)
    .then((databaseMemberList) => {
        // Promise resolved successfully, databaseMemberList is fully populated
        return databaseMemberList;
    })
    .catch((err) => {
        // Promise rejected with an error
        console.error(err);
    });

    for (var i = 0; i < memberList.length; i++) {
        mergedList[i] = {
            name: dbData[i].name,
            linkedIn: dbData[i].linkedIn,
            github: dbData[i].github,
            discordUserName: memberList[i].username + "#" + memberList[i].discriminator,
            avatar: "https://cdn.discordapp.com/avatars/" + dbData[i].discordId + "/" + memberList[i].avatar + ".png"
        }
    }

    return mergedList;
    
});

async function getMembersById(idList) {
    let databaseMemberList = [];

    for (const id of idList) {
        const foundMember = await Member.findOne({ discordId: id });
        databaseMemberList.push(foundMember);
    }

    return databaseMemberList;
}

module.exports = { data };