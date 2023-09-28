// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs-extra');
const generateMarkdown = require('./utils/generateMarkdown');

// TODO: Create an array of questions for user input
const questions = [
    {
        type: 'input',
        name: 'title',
        message: 'What is the title of your project?',
    },
    {
        type: 'input',
        name: 'description',
        message: 'Please enter a description for your project:',
    },
    {
        type: 'editor',
        name: 'installation',
        message: 'Enter the installation instructions (open your editor and type the instructions, save and close when done):',
    },
    {
        type: 'editor',
        name: 'usage',
        message: 'Provide usage information (open your editor and type the instructions, save and close when done):',
    },
    {
        type: 'list',
        name: 'license',
        message: 'Choose a license:',
        choices: ['MIT', 'Apache 2.0', 'GPLv3', 'BSD 3-Clause', 'None'],
    },
    {
        type: 'editor',
        name: 'contributing',
        message: 'Provide contribution guidelines (open your editor and type the instructions, save and close when done):',
    },
    {
        type: 'editor',
        name: 'tests',
        message: 'Provide test instructions (open your editor and type the instructions, save and close when done):',
    },
    {
        type: 'input',
        name: 'github',
        message: 'Enter your GitHub username:',
    },
    {
        type: 'input',
        name: 'email',
        message: 'Enter your email address:',
    },
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    const dir = `./generated-readmes/${fileName}`;

    fs.ensureDir(dir)
        .then(() => {
            fs.writeFile(`${dir}/README.md`, data, (err) => {
                if (err) throw err;
                console.log('README.md has been generated!');
            });
        })
        .catch((err) => {
            console.error(err);
        });
}

// TODO: Create a function to initialize app
function writeToFile(fileName, data) {
    // Define the directory path
    const dir = `./generated-readmes/${fileName}`;

    // Ensure directory exists and then write the file
    fs.ensureDir(dir)
        .then(() => {
            fs.writeFile(`${dir}/README.md`, data, (err) => {
                if (err) throw err;
                console.log('README.md has been generated!');
            });
        })
        .catch((err) => {
            console.error(err);
        });
}

function init() {
    inquirer.prompt(questions).then((answers) => {
        // Use the project title as the folder name
        writeToFile(answers.title, generateMarkdown(answers));
    });
}

// Function call to initialize app
init();
