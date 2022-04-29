function homework(text, callback) {
    console.log(text);
    callback();
}

function homework_callback() {
    console.log('callback');
}

var sum = function(global.a, b, c) {
    return function(c) {
        c = a + b;
    };
};

var a = 5;
var b = 1;
var c;

homework('math', sum(1, 5));
console.log(c);


