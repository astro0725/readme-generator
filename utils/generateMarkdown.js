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

function generateSection(title, content) {
  let genContent = "";
  genContent += generateTitle(data.title);
  genContent += generateDescription(data.description);
  if (data.screenshots) genContent += generateScreenshots(data.screenshots);
  if (data.features) genContent += generateFeatures(data.features);
  if (data.installations) genContent += generateInstallation(data.installations);
  if (data.usage) genContent += generateUsage(data.usage);
  if (data.roadmaps) genContent += generateRoadmap(data.roadmaps);
  if (data.contributing) genContent += generateContributing(data.contributing);
  if (data.tests) genContent += generateTests(data.tests);
  if (data.screenshots) genContent += generateScreenshots(data.screenshots);
  if (data.questions) genContent += generateQuestions(data.questions);
  if (data.credits) genContent += generateCredits(data.credits);
  return `## ${title}\n\n${content}\n\n`;
}

// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
  let markdownContent = "";

  if (data.license && data.license !== 'None') {
    markdownContent += renderLicenseBadge(data.license);
    markdownContent += renderLicenseSection(data.license);
  }

  if (data.generateSection) {
    markdownContent += renderSection(data.generateSection);
  }

  return markdownContent;
}


module.exports = generateMarkdown;
