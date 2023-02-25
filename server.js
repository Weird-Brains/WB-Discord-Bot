const express = require('express');
const {getMemberDetails,randomFunction} = require("./index");
const {data} = require("./profile/getUser");

const server = express();

server.set("view engine", "ejs");
server.use(express.static('public'));

server.all(`/`, async (req, res) => {
    const getData = await data();
    // res.render("main.ejs", {
    //     name: getData.name,
    //     linkedIn: getData.linkedIn,
    //     github: getData.github,
    //     discordUserName: getData.discordUserName,
    //     avatar: getData.avatar
    // });
    res.render("main.ejs", {
        dataSet: getData
    })
});


    server.listen(3000, () => {
        console.log(`Server is now ready and listening on port 3000! | ` + "Server started on: " + getDate());
    });


const getDate = () => {
    const newDate = new Date();
    const year = newDate.getFullYear();
    const month = newDate.getMonth() + 1;
    const d = newDate.getDate();
    
    return `${month.toString().padStart(2, '0')}/${d.toString().padStart(2, '0')}/${year}`;
}
