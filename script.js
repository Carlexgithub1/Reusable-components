readJson().then((data) => {
  for (list in data) {
    addChoiceBtn({ text: list, choices: data[list] });
  }
});
