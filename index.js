const inquirer = require('inquirer');
const fs = require('fs');

async function init() {
    console.clear()
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
    const htmlContent = await generateHtmlContent(teamObject)
    console.log('Generating your HTML file!')
    await generateHtmlFile(htmlContent)
}

function inquireManager(teamObject) {
    return new Promise(resolve => {
        console.log('? TEAM MANAGER INFORMATION')
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
                console.clear()
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
                console.clear()
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
                console.clear()
                resolve()
            })
    })
}

function generateHtmlContent(team) {
    return new Promise(resolve => {
        function engineerSection(team) {
            let engineerSections = []
            team.teamStaff.engineers.forEach((e, i) => {
                engineerSections.push(`
                    <div class="engineer">
                        <p class="name">${e.name}</p>
                        <p class="id">${e.id}</p>
                        <p class="email">${e.email}</p>
                        <p class="github">${e.github}</p>
                    </div>
                `)
            })
            return engineerSections.join('')
        } 
        function internSection(team) {
            let internSections = []
            team.teamStaff.interns.forEach((e, i) => {
                internSections.push(`
                    <div class="engineer">
                        <p class="name">${e.name}</p>
                        <p class="id">${e.id}</p>
                        <a href = "mailto:${e.email}">${e.email}</a>
                        <p class="schoo">${e.school}</p>
                    </div>
                `)
            })
            return internSections.join('')
        } 
        let htmlContent = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="stylesheet" href="./style.css">
                <title>Staff Manager</title>
            </head>
            <body>
                <header>
                    <h1>STAFF MANAGER</h1>
                </header>
                <section class="manager">
                    <div>
                        <h2>TEAM LEADER</h2>
                        <div>
                            <p class="left">NAME:</p><p class="right">${team.teamManager.name}</p>
                            <p class="left">ID:</p><p class="right">${team.teamManager.id}</p>
                            <p class="left">EMAIL:</p><p class="right">${team.teamManager.email}</p>
                            <p class="left">OFFICE NUM:</p><p class="right">${team.teamManager.office_number}</p>
                        </div>
                    </div>
                </section>
                <section class="staff">
                    <div class="engineers">
                        <h2>ENGINEERS</h2>
                        ${engineerSection(team)}
                    </div>
                    <div class="interns">
                        <h2>INTERNS</h2>
                        ${internSection(team)}
                    </div>
                </section>
            </body>
            </html>
        `
        resolve(htmlContent)
    })
}

function generateHtmlFile(content) {
    return new Promise(resolve => {
        fs.writeFile('./test.html', content, err => {
            if (err) {
                console.error(err);
            } else resolve()
        })
    })
}

init()