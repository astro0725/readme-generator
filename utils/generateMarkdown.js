// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
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

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
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

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {
  if (license === 'None' || !renderLicenseLink(license)) {
    return '';
  }
return `## License

This project is licensed under the ${license} license. For more details, see [this link](${renderLicenseLink(license)}).`;
}

const sections = {
  screenshots: 'Screenshots',
  features: 'Features',
  installations: 'Installation',
  usage: 'Usage',
  roadmaps: 'Roadmaps',
  contributing: 'Contributing',
  tests: 'Tests',
  questions: 'Questions',
  credits: 'Credits'
};

function generateSection(title, content) {
  return `## ${title}\n\n${content}\n\n`;
}

// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
  let markdownContent = "";

  if (data.license && data.license !== 'None') {
    markdownContent += renderLicenseBadge(data.license);
    markdownContent += renderLicenseSection(data.license);
  }
  markdownContent += renderTitle(data.title);
  markdownContent += renderDescription(data.description);

  for (let key in sections) {
    if (data[key]) {
      markdownContent += generateSection(sections[key], data[key]);
    }

  return markdownContent;
}


module.exports = generateMarkdown;
