//activation function
function activ(sum){
    //for this example, it's a sign function
    if(sum >= 0) {return 1;}
    else {return -1;}
}

//constructor
function Perceptron(n, c){
    //initialize a learning constant
    this.learnConst = c;
    //create an n-sized array of weights
    this.weights = new Array(n);
    //randomize initial weights
    for(let i = 0; i < this.weights.length; i++){
        this.weights[i] = Math.random()*(1+1) -1;
    }
}

Perceptron.prototype.guess = function(inputs){
    var sum = 0;
    for(let i = 0; i < this.weights.length; i++){
        sum += this.weights[i]*inputs[i];
    }
    return activ(sum);
}

Perceptron.prototype.train = function(inputs, target){
    //get a guess
    var guess = this.guess(inputs);
    //find the error
    var error = guess - target;
    //tweak the weights using the error
    for(let i = 0; i < this.weights.length; i++){
        this.weights[i] += inputs[i]*error*this.learnConst;
    }
}