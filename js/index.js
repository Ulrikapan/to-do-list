var inputbtn = document.querySelector('.inputbtn');
var inputtext = document.querySelector('.inputtext');
var tasklist = document.querySelector('.tasklist');

// var todolist = [{task: '去健身房運動'},{task: '寫日記記錄今天發生的事'},{task: '打掃房間、整理書桌'}];

//todolist的陣列與localStorage同步

var todolist = JSON.parse(localStorage.getItem('listdata')) || [];
// var body = document.querySelector('body');

//更新表單資料
function renewlist(array){  
  var str='';
  var Len = array.length;
  for(var i=0;i<Len;i++){
    var content = "<li class= 'tasklist_item " + todolist[i].done + "' data-num="+i+">"+todolist[i].content+"<a class='tasklist_item_a' data-num="+i+">Delete</a></li>"
    str+= content;
  } 
  tasklist.innerHTML = str;

}
renewlist(todolist);



//新增資料
function btnaction(){
  if(inputtext.value==''){alert('請輸入待辦事項！')}
  else{
    var todo = {content: inputtext.value, done: ''};
    todolist.push(todo);

    inputtext.value='';
    localStorage.setItem('listdata',JSON.stringify(todolist));
    renewlist(todolist);
    location.reload();
  }
}
inputbtn.addEventListener('click',btnaction,false);




var tasklistItem = $('.tasklist_item');

function deleteAction(e){
  var num = e.target.dataset.num;
  console.log(e.target)

  // 刪除項目
  if(e.target.nodeName == 'A'){
    console.log('按到第'+num+'個Ａ')
    todolist.splice(num,1);
    localStorage.setItem('listdata',JSON.stringify(todolist));

  }
  // 完成項目
  else if(e.target.nodeName == 'LI'){
    console.log('按到第'+num+'個li')
    if($(this).hasClass('done')){
      $(this).removeClass('done');
      todolist[num].done = '';
      localStorage.setItem('listdata',JSON.stringify(todolist));

    }else{
      $(this).addClass('done');
      console.log($(this).index())
      todolist[num].done = 'done';
      
      localStorage.setItem('listdata',JSON.stringify(todolist));
    }
  }
  location.reload();
}
tasklistItem.on('click', deleteAction);


//按Enter送出
function EnterAdd(e){
  if(e.keyCode=='13'){
    btnaction(); 
  }
}
inputtext.addEventListener('keydown',EnterAdd,false);


