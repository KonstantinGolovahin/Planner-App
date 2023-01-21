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



// task object + format time to 2 digits
var taskObject = [{
    time: "14",
    text: ["Task1"],
  
  }, {
    time: "09",
    text: ["Task2",],
    
  },
  
  
  ];




  // new array for values from a local storage
let taskSaved = [];
taskSaved = getTasks(taskSaved);

// retrieve values if any exists

function getTasks(arr) {
   if (localStorage.getItem("taskObject") === null) {
       arr = [];
       
   } else {
       arr = JSON.parse(localStorage.getItem("taskObject"));
       
   }
   return arr;
}




// start up
timeControl();



var tasks = [{
    "taskHour": "09",
    "taskText": "do at 9Am",
},
{
    "taskHour": "10",
    "taskText": "do at 10 Am",
},
{
    "taskHour": "10",
    "taskText": "do at 10 Am",
}
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
taskHour.className = 'col taskHour';

let taskText = document.createElement('p');
taskText.innerText = task.taskText;
taskText.className = 'col taskText';

let taskButton = document.createElement('button');
taskButton.innerText = "Enot";
taskButton.className = 'col-2 taskButton';



cardBody.appendChild(taskHour);
cardBody.appendChild(taskText);
cardBody.appendChild(taskButton);

card.appendChild(cardBody);
cardContainer.appendChild(card);

}

let initListOfTasks = () => {
if (cardContainer) {
    document.getElementById('card-container').replaceWith(cardContainer);
    return;
}

cardContainer = document.getElementById('card-container');
tasks.forEach((task) => {
    createTaskCard(task);
});
};

initListOfTasks();