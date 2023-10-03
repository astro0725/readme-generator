// required imports for functionality
const inquirer = require('inquirer');
// added fs-extra for file organization
const fs = require('fs-extra');
const generateMarkdown = require('./utils/generateMarkdown');

// question prompts for generating README
const allSections = [
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
        type: 'input',
        name: 'screenshots',
        message: 'Enter the link or path to your screenshot(s):',
    },
    {
        type: 'editor',
        name: 'features',
        message: 'Enter features for your project (when your editor opens, type your content, save and close when done):',
    },
    {
        type: 'input',
        name: 'demo',
        message: 'Provide live demo with annotations if possible:',
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
        name: 'roadmap',
        message: 'Enter future plans for your project (when your editor opens, type your content, save and close when done):',
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
        type: 'editor',
        name: 'questions',
        message: 'Enter ways to contact you about your project (when your editor opens, type your content, save and close when done):',
    },
    {
        type: 'editor',
        name: 'credits',
        message: 'Credit your contributor(s):',
    },
];

const allSectionsObj = allSections.reduce((acc, curr) => {
    acc[curr.name] = curr;
    return acc;
}, {});

// allows user to pick what sections to add to README
async function init() {
    const { addSections } = await inquirer.prompt({
        type: 'confirm',
        name: 'addSections',
        message: 'Title, description, installation, usage, license, contributing, tests, and questions are required. Would you like to add any other sections?',
        default: false,
    });

    let selectedSections = ['title', 'description', 'installation', 'usage', 'license', 'contributing', 'tests', 'questions'];
    let answers = {};

    if (addSections) {
        const { sections } = await inquirer.prompt({
            type: 'checkbox',
            name: 'sections',
            message: 'Select the sections you want to include:\n Instructions:\n -Press your up/down keys to scroll options\n -Press space to select, i to deselect\n -Press enter to confirm selection\n',
            choices: allSections
            .filter(section => !selectedSections.includes(section.name))
            .map(section => section.name),
    });
        selectedSections.push(...sections);
    }

    const questions = selectedSections.map(section => allSectionsObj[section]).filter(Boolean);
    answers = await inquirer.prompt(questions);

    writeToFile(answers.title, generateMarkdown(answers, selectedSections));
}

// generates README.md
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

init();