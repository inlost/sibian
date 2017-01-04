var list = document.getElementById('list');
var leftNow = 0;


list.className = 'normal-list';

setInterval(function(){
    leftNow -= 10;
    if(leftNow <= -300){
        leftNow = 0;
    }
    list.style.left = `${leftNow}%`;

}, 100);
