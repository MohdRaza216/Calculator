const display = document.getElementById("input");

function getDisplayed(input) {
    // Prevents entering multiple operators consecutively
    const lastChar = display.value.slice(-1);
    if (['+', '-', '*', '/'].includes(input) && ['+', '-', '*', '/'].includes(lastChar)) {
        return; // Ignore if last character is an operator
    }
    display.value += input;
}

function getCleared() {
    display.value = "";
}

function backspace() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        // Replace eval with Function constructor
        let result = Function('"use strict";return (' + display.value + ')')();
        
        // Check for finite result
        if (!isFinite(result)) throw new Error("Invalid operation");
        
        display.value = result;
    } catch (error) {
        display.value = "Error";
    }
}


// Optional: Keyboard Support
document.addEventListener('keydown', function(event) {
    const key = event.key;

    if (/\d/.test(key)) { // If key is a digit
        getDisplayed(key);
    } else if (['+', '-', '*', '/'].includes(key)) { // If key is an operator
        getDisplayed(key);
    } else if (key === 'Enter' || key === '=') { // If key is Enter or =
        calculate();
    } else if (key === 'Backspace') { // If key is Backspace
        backspace();
        event.preventDefault(); // Prevent default backspace behavior
    } else if (key === 'Escape') { // If key is Escape
        getCleared();
    } else if (key === '.') { // If key is decimal point
        getDisplayed('.');
    }
});
