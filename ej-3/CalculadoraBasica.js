class BasicCalculator {
    constructor() {
        this.register = 0;

        this.string = "";

        //             __must_have_one__   ____________zero_to_n____________
        //             ______number______  _____op_____  ______number______
        this.expression = /^\-?[0-9]+(.[0-9]+)?((\+|\-|\*|\/)\-?[0-9]+(.[0-9]+)?)*$/;

        document.addEventListener('keydown', (event) => {


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

var calc = new BasicCalculator();

for (let i = 0; i <= 9; i++) {
    let num = Number(i);
    document.getElementById(num).onclick = () => calc.push(num);
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