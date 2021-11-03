class RPNCalculator
{
    constructor() 
    {
       this.display = "";
       this.memory = "";
       this.stack = [];
    }

    clear()
    {
        this.display= "";
        this.stack = new Array();
        this.represent(0);
        this.memory="";
    }

    update()
    {
      this.display= "";
      for (var i =0; i< this.stack.length; i++){
          this.display+=this.stack[i];
          this.display+= " ";
      }
      document.getElementById("viewer").value = this.display;
      this.display="";
    }

    enter(){
       if(!(this.display=="")){
           this.stack.push(this.display);
           this.display="";
           this.update();
       }
    }

    writeOnDisplay(expression) {
        if (!(this.display == "" && expression == '0')) {
            this.display += expression;
            this.represent(this.display);
        }
    }

    represent(expression){
        document.getElementById("viewer").value= expression;
    }

    registerClear()
    {
        this.stack.push(this.register);
        this.register = 0;
        this.update();
    }

    registerPlus()
    {
        if (this.stack.length <= 0)
            return;

        this.register += this.stack.pop();
        this.update();
    }

    registerMinus()
    {
        if (this.stack.length <= 0)
            return;

        this.register -= this.stack.pop();
        this.update();
    }

    //------------------------------------------Operations-------------------------------------------- 
    doAddition()
    {
        if (this.stack.length <= 1)
            return;

        let b = this.stack.pop();
        let a = this.stack.pop();
        this.stack.push(a + b);
        this.update();
    }

    doSubtraction()
    {
        if (this.stack.length <= 1)
        {
            return;
        }

        let b = this.stack.pop();
        let a = this.stack.pop();
        this.stack.push(a - b);
        this.update();
    }

    doDivision()
    {
        if (this.stack.length <= 1)
            return;

        let b = this.stack.pop();
        let a = this.stack.pop();
        this.stack.push(a / b);
        this.update();
    }

    doMultiplication()
    {
        if (this.stack.length <= 1)
            return;

        let b = this.stack.pop();
        let a = this.stack.pop();
        this.stack.push(a * b);
        this.update();
    }


    doSin()
    {
        if (this.stack.length <= 0)
            return;

        let val = this.stack.pop();
        this.stack.push(Math.sin(val));
        this.update();
    }

    doCos()
    {
        if (this.stack.length <= 0)
            return;

        let val = this.stack.pop();
        this.stack.push(Math.cos(val));
        this.update();
    }

    doTan()
    {
        if (this.stack.length <= 0)
            return;

        let val = this.stack.pop();
        this.stack.push(Math.tan(val));
        this.update();
    }

    doFactorial()
    {
        if (this.stack.length <= 0)
            return;

        let val = this.stack.pop();
        this.stack.push(this._factorial(val));
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
        if (this.stack.length <= 0)
            return;
            
        let val = this.stack.pop();
        this.stack.push(Math.exp(val));
        this.update();
    }

    doLog()
    {
        if (this.stack.length <= 0)
            return;
            
        let val = this.stack.pop();
        this.stack.push(Math.log10(val));
        this.update();
    }
    
    doSqrt()
    {
        if (this.stack.length <= 0)
            return;
            
        let val = this.stack.pop();
        this.stack.push(Math.sqrt(val));
        this.update();
    }

    doMod()
    {
        if (this.stack.length <= 1)
            return;
            
        let b = this.stack.pop();
        let a = this.stack.pop();
        this.stack.push(a % b);
        this.update();
    }

    doPow()
    {
        if (this.stack.length <= 0)
            return;
            
        let val = this.stack.pop();
        this.stack.push(val * val);
        this.update();
    }
}

var calc = new RPNCalculator();

document.getElementById("clear").onclick = calc.clear.bind(calc);

for (let i = 0; i < 10; i ++)
{
    let numb = i;
    document.getElementById("" + i).onclick = 
        () => {
            calc.writeOnDisplay(i);
        }
}

document.getElementById("plus").onclick = () => calc.doAddition();
document.getElementById("minus").onclick = () => calc.doSubtraction();
document.getElementById("mult").onclick = () => calc.doMultiplication();
document.getElementById("div").onclick = () => calc.doDivision();

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
document.getElementById("mod").onclick = () => calc.doMod();
document.getElementById("pow").onclick = () => calc.doPow();
document.getElementById("enter").onclick = () => calc.enter();