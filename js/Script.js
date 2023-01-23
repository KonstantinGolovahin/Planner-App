// current date and time to display
let timeCurrentDate;
// Fake counter for a timer
let timerEternal = 0;
// current hour for colour code hourly blocks
let timeCurrentHour = moment().format("HH");

// Default array ot hours and tasks

var taskObject = [{
    "taskHour": "09",
    "taskText": " ",
},
{
    "taskHour": "10",
    "taskText": " ",
},
{
    "taskHour": "11",
    "taskText": " ",
},
{
    "taskHour": "12",
    "taskText": " " ,
},
{
    "taskHour": "13",
    "taskText": " ",
},
{
    "taskHour": "14",
    "taskText": " ",
},
{
    "taskHour": "15",
    "taskText": " ",
},
{
    "taskHour": "16",
    "taskText": " ",
},
{
    "taskHour": "17",
    "taskText": " ",
},

];





// Runs forever to display current time and colour code hourly blocks
function timeControl () {
timeCurrentDate = moment().format(" DD/MM/YYYY HH:mm:ss");
$("#currentDay").text(timeCurrentDate);
timerEternal++;


$('.taskHour').each(function() {
   // colour coding
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

// timer step
    setTimeout(timeControl, 1000); 
}



// retrieve saved values from local storage if any exists
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

// idea from https://stackoverflow.com/questions/54868328/html-how-to-automatically-create-bootstrap-cards-from-a-js-file
// dynamically create a set of bootstrap cards for a list of array elements
let cardContainer;

let createTaskCard = (task) => {
//card itself
let card = document.createElement('div');
card.className = 'card ';
// card body
let cardBody = document.createElement('div');
cardBody.className = 'card-body row ';
// hour
let taskHour = document.createElement('p');
taskHour.innerText = task.taskHour;
taskHour.className = 'col-1  taskHour';
// user input or saved task
let taskText = document.createElement('input');
taskText.value = task.taskText;
taskText.className = 'col  taskText';
// save button
let taskButton = document.createElement('button');
taskButton.innerText = "Save";
taskButton.className = 'col-1  taskButton';

// set card body element order
cardBody.appendChild(taskHour);
cardBody.appendChild(taskText);
cardBody.appendChild(taskButton);
// set a card body inside a card
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



//generate list of cards
initListOfTasks();
// start up timer
timeControl();



// get this button hour and text, replace previous entry, save all data to local storage
$('.taskButton').on('click', function(){
    var currentHour = $(this).parent().find('p').text();
    var currentText = $(this).parent().find(':input').val();


// get updated list of tasks from storage 
 taskObject = getTasks(taskSaved);


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


  