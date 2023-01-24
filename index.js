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
    const nameList = await inquireNameList()
    for (let i = 0; i < nameList.length; i++) {
        await inquireStaffInfo(nameList[i], teamObject)
    }
    console.log('Generating HTML...')
    await generateHTML(teamObject)
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
                        if (answer.type === 'Engineer') return true
                    }
                },
                {
                    type: 'input',
                    name: 'school',
                    massage: 'Staff School:',
                    default: 'default',
                    when: (answer) => {
                        if (answer.type === 'Intern') return true
                    }
                }
            ])
            .then(answer => {
                answer.name = name
                if (answer.type === 'Intern') team.teamStaff.interns.push(answer)
                if (answer.type === 'Engineer') team.teamStaff.engineers.push(answer)
                resolve()
            })
    })
}

init()

const EXAMPLE = {
    "teamManager": {
        "name": "default",
        "employee_id": "default",
        "email": "default",
        "office_number": "default"
    },
    "teamStaff": {
        "engineers": [
            {
                "type": "Engineer",
                "id": "default",
                "email": "default",
                "github": "default",
                "name": "benjamin"
            },
            {
                "type": "Engineer",
                "id": "default",
                "email": "default",
                "github": "default",
                "name": "maggie"
            }
            ],
        "interns": [
            {
                "type": "Intern",
                "id": "default",
                "email": "default",
                "school": "default",
                "name": "kate"
            },
            {
                "type": "Intern",
                "id": "default",
                "email": "default",
                "school": "default",
                "name": "erin"
            }
        ]
    }
}

function generateHTML(team) {
    return new Promise(resolve => {
        
    })
}