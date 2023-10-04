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

function renderToC(data) {
  console.log("Rendering ToC...");
  const tocSections = {
    features: 'Features',
    screenshots: 'Screenshots',
    demo: 'Demo',
    installations: 'Installation',
    usage: 'Usage',
    roadmap: 'Roadmap',
    contributing: 'Contributing',
    tests: 'Tests',
    questions: 'Questions',
    credits: 'Credits',
    license: 'License'
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
  features: 'Features',
  screenshots: 'Screenshots',
  demo: 'Demo',
  installations: 'Installation',
  usage: 'Usage',
  roadmap: 'Roadmap',
  contributing: 'Contributing',
  tests: 'Tests',
  questions: 'Questions',
  credits: 'Credits'
};

function renderSection(title, content) {
  return `---\n## ${title}\n\n${content}\n\n`;
}

// generates readme content
function generateMarkdown(data) {
  console.log(data);
  let markdownContent = `# ${data.title}\n---\n${data.description}\n\n`;

// if user adds ToC, then it will be generated
  if (data.tableOfContents) {
    console.log("Table of Contents is required. Calling renderToC...");
    markdownContent += renderToC(data);
  } else {
    console.log("Table of Contents is not required.");
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

  return markdownContent;
}


module.exports = generateMarkdown;