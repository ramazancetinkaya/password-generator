# Password Generator Library

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.0-green.svg)](https://github.com/ramazancetinkaya/password-generator)

A powerful and secure password generator library with configurable options

## Features

- Generates random passwords with customizable length.
- Supports letters, numbers, and symbols in password generation.
- Uses cryptographic algorithms for strong password generation.
- Ensures the generated password meets the specified length.
- Exception handling for error scenarios.
- Optional feature to save all generated passwords to a ".txt" file.
- Follows modern PHP 8 features and adheres to coding standards.

## Screenshot

<img src="https://i.imgur.com/z2YRf7G.png">

## Usage

```php
// Example usage
$generator = new PasswordGenerator();
$generator->setConfig([
    'length' => 12,
    'useLetters' => true,
    'useNumbers' => true,
    'useSymbols' => true,
    'saveToFile' => true,
    'filename' => 'passwords.txt'
]);

try {
    $password = $generator->generatePassword();
    echo "Generated password: $password";
} catch (Exception $e) {
    echo "An error occurred: " . $e->getMessage();
}
```

## Contributing
Contributions are welcome! If you encounter any issues or have suggestions for improvements, please create an issue or submit a pull request. 
Make sure to follow the existing coding style and provide tests for your changes.

## License

This project is licensed under the [MIT] License - see the LICENSE.md file for details.

## Authors

**Ramazan Çetinkaya**
- <https://github.com/ramazancetinkaya>

## Copyright

Copyright (c) [2023] [Ramazan Çetinkaya]
