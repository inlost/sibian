var navElm = document.getElementById('nav')
console.log(navElm);
var ulElm = document.getElementsByTagName('ul')
console.log(ulElm);
var wrapperElm = document.getElementsByClassName('wrapper')
console.log(wrapperElm);
var liElm = document.querySelectorAll('ul li')
console.log(liElm);
var liParElm = liElm[0].parentNode;
console.log(liParElm);
var ulChilds = liParElm.childNodes;
console.log(ulChilds);

var newLi = document.createElement('li');
newLi.id = 'newLi';
newLi.innerHTML = '新节点'
console.log(newLi);
ulElm[0].appendChild(newLi)

var rst = liElm[1].hasChildNodes()
console.log(rst);
var emptyDiv = document.getElementsByClassName('empty')[0]
console.log(emptyDiv);
rst = emptyDiv.hasChildNodes()
console.log(rst);
rst = ulElm[0].contains(newLi)
console.log(rst);


var linkElm = document.querySelector('li a')
console.log(linkElm);
wrapperElm[0].addEventListener('click', function(e){
    e.preventDefault();
    e.stopPropagation();
    if(e.eventPhase == event.CAPTURING_PHASE){
        alert('事件捕获')
    }
    if(e.eventPhase == event.AT_TARGET){

        alert('事件触发对象')
    }
    if(e.eventPhase == event.BUBBLING_PHASE){

        alert('事件冒泡')
    }
    console.log(e);

}, true)


var zhangsan = {
    name: '张三',
    age: 29
}

var strSay = `你好，我叫${zhangsan.name}，今年${zhangsan.age}`
var strSay = '你好，我叫${zhangsan.name}，今年${zhangsan.age}'
alert(strSay)
