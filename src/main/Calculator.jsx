import React, { Component } from 'react'
import './Calculator.css'
import Button from '../components/Button'
import Display from '../components/Display'

const initialState = { 
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
}

export default class Calculator extends Component {

    state = { ... initialState }

    clearMemory(){
        this.setState({...initialState})
        console.log('limpar')
    }

    setOperation(operation){
        if(this.state.current === 0){
            this.setState({ operation, current: 1, clearDisplay: true })
        }
        else {
            const finish = operation === '='
            const currentOperation = this.state.operation
            const values = [...this.state.values]
            switch (currentOperation){
                case'+': 
                values[0] = values [0] + values [1]
                break;
                case'-': 
                values[0] = values[0] - values[1]
                break;
                case'x':
                values[0] = values[0] * values[1]
                break;
                case'÷':
                values[0] = values[0] / values[1]
                break
            }
            this.setState({ 
                displayValue: values[0],
                operation: finish ? null : operation,
                current: finish ? 0 : 1,
                clearDisplay: !finish,
                values
            })
        }
    }

    addDigit(num){
        if (num === '.' && this.state.displayValue.includes('.')){
            return
        }
        const clearDisplay = this.state.displayValue === '0'|| this.state.clearDisplay 
        
        const currentValue = clearDisplay ? '' : this.state.displayValue
        const displayValue = currentValue + num 
        this.setState({ displayValue, clearDisplay: false })

        if (num !== '.'){
            const i = this.state.current
            const newValue = parseFloat(displayValue)
            const values = [...this.state.values]
            values[i] = newValue 
            this.setState({ values })
        }
    }

    constructor(props){
        super(props)
        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigit = this.addDigit.bind(this)
    }

    render() {
        console.log('rendering') 
        return (
            <div className="calculator">
                <Display value={this.state.displayValue}/>
                <Button label="AC" click={this.clearMemory} triple/>
                <Button label="÷" click={this.setOperation} operation/>
                <Button label="7" click={this.addDigit}/>
                <Button label="8" click={this.addDigit}/>
                <Button label="9" click={this.addDigit}/>
                <Button label="x" click={this.setOperation} operation/>
                <Button label="4" click={this.addDigit}/>
                <Button label="5" click={this.addDigit}/>
                <Button label="6" click={this.addDigit}/>
                <Button label="-" click={this.setOperation} operation/>
                <Button label="1" click={this.addDigit}/>
                <Button label="2" click={this.addDigit}/>
                <Button label="3" click={this.addDigit}/>
                <Button label="+" click={this.setOperation} operation/>
                <Button label="0" click={this.addDigit} double/>
                <Button label="." click={this.addDigit}/>
                <Button label="=" click={this.setOperation} operation/>
                </div>
        )
    }
}