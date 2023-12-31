# CLI README.md Generator
As the title describes, I have built a simple application for generating a README.md from your command line interface. I created two versions of this CLI application. Version one has no customization to meet challenge requirements. Version two offers more customization and allows you to pick and choose what sections you would like to add.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Screenshots](#screenshots)
- [Demo](#demo)
- [Credits](#credits)
- [License](#license)

## Features

#### V1-
* Allows user input for the following sections: 
	* Title
	* Description 
	* Installation
	* Usage
	* License
	* Contributing
	* Tests
	* Questions
* Sections will have you launch an editor so it's easier for people who aren't familiar with line break syntax and/or want to visually see how their README.md section will look
* License is configurable (with limited options) to add if needed
* A table of contents is automatically generated for you
* When the file is generated, it is added to the generated-readmes folder within a folder with the corresponding name of the project

#### V2- 
* Allows user input for title and description
* Feature to customize what sections they want in their README for the following sections: 
	* Features
	* Screenshots
	* Demo
	* Installations
	* Usage
	* Roadmap
	* Contributing
	* Tests
	* Questions
	* Credits
	* License
* Some sections will have you launch an editor so it's easier for people who aren't familiar with line break syntax and/or want to visually see how their README.md section will look
* If you would like to add a license, it is configurable (with limited options)
* A prompt is asked if you would like to add a table of contents if you decide that you'd like 4 or more sections to your README.md
* When the file is generated, it is added to the generated-readmes folder within a folder with the corresponding name of the project

## Installation

- Clone my repo in your desired directory using `git clone git@github.com:astro0725/readme-generator.git`
- Type `npm install`in your terminal to get dependencies
- CD into your desired version
- Use `node index.js` to initialize the generator

## Screenshots

#### Demo V1 README.md
![Demo-V1](./media/demo-v1.png)
#### Demo V2 README.md
![Demo-V2](./media/demo-v2.png)

## Demo

#### Version 1
<video src='media\v1-demo.mp4'/>

#### Version 2
<video src='media\v2-demo.mp4'/>



## Credits

This README.md was created using V2 of this project.

---

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg) 
## License

This project is licensed under the MIT license. For more details, see [this link](https://opensource.org/licenses/MIT).
