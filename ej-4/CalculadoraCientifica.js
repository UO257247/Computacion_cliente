class BasicCalculator {
    constructor() {
        this.register = 0;

        this.string = "";
        /*
                //             __must_have_one__   ____________zero_to_n____________
                //             ______number______  _____op_____  ______number______
                this.expression = /^\-?[0-9]+(.[0-9]+)?((\+|\-|\*|\/)\-?[0-9]+(.[0-9]+)?)*$/;
        */


        /*
            ^ # Match the start of the line
            .* ? # Non - greedy match anything\(# Upto the first opening bracket(escaped)[ ^ \d] * # Match anything not a digit(zero or more)
                (\d + ) # Match a digit string(one or more)[ ^ \d] * # Match anything not a digit(zero or more)\) # Match closing bracket
            .*# Match the rest of the line
            $ # Match the end of the line

            ^ .* ? \([ ^ \d] * (\d + )[ ^ \d] * \).*$
        */
        // -?(\())
        let numb = "[0-9]+(.[0-9]+)?";
        numb = "((" + numb + ")|(" + "\\(" + numb + "\\)" + "))";
        this.regex = new RegExp("^" +
            "\\-?" + numb +
            "(" +
            "(\\+|\\-|\\*|\\/)" +
            "\\-?" + numb +
            ")*" +
            "$");
        //this.regex = /^\-?[0-9]+(.[0-9]+)?((\+|\-|\*|\/)\-?[0-9]+(.[0-9]+)?)*$/;


        document.addEventListener('keydown', (event) => {

            console.log(event);

            const keyName = event.key;
            if (keyName === "+") {
                calc.push("+");
            }
            if (keyName === "-") {
                calc.push("-");
            }
            if (keyName === "*") {
                calc.push("*");
            }
            if (keyName === "/") {
                calc.push("/");
            }
            if (keyName === ".") {
                calc.push(".");
            }
            if (keyName === 'Enter') {
                calc.evaluate();
            }
            if (keyName === 'Delete' || keyName === "Backspace") {
                calc.clear();
            }
            if (!isNaN(Number(keyName))) {
                calc.push(Number(keyName));
            }
        });
    }

    update() {
        document.getElementById("viewer").value = this.string;
    }

    clear() {
        this.string = "";
        this.update();
    }

    clearE() {
        const limit = this.string.length - 1;
        for (let i = limit; i >= 0; i--) {
            let value = this.string[i];
            if (/^([^0-9]*)$/.test(value)) { // Break when we reach the first non-number
                this.string = this.string.substring(0, i);
                break;
            }
        }
        this.update();
    }

    erase() {
        if (this.string.length > 0) {
            this.string = this.string.substring(0, this.string.length - 1);
            this.update();
        }
    }



    registerClear() {
        this.register = 0;
        this.update();
    }

    registerRead() {
        this.string = "" + this.register;
        this.update();
    }


    registerPlus() {
        if (this.regex.test(this.string)) {
            this.register += this._eval();
            this.string = "";
        } else this.string = "SYNTAX ERROR";

        this.update();
    }


    registerMinus() {
        if (this.regex.test(this.string)) {
            this.register -= this._eval();
            this.string = "";
        } else this.string = "SYNTAX ERROR";

        this.update();
    }

    push(str) {
        this.string += str;
        this.update();
    }


    evaluate() {
        if (this.regex.test(this.string)) {
            this.string = this._eval();
        } else this.string = "SYNTAX ERROR";

        this.update();
    }

    _eval() {
        //Rounding to 5 decimals

        return Math.round(Number(eval(this.string) * 100000)) / 100000;
    }
}

class ScientificCalculator extends BasicCalculator {
    doSin() {
        if (this.regex.test(this.string)) {
            this.string = Math.sin(this._eval());
        } else this.string = "SYNTAX ERROR";
        this.update();
    }

    doCos() {
        if (this.regex.test(this.string)) {
            this.string = Math.cos(this._eval());
        } else this.string = "SYNTAX ERROR";
        this.update();
    }

