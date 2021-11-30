class BasicCalculator {
    constructor() {
        this.register = 0;

        this.string = "";

        //             __must_have_one__   ____________zero_to_n____________
        //             ______number______  _____op_____  ______number______
        this.expression = /^\-?[0-9]+(.[0-9]+)?((\+|\-|\*|\/)\-?[0-9]+(.[0-9]+)?)*$/;

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



    registerClear() {
        this.string = "" + this.register;
        this.register = 0;
        this.update();
    }


    registerPlus() {
        if (this.expression.test(this.string)) {
            this.register += this._eval();
            this.string = "";
        } else this.string = "SYNTAX ERROR";

        this.update();
    }


    registerMinus() {
        if (this.expression.test(this.string)) {
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
        if (this.expression.test(this.string)) {
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

}
var calc = new ScientificCalculator();

for (let i = 0; i < 10; i++) {
    let numb = "" + i;
    document.getElementById(numb).onclick = () => calc.push(numb);
}

document.getElementById("clear").onclick = () => calc.clear();

document.getElementById("dot").onclick = () => calc.push(".");

document.getElementById("plus").onclick = () => calc.push("+");
document.getElementById("minus").onclick = () => calc.push("-");
document.getElementById("mult").onclick = () => calc.push("*");
document.getElementById("div").onclick = () => calc.push("/");

document.getElementById("equals").onclick = () => calc.evaluate();

document.getElementById("regClear").onclick = () => calc.registerClear();
document.getElementById("regMinus").onclick = () => calc.registerMinus();
document.getElementById("regPlus").onclick = () => calc.registerPlus();

document.getElementById("sin").onclick = () => calc.doSin();
document.getElementById("cos").onclick = () => calc.doCos();
document.getElementById("tan").onclick = () => calc.doTan();

document.getElementById("factorial").onclick = () => calc.doFactorial();
document.getElementById("exp").onclick = () => calc.doExp();
document.getElementById("log").onclick = () => calc.doLog();

document.getElementById("sqrt").onclick = () => calc.doSqrt();
document.getElementById("mod").onclick = () => calc.push("%");
document.getElementById("pow").onclick = () => calc.doPow();