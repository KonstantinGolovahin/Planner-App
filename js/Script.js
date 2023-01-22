// current date and time to display
let timeCurrentDate;
// Fake counter for a timer
let timerEternal = 0;
// current hour for colour code hourly blocks
let timeCurrentHour = moment().format("HH");




// Runs forever to display current time and colour code hourly blocks
function timeControl () {
timeCurrentDate = moment().format(" DD/MM/YYYY HH:mm:ss");
$("#currentDay").text(timeCurrentDate);
//console.log(timeCurrentHour)
timerEternal++;
    setTimeout(timeControl, 1000); 
}







  // new array for values from a local storage
let taskSaved = [];
taskSaved = getTasks(taskSaved);
console.log(taskSaved)

// retrieve values if any exists

function getTasks(arr) {
   if (localStorage.getItem("taskObject") === null) {
       arr = [];
       
   } else {
       arr = JSON.parse(localStorage.getItem("taskObject"));
       
   }
   return arr;
}




// start up timer
timeControl();



var taskObject = [{
    "taskHour": "09",
    "taskText": "Coffee break",
},
{
    "taskHour": "10",
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
    "taskText": "",
},

];

//https://stackoverflow.com/questions/54868328/html-how-to-automatically-create-bootstrap-cards-from-a-js-file
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
    var parent_id = $(this).parent().find('p').text();
   // console.log(parent_id);
    var parent_id1 = $(this).parent().find(':input').val();
   // console.log(taskObject[0].taskHour);

for( i=0;i<taskObject.length;i++) {
    
if(taskObject[i].taskHour===parent_id){
   // console.log(taskObject[i].taskHour+taskObject[i].taskText+"Enot")

// user data object 
let userSave = {
    taskHour: parent_id,
    taskText: parent_id1,

}
// replace previous entry with current one
taskObject.splice(i, 1,userSave);

// save to local storage
localStorage.setItem("taskObject", JSON.stringify(taskObject));

}

}



   })


