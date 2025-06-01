document.addEventListener("DOMContentLoaded", function () {
  // Word lists for passphrase generation
  const wordLists = {
    common: [
      "apple",
      "banana",
      "cherry",
      "date",
      "elephant",
      "frog",
      "giraffe",
      "horse",
      "igloo",
      "jaguar",
      "koala",
      "lemon",
      "monkey",
      "nugget",
      "orange",
      "panda",
      "quartz",
      "rabbit",
      "sunset",
      "tiger",
      "umbrella",
      "violet",
      "whisper",
      "xylophone",
      "yellow",
      "zebra",
      "acorn",
      "bridge",
      "candle",
      "dolphin",
      "echo",
      "feather",
      "garden",
      "harbor",
      "island",
      "jungle",
      "kettle",
      "lantern",
      "meadow",
      "nectar",
      "ocean",
      "planet",
      "quarry",
      "river",
      "sapphire",
      "thunder",
      "unicorn",
      "valley",
      "window",
      "yarn",
    ],
    eff: [
      "abacus",
      "anthem",
      "azure",
      "bagpipe",
      "bamboo",
      "bronze",
      "canyon",
      "cascade",
      "citrus",
      "crimson",
      "diamond",
      "embark",
      "enigma",
      "fable",
      "galaxy",
      "gossip",
      "hazel",
      "iceberg",
      "jasmine",
      "jubilee",
      "karma",
      "limbo",
      "magma",
      "navigate",
      "nebula",
      "obsidian",
      "oyster",
      "pajama",
      "pixel",
      "plaza",
      "quasar",
      "raven",
      "ruby",
      "saffron",
      "sandal",
      "tactic",
      "tundra",
      "utility",
      "vacation",
      "velvet",
      "voyage",
      "walnut",
      "western",
      "wisdom",
      "wombat",
      "yoga",
      "yogurt",
      "zenith",
      "zephyr",
      "zodiac",
    ],
    diceware: [
      "aardvark",
      "bacon",
      "cadet",
      "daemon",
      "eagle",
      "falcon",
      "gadget",
      "halibut",
      "ibex",
      "jackal",
      "kabob",
      "lagoon",
      "maestro",
      "nacho",
      "oblong",
      "phoenix",
      "quail",
      "radar",
      "sable",
      "taco",
      "umpire",
      "vortex",
      "waffle",
      "xerox",
      "yahoo",
      "zucchini",
      "atlas",
      "basket",
      "cabin",
      "dagger",
      "earwig",
      "fantasy",
      "galaxy",
      "hammer",
      "indoor",
      "javelin",
      "keyhole",
      "laptop",
      "magnet",
      "noodle",
      "octopus",
      "pancake",
      "quantum",
      "raccoon",
      "sausage",
      "teapot",
      "upward",
      "vagabond",
      "weasel",
      "xylophone",
    ],
    bip39: [
      "absent",
      "acid",
      "actor",
      "affair",
      "airport",
      "alarm",
      "alcohol",
      "alien",
      "alpha",
      "among",
      "amount",
      "analyst",
      "anchor",
      "ancient",
      "anger",
      "animal",
      "ankle",
      "answer",
      "antenna",
      "antique",
      "anxiety",
      "apart",
      "apology",
      "appear",
      "approve",
      "arctic",
      "area",
      "arena",
      "argue",
      "armor",
      "army",
      "arrange",
      "arrest",
      "arrive",
      "arrow",
      "art",
      "asthma",
      "athlete",
      "atom",
      "attack",
      "auction",
      "audit",
      "august",
      "aunt",
      "author",
      "auto",
      "autumn",
      "average",
      "avocado",
      "aware",
    ],
  };

  // DOM elements
  const tabs = document.querySelectorAll(".tab");
  const tabContents = document.querySelectorAll(".tab-content");
  const passwordResult = document.getElementById("password-result");
  const pinResult = document.getElementById("pin-result");
  const passphraseResult = document.getElementById("passphrase-result");
  const generatePasswordBtn = document.getElementById("generate-password-btn");
  const generatePinBtn = document.getElementById("generate-pin-btn");
  const generatePassphraseBtn = document.getElementById(
    "generate-passphrase-btn"
  );
  const passwordCopyBtn = document.getElementById("password-copy-btn");
  const pinCopyBtn = document.getElementById("pin-copy-btn");
  const passphraseCopyBtn = document.getElementById("passphrase-copy-btn");
  const passwordCustomOptions = document.getElementById(
    "password-custom-options"
  );
  const passwordLength = document.getElementById("password-length");
  const passwordLengthValue = document.getElementById("password-length-value");
  const wordsCount = document.getElementById("words-count");
  const wordsCountValue = document.getElementById("words-count-value");
  const passwordStrengthProgress = document.getElementById(
    "password-strength-progress"
  );
  const passwordStrengthValue = document.getElementById(
    "password-strength-value"
  );
  const passwordEntropy = document.getElementById("password-entropy");
  const passwordCrackTime = document.getElementById("password-crack-time");
  const pinStrengthProgress = document.getElementById("pin-strength-progress");
  const pinStrengthValue = document.getElementById("pin-strength-value");
  const pinAttackResistance = document.getElementById("pin-attack-resistance");
  const pinBruteForce = document.getElementById("pin-brute-force");
  const passphraseStrengthProgress = document.getElementById(
    "passphrase-strength-progress"
  );
  const passphraseStrengthValue = document.getElementById(
    "passphrase-strength-value"
  );
  const passphraseEntropy = document.getElementById("passphrase-entropy");
  const passphraseUniqueness = document.getElementById("passphrase-uniqueness");
  const passwordAlgorithmOptions = document.querySelectorAll(
    "#password-tab .algorithm-option"
  );
  const pinAlgorithmOptions = document.querySelectorAll(
    "#pin-tab .algorithm-option"
  );
  const pinOptions = document.querySelectorAll(".pin-option");
  const includeUppercase = document.getElementById("include-uppercase");
  const includeLowercase = document.getElementById("include-lowercase");
  const includeNumbers = document.getElementById("include-numbers");
  const includeSymbols = document.getElementById("include-symbols");
  const excludeSimilar = document.getElementById("exclude-similar");
  const excludeAmbiguous = document.getElementById("exclude-ambiguous");
  const wordList = document.getElementById("word-list");
  const separator = document.getElementById("separator");
  const capitalizeFirst = document.getElementById("capitalize-first");
  const addNumber = document.getElementById("add-number");
  const addSymbol = document.getElementById("add-symbol");
  const toaster = document.getElementById("toaster");

  // State variables
  let currentPasswordAlgorithm = "standard";
  let currentPinAlgorithm = "random";
  let currentPinLength = 4;

  // Tab switching
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tabContents.forEach((tc) => tc.classList.remove("active"));
      tab.classList.add("active");
      document.getElementById(`${tab.dataset.tab}-tab`).classList.add("active");
    });
  });

  // Password algorithm selection
  passwordAlgorithmOptions.forEach((option) => {
    option.addEventListener("click", () => {
      passwordAlgorithmOptions.forEach((o) => o.classList.remove("active"));
      option.classList.add("active");
      currentPasswordAlgorithm = option.dataset.algorithm;

      // Show/hide custom options
      if (currentPasswordAlgorithm === "custom") {
        passwordCustomOptions.classList.add("visible");
      } else {
        passwordCustomOptions.classList.remove("visible");

        // Set predefined lengths
        if (currentPasswordAlgorithm === "standard") {
          passwordLength.value = 12;
        } else if (currentPasswordAlgorithm === "balanced") {
          passwordLength.value = 16;
        } else if (currentPasswordAlgorithm === "secure") {
          passwordLength.value = 24;
        }

        passwordLengthValue.textContent = passwordLength.value;
      }
    });
  });

  // PIN algorithm selection
  pinAlgorithmOptions.forEach((option) => {
    option.addEventListener("click", () => {
      pinAlgorithmOptions.forEach((o) => o.classList.remove("active"));
      option.classList.add("active");
      currentPinAlgorithm = option.dataset.algorithm;
    });
  });

  // PIN length selection
  pinOptions.forEach((option) => {
    option.addEventListener("click", () => {
      pinOptions.forEach((o) => o.classList.remove("active"));
      option.classList.add("active");
      currentPinLength = parseInt(option.dataset.pinLength);
    });
  });

  // Password length slider
  passwordLength.addEventListener("input", () => {
    passwordLengthValue.textContent = passwordLength.value;
  });

  // Words count slider
  wordsCount.addEventListener("input", () => {
    wordsCountValue.textContent = wordsCount.value;
  });

  // Password generation
  function generatePassword() {
    let length,
      includeUpper,
      includeLower,
      includeNum,
      includeSym,
      excludeSim,
      excludeAmb;

    // Set parameters based on algorithm
    if (currentPasswordAlgorithm === "standard") {
      length = 12;
      includeUpper = true;
      includeLower = true;
      includeNum = true;
      includeSym = true;
      excludeSim = false;
      excludeAmb = false;
    } else if (currentPasswordAlgorithm === "balanced") {
      length = 16;
      includeUpper = true;
      includeLower = true;
      includeNum = true;
      includeSym = true;
      excludeSim = false;
      excludeAmb = false;
    } else if (currentPasswordAlgorithm === "secure") {
      length = 24;
      includeUpper = true;
      includeLower = true;
      includeNum = true;
      includeSym = true;
      excludeSim = false;
      excludeAmb = false;
    } else {
      // custom
      length = parseInt(passwordLength.value);
      includeUpper = includeUppercase.checked;
      includeLower = includeLowercase.checked;
      includeNum = includeNumbers.checked;
      includeSym = includeSymbols.checked;
      excludeSim = excludeSimilar.checked;
      excludeAmb = excludeAmbiguous.checked;
    }

    // Ensure at least one character type is selected
    if (!includeUpper && !includeLower && !includeNum && !includeSym) {
      showToast("Please select at least one character type", "error");
      return;
    }

    let charset = "";
    let upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let lowerChars = "abcdefghijklmnopqrstuvwxyz";
    let numChars = "0123456789";
    let symChars = "!@#$%^&*()-_=+[]{}|;:,.<>?/";

    // Remove similar characters if selected
    if (excludeSim) {
      upperChars = upperChars.replace(/[IL]/g, "");
      lowerChars = lowerChars.replace(/[il]/g, "");
      numChars = numChars.replace(/[10]/g, "");
    }

    // Remove ambiguous symbols if selected
    if (excludeAmb) {
      symChars = symChars.replace(/[\[\]{}()<>\/\\]/g, "");
    }

    if (includeUpper) charset += upperChars;
    if (includeLower) charset += lowerChars;
    if (includeNum) charset += numChars;
    if (includeSym) charset += symChars;

    let password = "";
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;

    // Algorithm-specific generation logic
    if (currentPasswordAlgorithm === "secure") {
      // Secure algorithm uses cryptographically secure random values
      const array = new Uint8Array(length);
      window.crypto.getRandomValues(array);

      for (let i = 0; i < length; i++) {
        const randomIndex = array[i] % charset.length;
        const char = charset[randomIndex];
        password += char;

        if (upperChars.includes(char)) hasUpper = true;
        if (lowerChars.includes(char)) hasLower = true;
        if (numChars.includes(char)) hasNum = true;
        if (symChars.includes(char)) hasSym = true;
      }

      // Ensure all required character types are included
      const missingTypes = [];
      if (includeUpper && !hasUpper) missingTypes.push("upper");
      if (includeLower && !hasLower) missingTypes.push("lower");
      if (includeNum && !hasNum) missingTypes.push("num");
      if (includeSym && !hasSym) missingTypes.push("sym");

      // Replace random characters with missing types
      if (missingTypes.length > 0) {
        const positions = [];
        const array = new Uint8Array(missingTypes.length);
        window.crypto.getRandomValues(array);

        for (let i = 0; i < missingTypes.length; i++) {
          positions.push(array[i] % length);
        }

        for (let i = 0; i < missingTypes.length; i++) {
          let char;
          if (missingTypes[i] === "upper") {
            char = upperChars[array[i] % upperChars.length];
          } else if (missingTypes[i] === "lower") {
            char = lowerChars[array[i] % lowerChars.length];
          } else if (missingTypes[i] === "num") {
            char = numChars[array[i] % numChars.length];
          } else if (missingTypes[i] === "sym") {
            char = symChars[array[i] % symChars.length];
          }

          const pos = positions[i];
          password =
            password.substring(0, pos) + char + password.substring(pos + 1);
        }
      }
    } else {
      // Standard and Balanced algorithms
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        const char = charset[randomIndex];
        password += char;

        if (upperChars.includes(char)) hasUpper = true;
        if (lowerChars.includes(char)) hasLower = true;
        if (numChars.includes(char)) hasNum = true;
        if (symChars.includes(char)) hasSym = true;
      }

      // For balanced and standard, ensure required character types
      if (
        (includeUpper && !hasUpper) ||
        (includeLower && !hasLower) ||
        (includeNum && !hasNum) ||
        (includeSym && !hasSym)
      ) {
        // Retry if not all required types are present
        return generatePassword();
      }
    }

    passwordResult.value = password;
    updatePasswordStrength(password);
  }

  // PIN generation
  function generatePIN() {
    let pin = "";

    if (currentPinAlgorithm === "random") {
      // Simple random algorithm
      for (let i = 0; i < currentPinLength; i++) {
        pin += Math.floor(Math.random() * 10);
      }
    } else {
      // secure
      // Use crypto.getRandomValues for more secure randomness
      const array = new Uint8Array(currentPinLength);
      window.crypto.getRandomValues(array);

      // Avoid common patterns and ensure uniqueness for secure PINs
      const usedDigits = new Set();
      let prevDigit = -1;

      for (let i = 0; i < currentPinLength; i++) {
        let digit = array[i] % 10;

        // Avoid repeating the same digit consecutively
        while (digit === prevDigit) {
          const newArray = new Uint8Array(1);
          window.crypto.getRandomValues(newArray);
          digit = newArray[0] % 10;
        }

        // For 4-digit PIN, try to avoid using the same digit more than once
        if (
          currentPinLength === 4 &&
          usedDigits.has(digit) &&
          usedDigits.size < 9
        ) {
          const newArray = new Uint8Array(1);
          window.crypto.getRandomValues(newArray);
          digit = newArray[0] % 10;
          while (usedDigits.has(digit)) {
            window.crypto.getRandomValues(newArray);
            digit = newArray[0] % 10;
          }
        }

        usedDigits.add(digit);
        prevDigit = digit;
        pin += digit;
      }

      // Avoid sequential patterns (e.g., 1234, 5678)
      if (currentPinLength === 4) {
        const isSequential =
          (pin[0] == parseInt(pin[1]) - 1 &&
            pin[1] == parseInt(pin[2]) - 1 &&
            pin[2] == parseInt(pin[3]) - 1) ||
          (pin[0] == parseInt(pin[1]) + 1 &&
            pin[1] == parseInt(pin[2]) + 1 &&
            pin[2] == parseInt(pin[3]) + 1);

        if (isSequential) {
          return generatePIN(); // Regenerate
        }
      }

      // Avoid common PINs like 1111, 1234, 0000, etc.
      const commonPins4 = [
        "1234",
        "0000",
        "1111",
        "2222",
        "3333",
        "4444",
        "5555",
        "6666",
        "7777",
        "8888",
        "9999",
        "1212",
        "1313",
      ];
      const commonPins6 = [
        "123456",
        "000000",
        "111111",
        "222222",
        "333333",
        "444444",
        "555555",
        "666666",
        "777777",
        "888888",
        "999999",
        "121212",
        "131313",
      ];

      if (
        (currentPinLength === 4 && commonPins4.includes(pin)) ||
        (currentPinLength === 6 && commonPins6.includes(pin))
      ) {
        return generatePIN(); // Regenerate
      }
    }

    pinResult.value = pin;
    updatePINStrength(pin);
  }

  // Passphrase generation
  function generatePassphrase() {
    const selectedWordList = wordLists[wordList.value];
    const numWords = parseInt(wordsCount.value);
    const sep = separator.value;
    const capFirst = capitalizeFirst.checked;
    const includeNumber = addNumber.checked;
    const includeSymbol = addSymbol.checked;

    let passphrase = "";
    const selectedWords = [];

    // Generate crypto-secure random indexes for word selection
    const array = new Uint8Array(numWords * 2); // Get extra values for uniqueness check
    window.crypto.getRandomValues(array);

    // Select words, ensuring no duplicates
    for (let i = 0; i < numWords; i++) {
      let index = array[i] % selectedWordList.length;
      let word = selectedWordList[index];

      // Try to avoid duplicates
      if (
        selectedWords.includes(word) &&
        selectedWords.length < selectedWordList.length
      ) {
        index = array[i + numWords] % selectedWordList.length;
        word = selectedWordList[index];

        // If still duplicate, try one more time with different method
        if (selectedWords.includes(word)) {
          const newArray = new Uint8Array(1);
          window.crypto.getRandomValues(newArray);
          index = newArray[0] % selectedWordList.length;
          word = selectedWordList[index];
        }
      }

      if (capFirst) {
        word = word.charAt(0).toUpperCase() + word.slice(1);
      }

      selectedWords.push(word);
    }

    passphrase = selectedWords.join(sep);

    // Add random number if selected
    if (includeNumber) {
      const numArray = new Uint8Array(2);
      window.crypto.getRandomValues(numArray);
      const randomNum = (numArray[0] % 10) * 10 + (numArray[1] % 10); // 0-99
      passphrase += randomNum;
    }

    // Add random symbol if selected
    if (includeSymbol) {
      const symbols = "!@#$%^&*()-_=+[]{}|;:,.<>?/";
      const symArray = new Uint8Array(1);
      window.crypto.getRandomValues(symArray);
      passphrase += symbols[symArray[0] % symbols.length];
    }

    passphraseResult.value = passphrase;
    updatePassphraseStrength(passphrase, numWords, selectedWordList.length);
  }

  // Copy to clipboard functions
  function copyToClipboard(text, type) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        showToast(`${type} copied to clipboard`, "success");
      })
      .catch((err) => {
        showToast("Failed to copy to clipboard", "error");
      });
  }

  // Toast notification system
  function showToast(message, type = "info") {
    const toast = document.createElement("div");
    toast.classList.add("toast", `toast-${type}`);

    let icon;
    switch (type) {
      case "success":
        icon = "fa-check-circle";
        break;
      case "error":
        icon = "fa-exclamation-circle";
        break;
      case "warning":
        icon = "fa-exclamation-triangle";
        break;
      default:
        icon = "fa-info-circle";
    }

    toast.innerHTML = `
                    <i class="fas ${icon}"></i>
                    <span>${message}</span>
                `;

    toaster.appendChild(toast);

    // Trigger reflow
    toast.offsetHeight;

    // Show toast
    setTimeout(() => {
      toast.classList.add("show");
    }, 10);

    // Remove toast after delay
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 3000);

    // Click to dismiss
    toast.addEventListener("click", () => {
      toast.classList.remove("show");
      setTimeout(() => {
        toast.remove();
      }, 300);
    });
  }

  // Calculate password strength
  function updatePasswordStrength(password) {
    if (!password) {
      resetPasswordStrength();
      return;
    }

    let entropy = calculatePasswordEntropy(password);
    let strength = getStrengthLevel(entropy);
    let crackTime = estimateCrackTime(entropy);

    // Update UI
    passwordEntropy.textContent = `${entropy.toFixed(2)} bits`;
    passwordCrackTime.textContent = crackTime;
    passwordStrengthValue.textContent = strength.label;
    passwordStrengthValue.style.backgroundColor = strength.color;
    passwordStrengthProgress.style.width = `${Math.min(
      100,
      (entropy / 128) * 100
    )}%`;
    passwordStrengthProgress.style.backgroundColor = strength.color;
  }

  // Calculate PIN strength
  function updatePINStrength(pin) {
    if (!pin) {
      resetPINStrength();
      return;
    }

    // Different algorithms for 4 and 6 digits
    if (pin.length === 4) {
      const combinations = 10000;
      const attackResistance =
        currentPinAlgorithm === "secure"
          ? "Resistant to simple guessing attacks"
          : "Vulnerable to targeted attacks";
      const color = currentPinAlgorithm === "secure" ? "#f39c12" : "#e74c3c";
      const percentage = currentPinAlgorithm === "secure" ? 30 : 15;

      pinAttackResistance.textContent = attackResistance;
      pinBruteForce.textContent = formatNumber(combinations) + " combinations";
      pinStrengthValue.textContent =
        currentPinAlgorithm === "secure" ? "Basic" : "Minimal";
      pinStrengthValue.style.backgroundColor = color;
      pinStrengthProgress.style.width = `${percentage}%`;
      pinStrengthProgress.style.backgroundColor = color;
    } else {
      // 6 digits
      const combinations = 1000000;
      const attackResistance =
        currentPinAlgorithm === "secure"
          ? "Resistant to most common guessing attacks"
          : "May be vulnerable to targeted attacks";
      const color = currentPinAlgorithm === "secure" ? "#2ecc71" : "#f39c12";
      const percentage = currentPinAlgorithm === "secure" ? 60 : 40;

      pinAttackResistance.textContent = attackResistance;
      pinBruteForce.textContent = formatNumber(combinations) + " combinations";
      pinStrengthValue.textContent =
        currentPinAlgorithm === "secure" ? "Moderate" : "Basic";
      pinStrengthValue.style.backgroundColor = color;
      pinStrengthProgress.style.width = `${percentage}%`;
      pinStrengthProgress.style.backgroundColor = color;
    }
  }

  // Calculate passphrase strength
  function updatePassphraseStrength(passphrase, numWords, dictionarySize) {
    if (!passphrase) {
      resetPassphraseStrength();
      return;
    }

    // Base entropy calculation for word selection
    let baseEntropy = numWords * Math.log2(dictionarySize);

    // Factors that influence total entropy
    const useCapitalization = capitalizeFirst.checked;
    const useNumber = addNumber.checked;
    const useSymbol = addSymbol.checked;
    const separatorEntropy = separator.value === " " ? 0 : Math.log2(10); // 10 different separators

    // Additional entropy from options
    let additionalEntropy = 0;

    // Capitalization adds 1 bit per word (2 options per word)
    if (useCapitalization) {
      additionalEntropy += numWords * 1;
    }

    // Number adds ~6.64 bits (100 options)
    if (useNumber) {
      additionalEntropy += Math.log2(100);
    }

    // Symbol adds ~4.7 bits (26 symbols)
    if (useSymbol) {
      additionalEntropy += Math.log2(26);
    }

    // Separator adds entropy only if not using space (default)
    additionalEntropy += separatorEntropy;

    // Total entropy
    const totalEntropy = baseEntropy + additionalEntropy;

    // Uniqueness (possible combinations)
    const uniqueness = Math.pow(2, totalEntropy);

    // Calculate strength
    let strength = getStrengthLevel(totalEntropy);

    // Update UI
    passphraseEntropy.textContent = `${totalEntropy.toFixed(2)} bits`;
    passphraseUniqueness.textContent = `1 in ${formatExponential(uniqueness)}`;
    passphraseStrengthValue.textContent = strength.label;
    passphraseStrengthValue.style.backgroundColor = strength.color;
    passphraseStrengthProgress.style.width = `${Math.min(
      100,
      (totalEntropy / 128) * 100
    )}%`;
    passphraseStrengthProgress.style.backgroundColor = strength.color;
  }

  // Reset strength indicators
  function resetPasswordStrength() {
    passwordEntropy.textContent = "-";
    passwordCrackTime.textContent = "-";
    passwordStrengthValue.textContent = "-";
    passwordStrengthValue.style.backgroundColor = "";
    passwordStrengthProgress.style.width = "0";
  }

  function resetPINStrength() {
    pinAttackResistance.textContent = "-";
    pinBruteForce.textContent = "-";
    pinStrengthValue.textContent = "-";
    pinStrengthValue.style.backgroundColor = "";
    pinStrengthProgress.style.width = "0";
  }

  function resetPassphraseStrength() {
    passphraseEntropy.textContent = "-";
    passphraseUniqueness.textContent = "-";
    passphraseStrengthValue.textContent = "-";
    passphraseStrengthValue.style.backgroundColor = "";
    passphraseStrengthProgress.style.width = "0";
  }

  // Helper functions
  function calculatePasswordEntropy(password) {
    let charset = 0;

    // Calculate charset size
    if (/[a-z]/.test(password)) charset += 26;
    if (/[A-Z]/.test(password)) charset += 26;
    if (/[0-9]/.test(password)) charset += 10;
    if (/[^a-zA-Z0-9]/.test(password)) charset += 33;

    // Calculate entropy
    return Math.log2(Math.pow(charset, password.length));
  }

  function getStrengthLevel(entropy) {
    if (entropy < 28) {
      return { label: "Very Weak", color: "#e74c3c" };
    } else if (entropy < 36) {
      return { label: "Weak", color: "#e67e22" };
    } else if (entropy < 60) {
      return { label: "Moderate", color: "#f39c12" };
    } else if (entropy < 80) {
      return { label: "Strong", color: "#2ecc71" };
    } else if (entropy < 100) {
      return { label: "Very Strong", color: "#27ae60" };
    } else if (entropy < 128) {
      return { label: "Excellent", color: "#16a085" };
    } else {
      return { label: "Unbreakable", color: "#2980b9" };
    }
  }

  function estimateCrackTime(entropy) {
    // Assume 10 trillion guesses per second for a sophisticated attacker with dedicated hardware
    const guessesPerSecond = 10000000000000;
    const seconds = Math.pow(2, entropy) / guessesPerSecond / 2; // Divide by 2 for average case

    return formatTime(seconds);
  }

  function formatTime(seconds) {
    if (seconds < 60) {
      return "Instantly";
    } else if (seconds < 3600) {
      return `${Math.floor(seconds / 60)} minutes`;
    } else if (seconds < 86400) {
      return `${Math.floor(seconds / 3600)} hours`;
    } else if (seconds < 2592000) {
      return `${Math.floor(seconds / 86400)} days`;
    } else if (seconds < 31536000) {
      return `${Math.floor(seconds / 2592000)} months`;
    } else if (seconds < 315360000) {
      // 10 years
      return `${Math.floor(seconds / 31536000)} years`;
    } else if (seconds < 3153600000) {
      // 100 years
      return `${Math.floor(seconds / 31536000)} years`;
    } else {
      return "Centuries";
    }
  }

  function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function formatExponential(num) {
    // Define thresholds and labels for human-readable numbers
    const thresholds = [
      { value: 1e3, label: "thousand" },
      { value: 1e6, label: "million" },
      { value: 1e9, label: "billion" },
      { value: 1e12, label: "trillion" },
      { value: 1e15, label: "quadrillion" },
      { value: 1e18, label: "quintillion" },
      { value: 1e21, label: "sextillion" },
      { value: 1e24, label: "septillion" },
      { value: 1e27, label: "octillion" },
      { value: 1e30, label: "nonillion" },
      { value: 1e33, label: "decillion" },
      { value: 1e36, label: "undecillion" },
      { value: 1e39, label: "duodecillion" },
      { value: 1e42, label: "tredecillion" },
      { value: 1e45, label: "quattuordecillion" },
      { value: 1e48, label: "quindecillion" },
      { value: 1e51, label: "sexdecillion" },
      { value: 1e54, label: "septendecillion" },
      { value: 1e57, label: "octodecillion" },
      { value: 1e60, label: "novemdecillion" },
      { value: 1e63, label: "vigintillion" },
    ];

    // If number is less than 1000, just format it
    if (num < 1e3) {
      return formatNumber(Math.round(num));
    }

    // Find the appropriate threshold
    for (let i = thresholds.length - 1; i >= 0; i--) {
      if (num >= thresholds[i].value) {
        // Calculate how many of this unit
        const value = num / thresholds[i].value;
        // Round to 2 decimal places
        const roundedValue = Math.round(value * 100) / 100;

        // Format as "X million" or "X.XX million"
        if (roundedValue === Math.floor(roundedValue)) {
          return `${roundedValue} ${thresholds[i].label}`;
        } else {
          return `${roundedValue.toFixed(2)} ${thresholds[i].label}`;
        }
      }
    }

    // Fallback for extremely large numbers
    const exp = Math.floor(Math.log10(num));
    return `10^${exp}`;
  }

  // Event Listeners
  generatePasswordBtn.addEventListener("click", generatePassword);
  generatePinBtn.addEventListener("click", generatePIN);
  generatePassphraseBtn.addEventListener("click", generatePassphrase);

  passwordCopyBtn.addEventListener("click", () => {
    if (passwordResult.value) {
      copyToClipboard(passwordResult.value, "Password");
    }
  });

  pinCopyBtn.addEventListener("click", () => {
    if (pinResult.value) {
      copyToClipboard(pinResult.value, "PIN");
    }
  });

  passphraseCopyBtn.addEventListener("click", () => {
    if (passphraseResult.value) {
      copyToClipboard(passphraseResult.value, "Passphrase");
    }
  });

  // Initialize with defaults
  generatePassword();
  generatePIN();
  generatePassphrase();
});
