// required imports for functionality
const inquirer = require('inquirer');
// added fs-extra for file organization
const fs = require('fs-extra');
const generateMarkdown = require('./utils/generateMarkdown');

// question prompts for generating README
const questions = [
    {
        type: 'input',
        name: 'title',
        message: 'What is the title of your project?',
    },
    {
        type: 'list',
        name: 'license',
        message: 'Choose a license:',
        choices: ['MIT', 'Apache 2.0', 'GPLv3', 'BSD 3-Clause', 'None'],
    },
    {
        type: 'editor',
        name: 'description',
        message: 'Please enter a description for your project (when your editor opens, type your content, save and close when done):',
    },
    {
        type: 'editor',
        name: 'installation',
        message: 'Enter the installation instructions (when your editor opens, type your content, save and close when done):',
    },
    {
        type: 'editor',
        name: 'usage',
        message: 'Provide usage information (when your editor opens, type your content, save and close when done):',
    },
    {
        type: 'editor',
        name: 'contributing',
        message: 'Provide contribution guidelines (when your editor opens, type your content, save and close when done):',
    },
    {
        type: 'editor',
        name: 'tests',
        message: 'Provide test instructions (when your editor opens, type your content, save and close when done):',
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

// created intro for application
const introPrompt = [
    {
        type: 'confirm',
        name: 'continue',
        message: "Thank you for using astro0725's CLI based README.md generator. Would you like to proceed with making a README.md?",
        default: true
    }
];

// writes file and adds it to a separate directory
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

// node index launches intro, if yes then generator proceeds
function init() {
    inquirer.prompt(introPrompt).then((introAnswer) => {
        if (introAnswer.continue) {
            inquirer.prompt(questions).then((answers) => {
                writeToFile(answers.title, generateMarkdown(answers));
            });
        } else {
            console.log('Exiting the README.md generator. Have a great day!');
        }
    });
}

// Function call to initialize app
init();