const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const deleteButton = document.querySelector("[data-delete]");
const clearButton = document.querySelector("[data-clear]");
const previousElement = document.querySelector("[data-previous]");
const currentElement = document.querySelector("[data-current]");
const equalsButton = document.querySelector("[data-equals]");

class Calculator {
   constructor(previousElement, currentElement) {
      this.previousElement = previousElement;
      this.currentElement = currentElement;
      this.clear();
   }

   delete() {
      this.current = this.current.slice(0, -1);
      this.updateDisplay();
   }

   clear() {
      this.previous = "";
      this.current = "";
      this.operation = undefined;
      this.updateDisplay();
   }

   numberPressed(number) {
      if (number === "." && this.current.includes(".")) return;
      this.current += number.toString();
      this.updateDisplay();
   }

   operationPressed(operation) {
      if (this.current === "") return;
      if (this.previous !== "") this.compute();
      this.operation = operation;
      this.previous = this.current;
      this.current = "";
      this.updateDisplay();
   }

   compute() {
      const previous = parseFloat(this.previous);
      const current = parseFloat(this.current);
      if (isNaN(previous) || isNaN(current)) return;
      let result;
      switch (this.operation) {
         case "+":
            result = previous + current;
            break;
         case "-":
            result = previous - current;
            break;
         case "×":
            result = previous * current;
            break;
         case "÷":
            result = previous / current;
            break;
         default:
            return;
      }
      this.current = result;
      this.previous = "";
      this.operation = undefined;
      this.updateDisplay();
   }

   updateDisplay() {
      this.previousElement.innerText =
         this.previous + " " + (this.operation ?? "");
      this.currentElement.innerText = this.current;
   }
}

const calculator = new Calculator(previousElement, currentElement);

numberButtons.forEach((numberButton) => {
   numberButton.addEventListener("click", () => {
      calculator.numberPressed(numberButton.innerText);
   });
});

operationButtons.forEach((operationButton) => {
   operationButton.addEventListener("click", () => {
      calculator.operationPressed(operationButton.innerText);
   });
});

deleteButton.addEventListener("click", () => {
   calculator.delete();
});

clearButton.addEventListener("click", () => {
   calculator.clear();
});

equalsButton.addEventListener("click", () => {
   calculator.compute();
});
