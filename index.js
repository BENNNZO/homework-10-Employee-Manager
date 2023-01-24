const inquirer = require('inquirer');

async function init() {
    const staffList = await inquireNameList()
    for (let i = 0; i < staffList.length(); i++) {
        await inquirerContactEmail()
        await inquirerContactGitHub()
        await inquirerContactEmail()
    }
}

function inquireNameList() {
    return new Promise(resolve => {
        inquirer
            .prompt({
                type: 'input',
                name: 'name_list',
                message: 'Type out list of all names seperated by commas',
                default: ''
            })
            .then(nameList => {
                nameList = nameList.name_list.split(",")
                nameList.forEach((e, i) => {
                    nameList[i] = e.trim()
                })
                resolve(nameList)
            })
    })
}

init()