import inquirer from 'inquirer';
import fs from 'fs';
import colors from 'colors';
import generateMarkdown from './generateMarkdown.js';


const questions = [
    `{Q1}: What would you like todo ?`,

    
];


function init() {
    inquirer
    .prompt([
        {
            type: 'list',
            name: 'Home actions',
            message: answers[0],
            choices: [
                'View all departments', 
                'View all roles', 
                'View all employees', 
                'ADD department', 
                'ADD role', 
                'ADD employee', 
                'Update an employee role'
            ]

        },

    ]).then((answers) => {
        const answers = generateMarkdown(answers)

});
}




init();