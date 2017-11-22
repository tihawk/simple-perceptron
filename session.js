//LOGIC
//index of current dot being iterated
//this is here for the purpose of it looking cooler, and not learning instantly, but one point at a time
var currIndex = 0;
//canvas side length
var cLen = 700;
//a perceptron
var ptron;
//a training set
var pointCount = 1000;
var training = new Array(pointCount);

//line variables
var m = 0.7;
var b = 100;
//line function
function f(x){
    return m*x + b;
}

//initialize
ptron = new Perceptron(3, 0.001);
console.log(ptron.weights);
console.log(ptron.guess([-1, 1.3]));

for(let i = 0; i < training.length; i++){
    var x = Math.floor(Math.random()*cLen);
    var y = Math.floor(Math.random()*cLen);
    var answer = 1;
    if(y < f(x)){answer = -1;}
    
    training[i] = {
        input: [x, y, 1],
        output: answer
    };
}
//console.log(training);


//DRAWING
//make canvas
var c = document.getElementById('canvas');
c.width = cLen;
c.height = cLen;
var ctx = c.getContext("2d");
//draw the line
ctx.moveTo(0,b);
ctx.lineTo(cLen,f(cLen));
ctx.stroke();

//initial guess draw
for(let i = 0; i < training.length; i++){
        //visualise current guess
        var guess = ptron.guess(training[i].input);
        var answer = training[i].output;
        ctx.fillStyle = '#FFFFFF';
        if(guess===answer) {ctx.fillStyle = '#000000';}
        ctx.fillRect(training[i].input[0], training[i].input[1], 4, 4);
    }

var currentCanvas;
//update function
var timer = setInterval(function(){
    //TRAIN PERCEPTRON
    //train one at a time
    ptron.train(training[currIndex].input, training[currIndex].output);
    currIndex = (currIndex+1)%pointCount;
    
    
    
    //redraw:
    for(let i = 0; i < currIndex; i++){
        //visualise current guess
        let guess = ptron.guess(training[i].input);
        let answer = training[i].output;
        ctx.fillStyle = '#FFFFFF';
        if(guess===answer) {ctx.fillStyle = '#000000';}
        ctx.fillRect(training[i].input[0], training[i].input[1], 4, 4);
    }
    
    //console.log(ptron.weights);
}, 1000/60);