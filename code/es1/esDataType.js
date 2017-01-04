function Person(strIn, birth){
    this.name = strIn;
    this.birth = birth;
}

Person.prototype.eat = function(){
    alert('吃吃吃')
}

var zhangsan = new Person('zhangsan', '1999')
var lisi = new Person('lisi', '2001')
