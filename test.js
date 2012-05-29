function Test() {
    a = "test";
}

Test.prototype.test = function() {
    console.log(a);
}


exports.test = Test.prototype.test;
module.exports = new Test();