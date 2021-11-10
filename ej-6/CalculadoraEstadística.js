class Calculator {

    constructor()
    {
        this.register = 0;

        this.string = "";

        //             __must_have_one__   ____________zero_to_n____________
        //             ______number______  _____op_____  ______number______
        this.regex = /^\-?[0-9]+(.[0-9]+)?((\+|\-|\*|\/)\-?[0-9]+(.[0-9]+)?)*$/;
    }

    update()
    {
        document.getElementById("viewer").value = this.string;
    }

    clear()
    {
        this.string = "";
        this.update();
    }

    registerClear()
    {
        this.string = "" + this.register;
        this.register = 0;
        this.update();
    }

    registerPlus()
    {
        if (this.regex.test(this.string))
        {
            this.register += this._eval();
            this.string = "";
        }
        else this.string = "SYNTAX ERROR";

        this.update();
    }

    registerMinus()
    {
        if (this.regex.test(this.string))
        {
            this.register -= this._eval();
            this.string = "";
        }
        else this.string = "SYNTAX ERROR";

        this.update();
    }

    push(str)
    {
        this.string += str;
        this.update();
    }

    evaluate()
    {
        if (this.regex.test(this.string))
        {
            this.string = this._eval();
        }
        else this.string = "SYNTAX ERROR";

        this.update();
    }


    _eval()
    {
        // Round to have max five decimals
        return Math.round(eval(this.string) * 100000) / 100000;
    }
    

    _parseArray() {
        var array = [];

        var split = this.string.split(", ");

        for (let i = 0 ; i < split.length; i++) {
            if (this.regex.test(split[i]))
            {
                console.log("Number found: " + split[i]);
                array.push(eval(split[i]));
            }
            else {
                console.log("Error parsing: " + split[i]);
            }
        }
        return array;
    }

    doDeviation(){
        this.string= "" + this._dev(); 
        this.update();
    }

    _dev(){
        var avg = this._avg();
        var array = this._parseArray();

        // i - media al cuadrado 
        let result =0; 
        for (let i =0; i < array.length; i++){
           result += Math.pow(array[i] - avg, 2); 
        }
        result = Math.sqrt(result / array.length);
        return result;
    }

    doVarianza(){
        let result = Math.pow(this._dev(), 2);
        this.string= "" + result; 
        this.update();

    }


    doAverage(){
       
        this.string = "" + this._avg();
        this.update();
    }

    _avg(){
        var array = this._parseArray();

        let result = 0;
        for (let i = 0; i < array.length; i++)
            result += array[i];
        result /= array.length;
        return result;
    }


    doSin()
    {
        if (this.regex.test(this.string))
        {
            this.string = Math.sin(this._eval());
        }
        else this.string = "SYNTAX ERROR";
        this.update();
    }

    doCos()
    {
        if (this.regex.test(this.string))
        {
            this.string = Math.cos(this._eval());
        }
        else this.string = "SYNTAX ERROR";
        this.update();
    }

    doTan()
    {
        if (this.regex.test(this.string))
        {
            this.string = Math.tan(this._eval());
        }
        else this.string = "SYNTAX ERROR";
        this.update();
    }

    doFactorial()
    {
        if (this.regex.test(this.string))
        {
            this.string = this._factorial(this._eval());
        }
        else this.string = "SYNTAX ERROR";
        this.update();
    }

    _factorial(n) 
    {
        if (n == 0)
            return 1;

        return n * this._factorial(n - 1);
    }

    doExp()
    {
        if (this.regex.test(this.string))
        {
            this.string = Math.exp(this._eval());
        }
        else this.string = "SYNTAX ERROR";
        this.update();
    }

    doLog()
    {
        if (this.regex.test(this.string))
        {
            this.string = Math.log10(this._eval());
        }
        else this.string = "SYNTAX ERROR";
        this.update();
    }

    doSqrt()
    {
        if (this.regex.test(this.string))
        {
            this.string = Math.sqrt(this._eval());
        }
        else this.string = "SYNTAX ERROR";
        this.update();
    }

    doPow()
    {
        if (this.regex.test(this.string))
        {
            let n = this._eval();
            this.string = n * n;
        }
        else this.string = "SYNTAX ERROR";
        this.update();
    }
}

var calc = new Calculator();

for (let i = 0; i < 10; i ++)
{
    let numb = "" + i;
    document.getElementById(numb).onclick = () => calc.push(numb);
}

document.getElementById("clear").onclick = () => calc.clear();

document.getElementById("dot").onclick = () => calc.push(".");
document.getElementById("comma").onclick = () => calc.push(", ");

document.getElementById("plus").onclick = () => calc.push("+");
document.getElementById("minus").onclick = () => calc.push("-");
document.getElementById("mult").onclick = () => calc.push("*");
document.getElementById("div").onclick = () => calc.push("/");
document.getElementById("avg").onclick = () => calc.doAverage();
document.getElementById("desvTipica").onclick = () => calc.doDeviation();
document.getElementById("varianza").onclick = () => calc.doVarianza();

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