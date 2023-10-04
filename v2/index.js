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
// Introduction message
    await inquirer.prompt({
        type: 'confirm',
        name: 'continue',
        message: "Thank you for using astro0725's CLI based README.md generator. Would you like to proceed with making a README.md?",
        default: true
    });

// prompt to add additional sections
    const { addSections } = await inquirer.prompt({
        type: 'confirm',
        name: 'addSections',
        message: 'Title and description are required. Would you like to add any other sections?',
        default: false,
    });

// declares required sections
    let selectedSections = ['title', 'description'];
    let answers = {};

// checkbox for selecting sections to add
    if (addSections) {
        const { sections } = await inquirer.prompt({
            type: 'checkbox',
            name: 'sections',
            message: 'Select the sections you want to include:\n Instructions:\n -Press your up/down keys to scroll options\n -Press space to select, i to deselect\n -Press enter to confirm selection\n',
            choices: allSections
            .filter(section => section.name !== 'title' && section.name !== 'description')
            .map(section => section.name),
    });
        selectedSections.push(...sections);
    }

// asks if user wants a table of contents if they have 4 or more sections
    if (selectedSections.length >= 4) {
        const { addTableOfContents } = await inquirer.prompt({
            type: 'confirm',
            name: 'addTableOfContents',
            message: 'You have selected four or more sections. Would you like to add a table of contents?',
            default: false,
        });

        answers.tableOfContents = addTableOfContents;
    }

    const questions = selectedSections.map(section => allSectionsObj[section]).filter(Boolean);
    const newAnswers = await inquirer.prompt(questions);
    Object.assign(answers, newAnswers);

    writeToFile(answers.title, generateMarkdown(answers, selectedSections));
}

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

// Initializes function
init();