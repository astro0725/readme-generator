// renders license badge
// returns false if no license
function renderLicenseBadge(license) {
  switch (license) {
    case 'MIT':
        return '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)]';
    case 'Apache 2.0':
        return '[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)]';
    case 'GPLv3':
        return '[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)]';
    case 'BSD 3-Clause':
        return '[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)]';
    default:
        return '';
  }
}

// renders license link 
// returns false if no license
function renderLicenseLink(license) {
  switch (license) {
    case 'MIT':
        return 'https://opensource.org/licenses/MIT';
    case 'Apache 2.0':
        return 'https://opensource.org/licenses/Apache-2.0';
    case 'GPLv3':
        return 'https://www.gnu.org/licenses/gpl-3.0';
    case 'BSD 3-Clause':
        return 'https://opensource.org/licenses/BSD-3-Clause';
    default:
        return '';
}
}

// if license is specified, returns license section
function renderLicenseSection(license) {
  if (license === 'None' || !renderLicenseLink(license)) {
    return '';
  }
return `## License

This project is licensed under the ${license} license. For more details, see [this link](${renderLicenseLink(license)}).`;
}

// renders ToC based on selected sections from user
function renderToC(data) {
  const tocSections = {
    features: 'Features',
    installations: 'Installation',
    usage: 'Usage',
    roadmap: 'Roadmap',
    contributing: 'Contributing',
    tests: 'Tests',
    screenshots: 'Screenshots',
    questions: 'Questions',
    credits: 'Credits'
  };

  let toc = "## Table of Contents\n";
  for (let key in tocSections) {
    if (data[key]) {
      toc += `- [${tocSections[key]}](#${key})\n`;
    }
  }
  
  return toc;
}

// dynamic rendering code for selecting optional sections
const sections = {
  screenshots: 'Screenshots',
  features: 'Features',
  installations: 'Installation',
  usage: 'Usage',
  roadmap: 'Roadmap',
  contributing: 'Contributing',
  tests: 'Tests',
  credits: 'Credits'
};

function renderSection(title, content) {
  return `## ${title}\n\n${content}\n\n`;
}

function renderQuestions(email, github) {
  return `
## Questions

For any questions regarding this project, please feel free to contact me at ${email}.

You can find more of my work on [GitHub](https://github.com/${github}).`;
}

// generates readme content
function generateMarkdown(data) {
  let markdownContent = "";

  markdownContent += renderTitle(data.title);
  markdownContent += renderDescription(data.description);

// if user adds ToC, then it will be generated
  if (data.tableOfContents) {
    markdownContent += renderToC(data);
  }

// if user adds a section, then it will be generated
  for (let key in sections) {
    if (data[key]) {
      markdownContent += renderSection(sections[key], data[key]);
    }
  }


// if user has licensing and wants to include it to the readme, then it will be generated
  if (data.license && data.license !== 'None') {
    markdownContent += renderLicenseBadge(data.license);
    markdownContent += renderLicenseSection(data.license);
  }

// if user adds questions, then it will be generated
  if (selectedSections.includes("questions") && answers.email && answers.github) {
    questionsContent = renderQuestions(answers.email, answers.github);
}

  return markdownContent;
}


module.exports = generateMarkdown;
