// current date and time to display
let timeCurrentDate;
// Fake counter for a timer
let timerEternal = 0;
// current hour for colour code hourly blocks
let timeCurrentHour = moment().format("HH");










// Default array ot hours and tasks

var taskObject = [{
    "taskHour": "04",
    "taskText": "Coffee break",
},
{
    "taskHour": "05",
    "taskText": "Some work",
},
{
    "taskHour": "11",
    "taskText": "Coffee break",
},
{
    "taskHour": "12",
    "taskText": "Coffee break",
},
{
    "taskHour": "13",
    "taskText": "Coffee break",
},
{
    "taskHour": "14",
    "taskText": "Coffee break",
},
{
    "taskHour": "15",
    "taskText": "Coffee break",
},
{
    "taskHour": "16",
    "taskText": "Coffee break",
},
{
    "taskHour": "17",
    "taskText": "Coffee break",
},

];





// Runs forever to display current time and colour code hourly blocks
function timeControl () {
timeCurrentDate = moment().format(" DD/MM/YYYY HH:mm:ss");
$("#currentDay").text(timeCurrentDate);
//console.log(timeCurrentHour)
timerEternal++;


$('.taskHour').each(function() {
   // console.log(this.innerText)
    let scheduleHour = this.innerText;

    if(timeCurrentHour<scheduleHour) {
        $(this).css('background-color', '#77dd77');
    }
    else if(timeCurrentHour>scheduleHour) {
        $(this).css('background-color', '#d3d3d3');
    }
else{
    $(this).css('background-color', '#ff6961');
}



});


    setTimeout(timeControl, 1000); 
}












// retrieve values if any exists

function getTasks(arr) {
    if (localStorage.getItem("taskObject") === null) {
        arr = taskObject;
        
    } else {
        arr = JSON.parse(localStorage.getItem("taskObject"));
        
    }
    return arr;
 }
 


  // new array for values from a local storage
let taskSaved = [];
taskSaved = getTasks(taskSaved);
console.log(taskSaved)





// start up timer
timeControl();


// idea from https://stackoverflow.com/questions/54868328/html-how-to-automatically-create-bootstrap-cards-from-a-js-file
let cardContainer;

let createTaskCard = (task) => {

let card = document.createElement('div');
card.className = 'card ';

let cardBody = document.createElement('div');
cardBody.className = 'card-body row ';

let taskHour = document.createElement('p');
taskHour.innerText = task.taskHour;
taskHour.className = 'col-1  taskHour';

let taskText = document.createElement('input');
taskText.value = task.taskText;
taskText.className = 'col  taskText';

let taskButton = document.createElement('button');
taskButton.innerText = "Save";
taskButton.className = 'col-1 taskButton';



cardBody.appendChild(taskHour);
cardBody.appendChild(taskText);
cardBody.appendChild(taskButton);

card.appendChild(cardBody);
cardContainer.appendChild(card);

}
// task factory
let initListOfTasks = () => {
if (cardContainer) {
    document.getElementById('card-container').replaceWith(cardContainer);
    return;
}

cardContainer = document.getElementById('card-container');
taskSaved.forEach((task) => {
    createTaskCard(task);
  
});
};

initListOfTasks();




// get this button hour and text, replace previous entry, save all data to local storage
$('.taskButton').on('click', function(){
    var currentHour = $(this).parent().find('p').text();
    var currentText = $(this).parent().find(':input').val();

for( i=0;i<taskObject.length;i++) {
    
if(taskObject[i].taskHour===currentHour){
 // user input object 
let userSave = {
    taskHour: currentHour,
    taskText: currentText,

}
// replace previous entry with current one
taskObject.splice(i, 1,userSave);

// save to local storage
localStorage.setItem("taskObject", JSON.stringify(taskObject));

}
}
   })