    doTan() {
        if (this.regex.test(this.string)) {
            this.string = Math.tan(this._eval());
        } else this.string = "SYNTAX ERROR";
        this.update();
    }

    doFactorial() {
        if (this.regex.test(this.string)) {
            this.string = this._factorial(this._eval());
        } else this.string = "SYNTAX ERROR";
        this.update();
    }

    _factorial(n) {
        if (n == 0)
            return 1;

        return n * this._factorial(n - 1);
    }

    doExp() {
        if (this.regex.test(this.string)) {
            this.string = Math.exp(this._eval());
        } else this.string = "SYNTAX ERROR";
        this.update();
    }

    doExp10() {
        if (this.regex.test(this.string)) {
            this.string = Math.pow(10, this._eval());
        } else this.string = "SYNTAX ERROR";
        this.update();
    }

    doLog() {
        if (this.regex.test(this.string)) {
            this.string = Math.log2(this._eval());
        } else this.string = "SYNTAX ERROR";
        this.update();
    }

    doSqrt() {
        if (this.regex.test(this.string)) {
            this.string = Math.sqrt(this._eval());
        } else this.string = "SYNTAX ERROR";
        this.update();
    }

    doPow() {
        if (this.regex.test(this.string)) {
            let n = this._eval();
            this.string = n * n;
        } else this.string = "SYNTAX ERROR";
        this.update();
    }

    doXtoY() {
        if (this.regex.test(this.string)) {
            let n = this._eval();
            let y = prompt('Indique el número al cual quiere elevar', '2');
            if (isNaN(Number(y))) {
                alert('El número no es válido');
            } else {
                this.string = Math.pow(n, Number(y));
            }
        } else this.string = "SYNTAX ERROR";
        this.update();
    }

    doPlusMinus() {
        if (this.regex.test(this.string)) {
            let n = -this._eval();
            this.string = n;
        } else this.string = "SYNTAX ERROR";
        this.update();
    }

}
var calc = new ScientificCalculator();

for (let i = 0; i < 10; i++) {
    let numb = "" + i;
    document.getElementById(numb).onclick = () => calc.push(numb);
}

document.getElementById("regClear").onclick = () => calc.registerClear();
document.getElementById("regRead").onclick = () => calc.registerRead();
document.getElementById("regMinus").onclick = () => calc.registerMinus();
document.getElementById("regPlus").onclick = () => calc.registerPlus();
document.getElementById("ms").onclick = () => calc.registerPlus();

document.getElementById("pow").onclick = () => calc.doPow();
document.getElementById("xToY").onclick = () => calc.doXtoY();
document.getElementById("sin").onclick = () => calc.doSin();
document.getElementById("cos").onclick = () => calc.doCos();
document.getElementById("tan").onclick = () => calc.doTan();

document.getElementById("sqrt").onclick = () => calc.doSqrt();
document.getElementById("exp10").onclick = () => calc.doExp10();
document.getElementById("log").onclick = () => calc.doLog();
document.getElementById("exp").onclick = () => calc.doExp();
document.getElementById("mod").onclick = () => calc.push("%");

// TODO: cleanDisplay
document.getElementById("C").onclick = () => calc.clear();
document.getElementById("CE").onclick = () => calc.clearE();
document.getElementById("erase").onclick = () => calc.erase();
document.getElementById("div").onclick = () => calc.push("/");

document.getElementById("pi").onclick = () => calc.push("3.14159265358979");
document.getElementById("mult").onclick = () => calc.push("*");

document.getElementById("factorial").onclick = () => calc.doFactorial();
document.getElementById("minus").onclick = () => calc.push("-");

document.getElementById("plusMinus").onclick = () => calc.doPlusMinus();
document.getElementById("plus").onclick = () => calc.push("+");

// TODO: parenthesis
document.getElementById("leftPar").onclick = () => calc.push("(");
document.getElementById("rightPar").onclick = () => calc.push(")");
document.getElementById("dot").onclick = () => calc.push(".");
document.getElementById("equals").onclick = () => calc.evaluate();