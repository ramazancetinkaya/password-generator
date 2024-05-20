document.addEventListener('DOMContentLoaded', function() {
    const passwordDisplay = document.getElementById('password');
    const generateButton = document.querySelector('.generate-btn');
    const copyButton = document.getElementById('copy');
    const lengthInput = document.getElementById('length');
    const slider = document.getElementById('slider');
    const complexityRadios = document.querySelectorAll('input[name="complexity"]');
    const uppercaseCheckbox = document.getElementById('uppercase');
    const lowercaseCheckbox = document.getElementById('lowercase');
    const numbersCheckbox = document.getElementById('numbers');
    const symbolsCheckbox = document.getElementById('symbols');

    const UPPERCASE_CHAR_CODES = arrayFromLowToHigh(65, 90);
    const LOWERCASE_CHAR_CODES = arrayFromLowToHigh(97, 122);
    const NUMBER_CHAR_CODES = arrayFromLowToHigh(48, 57);
    const SYMBOL_CHAR_CODES = arrayFromLowToHigh(33, 47).concat(
        arrayFromLowToHigh(58, 64)
        ).concat(
        arrayFromLowToHigh(91, 96)
        ).concat(
        arrayFromLowToHigh(123, 126)
    );

    // Generate password event listener
    generateButton.addEventListener('click', generatePassword);

    // Copy password to clipboard event listener
    copyButton.addEventListener('click', copyToClipboard);

    // Update slider value
    slider.addEventListener('input', function() {
        lengthInput.value = slider.value;
    });

    // Update length input value
    lengthInput.addEventListener('input', function() {
        slider.value = lengthInput.value;
    });

    // Complexity radio buttons event listener
    complexityRadios.forEach(function(radio) {
        radio.addEventListener('change', function() {
            updateCheckboxes(this.value);
            generatePassword();
        });
    });

    // Checkbox event listeners
    [uppercaseCheckbox, lowercaseCheckbox, numbersCheckbox, symbolsCheckbox].forEach(function(checkbox) {
        checkbox.addEventListener('change', generatePassword);
    });

    // Generate Password function
    function generatePassword() {
        const length = lengthInput.value;
        let includeUppercase = uppercaseCheckbox.checked;
        let includeLowercase = lowercaseCheckbox.checked;
        let includeNumbers = numbersCheckbox.checked;
        let includeSymbols = symbolsCheckbox.checked;

        // Check that at least one character type is selected
        if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols) {
            alert('Please select at least one character type.');
            return;
        }

        const password = generateRandomPassword(length, includeUppercase, includeLowercase, includeNumbers, includeSymbols);
        passwordDisplay.value = password;
    }

    // Copy to clipboard function
    function copyToClipboard() {
        passwordDisplay.select();
        document.execCommand('copy');
        alert('Password copied to clipboard');
    }

    // Generate random password function
    function generateRandomPassword(length, includeUppercase, includeLowercase, includeNumbers, includeSymbols) {
        let charCodes = [];
        if (includeUppercase) charCodes = charCodes.concat(UPPERCASE_CHAR_CODES);
        if (includeLowercase) charCodes = charCodes.concat(LOWERCASE_CHAR_CODES);
        if (includeNumbers) charCodes = charCodes.concat(NUMBER_CHAR_CODES);
        if (includeSymbols) charCodes = charCodes.concat(SYMBOL_CHAR_CODES);

        const passwordCharacters = [];
        for (let i = 0; i < length; i++) {
            const characterCode = charCodes[Math.floor(Math.random() * charCodes.length)];
            passwordCharacters.push(String.fromCharCode(characterCode));
        }
        return passwordCharacters.join('');
    }

    // Helper function to generate array of character codes
    function arrayFromLowToHigh(low, high) {
        const array = [];
        for (let i = low; i <= high; i++) {
            array.push(i);
        }
        return array;
    }

    // Update checkboxes based on selected complexity
    function updateCheckboxes(complexity) {
        if (complexity === 'all') {
            uppercaseCheckbox.checked = true;
            lowercaseCheckbox.checked = true;
            numbersCheckbox.checked = true;
            symbolsCheckbox.checked = true;
            numbersCheckbox.disabled = false;
            symbolsCheckbox.disabled = false;
        } else if (complexity === 'easy-to-say') {
            uppercaseCheckbox.checked = true;
            lowercaseCheckbox.checked = true;
            numbersCheckbox.checked = false;
            symbolsCheckbox.checked = false;
            numbersCheckbox.disabled = true;
            symbolsCheckbox.disabled = true;
        } else if (complexity === 'easy-to-read') {
            uppercaseCheckbox.checked = true;
            lowercaseCheckbox.checked = true;
            numbersCheckbox.checked = false;
            symbolsCheckbox.checked = false;
            numbersCheckbox.disabled = false;
            symbolsCheckbox.disabled = false;
        }
    }
});
