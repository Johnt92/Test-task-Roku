var data = {
    "accounts" : [
        {
            "title" : "new acc1",
            "img" : "icon.png"
        },
        {
            "title" : "new acc2",
            "img" : "icon.png"
        },
        {
            "title" : "new acc3",
            "img" : "icon.png"
        }
    ]
}

let firstScreen = document.querySelector('.first-screen'); //первый экран   
let secondScreen = document.querySelector('.second-screen'); //второй экран
secondScreen.hidden = true;
firstScreen.hidden = false;

// появление второго экрана нажатием кнопки add      
document.querySelector('.add-account').onclick = function(){ 
    console.log("pressed add ");
    firstScreen.hidden = true;
    secondScreen.hidden = false;
}

// Возвращение на первый через отмену   
document.querySelector('.cancel').onclick = function(){
    console.log("pressed cencel");
    firstScreen.hidden = false;
    secondScreen.hidden = true;
}

// Показывает на главном экране все аккаунты которые в json data
function updateUI() {
var items = '<ul>';
var images = 'img src="icon.png"';
for (var i = 0; i < data.accounts.length; i++){
    items += '<li tabIndex = "1">' + '<img src= " ' + data.accounts[i].img +' " > ' + data.accounts[i].title + '</li>';
}
items += '</ul>';
document.querySelector('.names').innerHTML = items;
}
updateUI();

// ввод имени и вывод его на главный экран нажатием кнопки add также добавление данных в базу возвращение на первый экран
function addNewAcc(){
    let nameOfTheNewAcc = document.querySelector('.input-name').value;
    firstScreen.hidden = false;
    secondScreen.hidden = true;
    var newLength = data.accounts.push({
        "title" : nameOfTheNewAcc,
        "img" : "icon.png"
    });
    document.querySelector('.input-name').value="";
    updateUI();
}
document.querySelector('.add-to-account').onclick = addNewAcc;

//переключение стрелками клавиатуры по именам и кнопкам, удаление и добавление аккаунтов - 
//кнопка Backspase, знаю что нужно было на стрелку влево - на данном этапе не вышло.
let index = -1;
window.addEventListener('keydown', (e) => { 
  console.log(e.keyCode);
  const N = document.querySelectorAll("#accounts li, .input-name, .buttons-add-cancel button");
  if(e.keyCode === 39) {
    document.querySelector('#add-account').focus();
    index = -1;
  } else if(e.keyCode === 37) {
    index = 0;
    N[index].focus();
  } else if(e.keyCode === 38 || e.keyCode == 40) {
    if(e.keyCode === 38) index--;
    else if(e.keyCode === 40) index++;
   
    if(index < 0) index = N.length - 1;
    else if(index >= N.length) index = 0;

    if(N[index])N[index].focus();
    else index = -1;
    
  } else if(e.keyCode === 8 && N[index]) {
    N[index].remove();
    console.log(N[index]);

    var removeItems = data.accounts.splice(index, 1);
    console.log(removeItems);

    if(index < 0) index = N.length - 1;
    else if(index >= N.length) index = 0;
    
    if(N[index])N[index].focus();
    else index = -1;
  }
});

