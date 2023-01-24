const inquirer = require('inquirer');

async function init() {
    let teamObject = {
        teamManager: {},
        teamStaff: {
            engineers: [],
            interns: []
        }
    }
    await inquireManager(teamObject)
    let nameList = await inquireNameList()
    console.log(nameList)
    for (let i = 0; i < nameList.length; i++) {
        await inquireStaffInfo(nameList[i], teamObject)
    }
}

function inquireManager(teamObject) {
    return new Promise(resolve => {
        console.log('TEAM MANAGER INFORMATION')
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'name',
                    message: 'Name:',
                    default: 'default'
                },
                {
                    type: 'input',
                    name: 'employee_id',
                    message: 'Employee ID:',
                    default: 'default'
                },
                {
                    type: 'input',
                    name: 'email',
                    message: 'Email Adress:',
                    default: 'default'
                },
                {
                    type: 'input',
                    name: 'office_number',
                    message: 'Office Number:',
                    default: 'default'
                }
            ])
            .then(answers => {
                teamObject.teamManager = answers
                console.log(teamObject)
                console.log(answers)
                resolve()
            })
    })
}

function inquireNameList() {
    return new Promise(resolve => {
        inquirer
            .prompt({
                type: 'input',
                name: 'name_list',
                message: 'Type out list of all names seperated by commas:',
                default: 'benjamin, maggie, kate, erin'
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

function inquireStaffInfo(name, team) {
    return new Promise(resolve => {
        console.log(`? ${name.toUpperCase()}'S INFORMATION:`)
        inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'type',
                    message: 'Staff Type:',
                    choices: ['Engineer', 'Intern']
                },
                {
                    type: 'input',
                    name: 'id',
                    massage: 'Staff ID:',
                    default: 'default'
                },
                {
                    type: 'input',
                    name: 'email',
                    massage: 'Staff Email:',
                    default: 'default'
                },
                {
                    type: 'input',
                    name: 'github',
                    massage: 'Staff GitHub Username:',
                    default: 'default',
                    when: (answer) => {
                        if (answer.staff_type === 'Engineer') return true
                    }
                },
                {
                    type: 'input',
                    name: 'school',
                    massage: 'Staff School:',
                    default: 'default',
                    when: (answer) => {
                        if (answer.staff_type === 'Intern') return true
                    }
                }
            ])
            .then(answer => {
                answer.name = name
                if (answer.staff_type === 'Intern') team.teamStaff.interns.push(answer)
                if (answer.staff_type === 'Engineer') team.teamStaff.engineers.push(answer)
                resolve()
            })
    })
}

init()


// GIVEN a command-line application that accepts user input
// WHEN I am prompted for my team members and their information
// THEN an HTML file is generated that displays a nicely formatted team roster based on user input
// WHEN I click on an email address in the HTML
// THEN my default email program opens and populates the TO field of the email with the address
// WHEN I click on the GitHub username
// THEN that GitHub profile opens in a new tab

// WHEN I start the application
// THEN I am prompted to enter the team manager’s name, employee ID, email address, and office number
// WHEN I enter the team manager’s name, employee ID, email address, and office number
// THEN I am presented with a menu with the option to add an engineer or an intern or to finish building my team
// WHEN I select the engineer option
//               THEN I am prompted to enter the engineer’s name, ID, email, and GitHub username, and I am taken back to the menu
// WHEN I select the intern option
//               THEN I am prompted to enter the intern’s name, ID, email, and school, and I am taken back to the menu
// WHEN I decide to finish building my team
// THEN I exit the application, and the HTML is generated