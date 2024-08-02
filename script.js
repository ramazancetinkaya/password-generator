document.addEventListener("DOMContentLoaded", function () {
    const passwordDisplay = document.getElementById("password");
    const generateButton = document.querySelector(".generate-btn");
    const copyButton = document.getElementById("copy");
    const lengthInput = document.getElementById("length");
    const slider = document.getElementById("slider");
    const complexityRadios = document.querySelectorAll(
      'input[name="complexity"]'
    );
    const uppercaseCheckbox = document.getElementById("uppercase");
    const lowercaseCheckbox = document.getElementById("lowercase");
    const numbersCheckbox = document.getElementById("numbers");
    const symbolsCheckbox = document.getElementById("symbols");
    const customPasswordInput = document.getElementById("customPassword");
    const strengthLevel = document.getElementById("strengthLevel");
  
    const CHAR_SETS = {
      UPPERCASE: arrayFromLowToHigh(65, 90),
      LOWERCASE: arrayFromLowToHigh(97, 122),
      NUMBERS: arrayFromLowToHigh(48, 57),
      SYMBOLS: [
        ...arrayFromLowToHigh(33, 47),
        ...arrayFromLowToHigh(58, 64),
        ...arrayFromLowToHigh(91, 96),
        ...arrayFromLowToHigh(123, 126),
      ],
    };
  
    // Generate password event listener
    generateButton.addEventListener("click", generatePassword);
  
    // Copy password to clipboard event listener
    copyButton.addEventListener("click", copyToClipboard);
  
    // Update slider and input value synchronously
    slider.addEventListener("input", () => syncLengthValues(slider.value));
    lengthInput.addEventListener("input", () =>
      syncLengthValues(lengthInput.value)
    );
  
    // Complexity radio buttons event listener
    complexityRadios.forEach((radio) => {
      radio.addEventListener("change", function () {
        updateCheckboxes(this.value);
        generatePassword();
      });
    });
  
    // Checkbox event listeners
    [
      uppercaseCheckbox,
      lowercaseCheckbox,
      numbersCheckbox,
      symbolsCheckbox,
    ].forEach((checkbox) => {
      checkbox.addEventListener("change", generatePassword);
    });
  
    // Custom password input event listener
    customPasswordInput.addEventListener("input", evaluatePasswordStrength);
  
    // Generate Password function
    function generatePassword() {
      const length = parseInt(lengthInput.value, 10);
      const options = {
        includeUppercase: uppercaseCheckbox.checked,
        includeLowercase: lowercaseCheckbox.checked,
        includeNumbers: numbersCheckbox.checked,
        includeSymbols: symbolsCheckbox.checked,
      };
  
      // Check that at least one character type is selected
      if (
        !options.includeUppercase &&
        !options.includeLowercase &&
        !options.includeNumbers &&
        !options.includeSymbols
      ) {
        alert("Please select at least one character type.");
        return;
      }
  
      const password = generateRandomPassword(length, options);
      passwordDisplay.value = password;
    }
  
    // Copy to clipboard function
    function copyToClipboard() {
      navigator.clipboard
        .writeText(passwordDisplay.value)
        .then(() => {
          alert("Password copied to clipboard");
        })
        .catch(() => {
          alert("Failed to copy password");
        });
    }
  
    // Generate random password function
    function generateRandomPassword(
      length,
      { includeUppercase, includeLowercase, includeNumbers, includeSymbols }
    ) {
      const charCodes = [
        ...(includeUppercase ? CHAR_SETS.UPPERCASE : []),
        ...(includeLowercase ? CHAR_SETS.LOWERCASE : []),
        ...(includeNumbers ? CHAR_SETS.NUMBERS : []),
        ...(includeSymbols ? CHAR_SETS.SYMBOLS : []),
      ];
  
      return Array.from({ length }, () => {
        const randomIndex = Math.floor(Math.random() * charCodes.length);
        return String.fromCharCode(charCodes[randomIndex]);
      }).join("");
    }
  
    // Helper function to generate array of character codes
    function arrayFromLowToHigh(low, high) {
      return Array.from({ length: high - low + 1 }, (_, i) => i + low);
    }
  
    // Update checkboxes based on selected complexity
    function updateCheckboxes(complexity) {
      const states = {
        all: {
          uppercase: true,
          lowercase: true,
          numbers: true,
          symbols: true,
          disableNumbers: false,
          disableSymbols: false,
        },
        "easy-to-say": {
          uppercase: true,
          lowercase: true,
          numbers: false,
          symbols: false,
          disableNumbers: true,
          disableSymbols: true,
        },
        "easy-to-read": {
          uppercase: true,
          lowercase: true,
          numbers: false,
          symbols: false,
          disableNumbers: false,
          disableSymbols: false,
        },
      };
  
      const state = states[complexity];
      uppercaseCheckbox.checked = state.uppercase;
      lowercaseCheckbox.checked = state.lowercase;
      numbersCheckbox.checked = state.numbers;
      symbolsCheckbox.checked = state.symbols;
      numbersCheckbox.disabled = state.disableNumbers;
      symbolsCheckbox.disabled = state.disableSymbols;
    }
  
    // Sync slider and numerical input values
    function syncLengthValues(value) {
      slider.value = value;
      lengthInput.value = value;
    }
  
    // Evaluate password strength
    function evaluatePasswordStrength() {
      const password = customPasswordInput.value;
      const strength = calculatePasswordStrength(password);
  
      // Remove any existing strength classes to avoid any bugs with leftover classes
      strengthLevel.classList.remove("strong", "medium", "weak");
  
      // Add new class based on strength
      strengthLevel.classList.add(strength.className);
  
      // Update the text content to reflect the strength level
      strengthLevel.textContent = strength.label;
    }
  
    // Calculate password strength
    function calculatePasswordStrength(password) {
      let score = 0;
      if (password.length >= 8) score++;
      if (/[A-Z]/.test(password)) score++;
      if (/[a-z]/.test(password)) score++;
      if (/[0-9]/.test(password)) score++;
      if (/[^A-Za-z0-9]/.test(password)) score++;
  
      if (password.length >= 12) score++; // Bonus for length
  
      if (score >= 5) {
        return { label: "Strong 😎", className: "strong" };
      } else if (score >= 3) {
        return { label: "Medium 😐", className: "medium" };
      } else {
        return { label: "Weak 😭", className: "weak" };
      }
    }
  });