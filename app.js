const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");
const manager = []
const intern = []
const engineer = []

function initialManagerPrompt () { 
  inquirer.prompt([{
  type: "input",
  message : "What is your managers name?", 
  name : "managerName"
},{
  type: "input",
  message : "What is their ID?",
  name : "managerID"
},{
  type : "input",
  message :"What is their email?",
  name : "managerEmail"
},{
  type : "input",
  message: "What is their office number?",
  name : "managerOffice"
}])
.then(data=>{
  manager.push(data)
  console.log(manager)
  nextEmployee()
})
}

function nextEmployee() { 
  inquirer.prompt({
    type: "list",
    message: "What type of employee would you like to add next?",
    name: "role",
    choices: [
        "Manager",
        "Engineer",
        "Intern",
        "No more employees"
    ]})
    .then(data=>{

      const role = data.role
      switch(role){
        case "Manager": 
          initialManagerPrompt();
          break;
        case "Intern":
          internPrompt();
          break;
        case "Engineer":
          engineerPrompt();
          break;
        case "No more employees":
          renderer();
        break
    }
    })
  }

  function internPrompt() { 
    inquirer.prompt([{
      type: "input",
  message : "What is your interns name?", 
  name : "internName"
},{
  type: "input",
  message : "What is their ID?",
  name : "internID"
},{
  type : "input",
  message :"What is their email?",
  name : "internEmail"
},{
  type : "input",
  message: "What school do they attend?",
  name : "internSchool"
}])
.then(data=>{
  intern.push(data)
  console.log(intern)
  nextEmployee()
  })
  }

function engineerPrompt() { 
  inquirer.prompt([{
    type: "input",
message : "What is your engineer's name?", 
name : "engineerName"
},{
type: "input",
message : "What is their ID?",
name : "engineerID"
},{
type : "input",
message :"What is their email?",
name : "engineerEmail"
},{
type : "input",
message: "What is their github username?",
name : "engineerGithub"
}])
.then(data=>{
  engineer.push(data)
  console.log(engineer)
  nextEmployee()
})
}
  

function renderer(){
  fs.writeFile(outputPath, JSON.stringify(manager, intern, engineer), (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
})
}


initialManagerPrompt();