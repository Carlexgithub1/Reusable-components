const choiceForm = document.querySelector("form.choice-form");
const overlay = document.querySelector("div.overlay");
const choiceList = document.querySelector("div.choices");

const btnCloseChoices = document.querySelector("div.close-choices");
const input = document.querySelector("input");

/**
 * Creates a new simple basic button
 * @param {String} text Text to display on the button
 * @param {String} id The button's id
 * @param {String} value The button's value
 * @param {String} className All the classes we want to assign to the button
 * @returns {DOMElementButton} A new button
 */
function newBtn({ text, id = text, value = text, className = "" }) {
  let button = document.createElement("button");
  button.innerText = text;
  button.id = id;
  button.value = value;
  button.classList.add(className);
  button.addEventListener("click", (e) => {
    e.preventDefault();
  });
  return button;
}

/**
 * Adds a new button choice category to the form
 * @param {String} text The text to display on the button
 * @param {String} choices A string containing the choices corresponding to the button available subchoices seperated by a colums (;)
 */
function addChoiceBtn({
  text = "Choice btn",
  choices = "choice element 1;choice element 2",
}) {
  let button = newBtn({ text: text, className: "btn-choice" });
  button.setAttribute("choices", choices);
  button.addEventListener("click", openChoiceList);
  choiceForm.appendChild(button);
  console.log(`Choice button ${text} added`);
}

/**
 * Validates the user's choice by setting the input's value to the user's choice
 */
function makeChoice() {
  input.value = this.value;
  console.log(`${this.value} choosed`);
  closeChoiceList();
}

/**
 * Add a choice to the choice list (not the choice category)
 * @param {String} text Text to display on the button
 * @param {String} id The button's id
 * @param {String} value The button's value
 */
function addChoice({ text, id = text, value = text }) {
  let button = newBtn({
    text: text,
    id: id,
    value: value,
    className: "choice-element",
  });
  button.addEventListener("click", makeChoice);
  choiceList.appendChild(button);

  console.log(`Choice ${text} added`);
}

/**
 * Remove a specific choice from the choice list displayed
 * @param {String} id Id of the choice to remove
 */
function removeChoice(id) {
  let choices = document.getElementsByClassName("choice-element");
  let choice = choices[id];
  choiceList.removeChild(choice);
  console.log(`Choice ${choice.id} removed`);
}

function hideOverlay() {
  overlay.setAttribute("hidden", "");
  console.log("Overlay hidded");
}
function showOverlay() {
  overlay.removeAttribute("hidden");
  console.log("Overlay displayed");
}

function openChoiceList() {
  let choices = this.getAttribute("choices").split(";");
  choices.forEach((choice) => {
    addChoice({ text: choice });
  });
  showOverlay();
  console.log(`Choice list [${choices}] openned`);
}

function closeChoiceList() {
  choiceList.replaceChildren("");
  hideOverlay();
  console.log("Choice list closed");
}

/**
 *Reads the JSON file containing datas (lists choices)
 * @returns {Object}
 */
async function readJson() {
  let data;
  await fetch("choicelist.json")
    .then((response) => response.json())
    .then((json) => (data = json));
  return data;
}

btnCloseChoices.addEventListener("click", closeChoiceList);

// addChoiceBtn({ text: "Choice 1" });
// addChoiceBtn({ text: "Choice 2", choices: "premier choix;deuxieme choix" });
// showOverlay();
// hideOverlay();
//
// openChoiceList();
// closeChoiceList();
//
// addChoice({ text: "Banane", id: "ban" });
// addChoice({ text: "Ananas", value: "manger de la banane" });
// addChoice({ text: "Tomates" });
//
// removeChoice("ban");
// removeChoice("Ananas");
// removeChoice("Tomates");
