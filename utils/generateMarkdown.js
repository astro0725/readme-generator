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

// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
  return `# ${data.title}
  ${data.license && data.license !== 'None' ? renderLicenseBadge(data.license) : ''}
---
## Description

${data.description}
---
## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
${data.license && data.license !== 'None' ? '- [License](#license)\n' : ''}- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)
---
## Installation

${data.installation}
---
## Usage

${data.usage}
---
${renderLicenseSection(data.license)}
---
## Contributing

${data.contributing}
---
## Tests

${data.tests}
---
## Questions

If you have any questions, please contact me at [${data.email}](mailto:${data.email}).

Find me on GitHub: [${data.github}](https://github.com/${data.github}).
`;
}

module.exports = generateMarkdown;
