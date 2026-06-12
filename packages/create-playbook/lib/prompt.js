// lib/prompt.js
// File: packages/create-playbook/lib/prompt.js
//
// Sequential prompt loop using Node built-in readline.
// Zero external dependencies.

import { createInterface } from "readline";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

/**
 * Ask a single question and return the answer.
 * @param {string} question
 * @param {string} [defaultValue]
 * @returns {Promise<string>}
 */
export function ask(question, defaultValue = "") {
  return new Promise((resolve) => {
    const display = defaultValue
      ? `${question} (${defaultValue}): `
      : `${question}: `;
    rl.question(display, (answer) => {
      resolve(answer.trim() || defaultValue);
    });
  });
}

/**
 * Ask a question with a numbered list of choices.
 * Returns the selected value.
 * @param {string} question
 * @param {{ label: string, value: string, description?: string }[]} choices
 * @returns {Promise<string>}
 */
export function choose(question, choices) {
  return new Promise((resolve) => {
    console.log(`\n${question}\n`);
    choices.forEach((choice, i) => {
      const desc = choice.description ? `  — ${choice.description}` : "";
      console.log(`  ${i + 1}. ${choice.label}${desc}`);
    });
    console.log();

    const prompt = () => {
      rl.question(`Enter a number (1–${choices.length}): `, (answer) => {
        const index = parseInt(answer.trim(), 10) - 1;
        if (index >= 0 && index < choices.length) {
          resolve(choices[index].value);
        } else {
          console.log(`  Please enter a number between 1 and ${choices.length}.`);
          prompt();
        }
      });
    };

    prompt();
  });
}

/**
 * Ask a yes/no question. Returns true for yes, false for no.
 * @param {string} question
 * @param {boolean} [defaultValue=true]
 * @returns {Promise<boolean>}
 */
export function confirm(question, defaultValue = true) {
  return new Promise((resolve) => {
    const hint = defaultValue ? "Y/n" : "y/N";
    rl.question(`${question} (${hint}): `, (answer) => {
      const trimmed = answer.trim().toLowerCase();
      if (!trimmed) return resolve(defaultValue);
      resolve(trimmed === "y" || trimmed === "yes");
    });
  });
}

/**
 * Close the readline interface.
 */
export function close() {
  rl.close();
}
