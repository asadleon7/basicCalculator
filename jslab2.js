class Calculator {
    constructor(primaryDislay, secondaryDisplay, operatorDisplay) { 
        this.primaryDislay = primaryDislay
        this.secondaryDisplay = secondaryDisplay
        this.operatorDisplay= operatorDisplay
        this.clear()
    }
    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.currentOperator= ''
        this.secondaryDisplay.innerText = ''
        this.operation = undefined
        
    }
    delete() { 
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
      if (number == '+' || number == '-'|| number == '*'|| number == '/')  
          this.currentOperand = number
      else
          this.currentOperand = this.currentOperand+ number

    }
   appendOperator(operator) {
     
        this.currentOperator = this.currentOperator+ operator
    }
    
    displayOneUpdate() { 
        this.primaryDislay.innerText = this.currentOperand
    }
   
    displayTwoUpdate() { 
        this.secondaryDisplay.innerText = this.primaryDislay.innerText
       this.currentOperand = ''
    }
    signDisplay() {
        this.operatorDisplay.innerText = this.currentOperator
         
    }
    bothDisplayCheck() {
        if (this.secondaryDisplay.innerText != '' && this.primaryDislay.innerText != '') {
            return true
        }
        return false
    }
     calculate() {
        let operator = this.currentOperator;
        let disp2 = this.secondaryDisplay.innerText
        let disp1 = this.currentOperand
        switch (operator) {
            case '+':
                this.secondaryDisplay.innerText = +disp2 + +disp1
                answer = +disp2 + +disp1
                break;
            case '-':
                this.secondaryDisplay.innerText = +disp2 - +disp1
                break;
            case '*':
                this.secondaryDisplay.innerText = +disp2 * +disp1
                break;
            case '/':
                this.secondaryDisplay.innerText = +disp2 / +disp1
                break;
        }
        
         this.currentOperand = ''
         this.currentOperator = ''
     }
    
    
}
let answer = 0
let isAnswer = false
let isSignFirstTime = true
let isNumAppend = false
let signCount = 0
let isSecondaryDisplay = false
let isPrimaryDisplay = false
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const allClearButton = document.querySelector('[data-all-clear]')
const deleteButton = document.querySelector('[data-delete]')
const equalsButton = document.querySelector('[data-equal]')
const primaryDislay = document.querySelector('[data-current-operand]')
const secondaryDisplay = document.querySelector('[data-previous-operand]')
const operatorDisplay = document.querySelector('[data-operation-display]')

const calculator = new Calculator(primaryDislay, secondaryDisplay, operatorDisplay)

numberButtons.forEach(button => {
    button.addEventListener('click', () => { 
        isSignFirstTime = false
    
        signCount = 0
        calculator.appendNumber(button.innerText)
        isNumAppend = true
        calculator.displayOneUpdate()
    })    
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => { 
        
        
        signCount++      
        console.log('sign count ' +signCount)
        let sign = button.innerText
      
        if (calculator.bothDisplayCheck()) {
             calculator.calculate()
            isAnswer = true
            calculator.appendOperator(sign)
             calculator.displayOneUpdate()
            calculator.signDisplay()
            console.log('calculate called')
        }   
        else{
            if (isNumAppend) {
            
                if (signCount == 1 && isAnswer) {           //to do Ans +
                    calculator.appendOperator(sign)
                    //calculator.displayTwoUpdate()
                    calculator.signDisplay()
                    calculator.displayOneUpdate()
                    console.log('sign and answer is true for the first time')
                }
                else if (signCount == 1 && !isAnswer) {
                    calculator.appendOperator(sign)
                    calculator.displayTwoUpdate()
                    calculator.signDisplay()
                    calculator.displayOneUpdate()
                    console.log('sign and answer is not true for the first time')
                }
                else if (signCount == 2) {     // to do 5+ -6
                    calculator.appendNumber(sign)
                    calculator.signDisplay()
                    calculator.displayOneUpdate()
                    console.log('sign is ..')
                }
                else if (signCount > 2) {   // to solve 5+ --+- issue // accept only one second sign 
                    calculator.appendNumber(sign)
                    calculator.displayOneUpdate()
                    console.log('sign is ..')
                }
            
            }
            if (isSignFirstTime && sign === '-') {    //for - sign
            
                calculator.appendNumber(sign)
                calculator.displayOneUpdate()
                console.log('sign - ')
            
        
            }
        }
    })
})

allClearButton.addEventListener('click', () => {
    isSignFirstTime = true
    signCount = 0
    isAnswer = false
    isNumAppend = false
    
    calculator.clear()
    calculator.displayOneUpdate()
    calculator.signDisplay()
})

deleteButton.addEventListener('click', () => {
    calculator.delete()
    calculator.displayOneUpdate()
    
})

equalsButton.addEventListener('click', () => {
    calculator.calculate()
    isAnswer = true
    calculator.displayOneUpdate()
    calculator.signDisplay()
    
})