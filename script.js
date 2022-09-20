const btns = document.querySelectorAll('.display-btn')
const display = document.querySelector('.calculator-display')
const answer = document.querySelector('#answer')
const back = document.querySelector('#back')
const clear = document.querySelector('#clear')

display.value = ''

const pattern=/^\d+|^[+\-\d](\d*(\.\d+)?([+\-×÷]|×\-|÷\-)\d+(\.\d+)?)+$/

const pattern2=/^[÷,×]|^00|(\+{2})|(\-{2})|(×{2})|(÷{2})|\+×|×\+|\+÷|÷\+|÷×|×÷|\-×|\-÷|\+\-|\-\+|\.{2}|\.[\+\-×÷]|[\+\-×÷]\.|^\.|\.\d+\./g

function checkInput(){
const x=pattern2.test(display.value)
x?display.value=display.value.slice(0, -1):null
}

function replacer(val, newVal) {
    if (display.value.includes(val)) {
        display.value = display.value.replaceAll(val, newVal)
    } 
}

const displayBtns = () => {
    btns.forEach((btn, i) => {
        btn.addEventListener('click', () => {
            checkInput()
            display.value += btn.innerText
            checkInput()
        })
    })
}

const evaluateCalc = () => {
    answer.addEventListener('click',
        () => {if(pattern.test(display.value)){
            replacer('×', '*')
            replacer('÷', '/')
            if (display.value.length) {
                const result = new Function(`return ${display.value}`)
                if (result() === Infinity || result() === -Infinity || `${result()}` === 'NaN') {
                    alert('Math Error')
                    display.value = ''
                } else {
                    display.value = result()
                }
            }
       }else{alert('enter a valid calculation')}})
}

const clearCalc = () => {
    clear.addEventListener('click',() => display.value = '')
}

const backCalc = () => {
    back.addEventListener('click',
        () => display.value = display.value.slice(0, -1))
}

displayBtns()
evaluateCalc()
clearCalc()
backCalc()


