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
        type: 'input',
        name: 'github',
        message: 'Enter your GitHub username:',
    },
    {
        type: 'input',
        name: 'email',
        message: 'Enter your email address:',
    },
    {
        type: 'editor',
        name: 'credits',
        message: 'Credit your contributor(s):',
    },
];

// allows user to pick what sections to add to README
async function init() {
    const { addSections } = await inquirer.prompt({
        type: 'confirm',
        name: 'addSections',
        message: 'Title, description, and screenshots are required. Would you like to add any other sections?',
        default: false,
    });

    let selectedSections = ['title', 'description', 'screenshots'];

    if (addSections) {
        const { sections } = await inquirer.prompt({
            type: 'checkbox',
            name: 'sections',
            message: 'Select the sections you want to include:\n Instructions:\n -Press your up/down keys to scroll options\n -Press space to select\n -Press enter to confirm selection\n',
            choices: ['badges', 'table of contents', 'features', 'demo', 'installation', 'usage', 'roadmap', 'contributing', 'tests', 'screenshots', 'questions', 'credits'],
        });
        selectedSections.push(...sections);
    }

    const questions = selectedSections.map(section => allSections[section]);

    const answers = await inquirer.prompt(questions);

writeToFile(answers.title, generateMarkdown(answers));
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