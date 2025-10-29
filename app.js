const passwordInput = document.getElementById("password");
const copyButton = document.querySelector(".copy");
const lengthInput = document.getElementById("length");
const lengthText = document.getElementById("lengthtext");
const inputs = [...document.querySelectorAll('input:not([type="text"])')];

const symbols = ["@", "#", "$", "%"];
const numbers = [2, 3, 4, 5, 6, 7, 8, 9];
const similarNumbers = [0, 1];
const similarLowerCase = ["i", "l", "o"];
const similarUpperCase = ["I", "L", "O"];

const characterCodes = Array.from(Array(26)).map((_, i) => i + 97);

const lowerCaseLetters = characterCodes
  .map((code) => String.fromCharCode(code))
  .filter((char) => !similarLowerCase.includes(char));

const upperCaseLetters = lowerCaseLetters.map((letter) => letter.toUpperCase());

copyButton.addEventListener("click", () => {
  navigator.clipboard.writeText(passwordInput.value);
  copyButton.classList.add("copied");
  setTimeout(() => {
    copyButton.classList.remove("copied");
  }, 3000);
});

const updatePassword = () => {
  const length = lengthInput.value;

  lengthText.textContent = length;
  const checkboxValues = inputs.slice(1).map((input) => input.checked);

  const password = generate(length, ...checkboxValues);
  passwordInput.value = password;
};

inputs.forEach((inputsItem) =>
  inputsItem.addEventListener("input", updatePassword)
);

const generate = (
  lengthPassword,
  hasSymbols,
  hasNumbers,
  hasLowerCase,
  hasUpperCase,
  hasSimilar
) => {
  let avialableCharacters = [
    ...(hasSymbols ? symbols : []),
    ...(hasNumbers ? numbers : []),
    ...(hasLowerCase ? lowerCaseLetters : []),
    ...(hasUpperCase ? upperCaseLetters : []),
  ];

  if (hasSimilar) {
    if (hasNumbers) {
      avialableCharacters = [...avialableCharacters, ...similarNumbers];
    }
    if (hasLowerCase) {
      avialableCharacters = [...avialableCharacters, ...similarLowerCase];
    }
    if (hasUpperCase) {
      avialableCharacters = [...avialableCharacters, ...similarUpperCase];
    }
  }

  let password = "";

  if (avialableCharacters.length === 0) {
    return "";
  }

  for (let i = 0; i < lengthPassword; i++) {
    const randomIndex = Math.floor(Math.random() * avialableCharacters.length);
    password += avialableCharacters[randomIndex];
  }
  return password;
};

updatePassword();
