<?php

/**
 * Password Generator Library
 *
 * A powerful and secure password generator library with configurable options.
 *
 * @category  Library
 * @package   PasswordGenerator
 * @author    Ramazan Çetinkaya
 * @license   MIT License <https://opensource.org/licenses/MIT>
 * @version   1.0.0
 * @link      https://github.com/ramazancetinkaya/password-generator
 */

class PasswordGenerator {
    private array $config;
    
    /**
     * Constructor.
     *
     * Initializes the PasswordGenerator with default configuration.
     */
    public function __construct() {
        $this->config = [
            'length' => 12,
            'useLetters' => true,
            'useNumbers' => true,
            'useSymbols' => true,
            'saveToFile' => false,
            'filename' => 'passwords.txt'
        ];
    }
    
    /**
     * Generates a random password based on the configuration settings.
     *
     * @return string The generated password.
     * @throws Exception If an error occurs during password generation.
     */
    public function generatePassword(): string {
        $password = '';
        
        if ($this->config['useLetters']) {
            $password .= $this->generateRandomLetters();
        }
        
        if ($this->config['useNumbers']) {
            $password .= $this->generateRandomNumbers();
        }
        
        if ($this->config['useSymbols']) {
            $password .= $this->generateRandomSymbols();
        }
        
        $password = $this->shufflePassword($password);
        
        if (strlen($password) < $this->config['length']) {
            throw new Exception('Generated password is shorter than the required length.');
        }
        
        $password = substr($password, 0, $this->config['length']);
        
        if ($this->config['saveToFile']) {
            $this->savePasswordToFile($password);
        }
        
        return $password;
    }
    
    /**
     * Generates random letters for the password.
     *
     * @return string Random letters.
     */
    private function generateRandomLetters(): string {
        $letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        return $this->generateRandomString($letters);
    }
    
    /**
     * Generates random numbers for the password.
     *
     * @return string Random numbers.
     */
    private function generateRandomNumbers(): string {
        $numbers = '0123456789';
        return $this->generateRandomString($numbers);
    }
    
    /**
     * Generates random symbols for the password.
     *
     * @return string Random symbols.
     */
    private function generateRandomSymbols(): string {
        $symbols = '!@#$%^&*()';
        return $this->generateRandomString($symbols);
    }
    
    /**
     * Generates a random string of the specified length.
     *
     * @param string $characters The characters to choose from.
     * @return string The generated random string.
     */
    private function generateRandomString(string $characters): string {
        $length = strlen($characters);
        $randomString = '';
        
        for ($i = 0; $i < $this->config['length']; $i++) {
            $randomString .= $characters[random_int(0, $length - 1)];
        }
        
        return $randomString;
    }
    
    /**
     * Shuffles the characters in the password.
     *
     * @param string $password The password to shuffle.
     * @return string The shuffled password.
     */
    private function shufflePassword(string $password): string {
        $passwordArray = str_split($password);
        shuffle($passwordArray);
        return implode('', $passwordArray);
    }
    
    /**
     * Saves the generated password to a file.
     *
     * @param string $password The password to save.
     * @throws Exception If the file cannot be opened or written to.
     */
    private function savePasswordToFile(string $password): void {
        $filename = $this->config['filename'];
        $file = fopen($filename, 'a');
        
        if ($file === false) {
            throw new Exception('Could not open the password file for writing.');
        }
        
        $timestamp = date('Y-m-d H:i:s');
        $data = "Password: $password | Generated at: $timestamp" . PHP_EOL;
        
        if (fwrite($file, $data) === false) {
            throw new Exception('Could not write the password to the file.');
        }
        
        fclose($file);
    }
    
    /**
     * Sets the configuration options for the password generator.
     *
     * @param array $options The configuration options.
     */
    public function setConfig(array $options): void {
        $this->config = array_merge($this->config, $options);
    }
}
