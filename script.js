let themeSelect
let taskInput
let taskButton
let difficultySelect
let theme = "default"
let workButton
let workHour
let workMinute
let breakButton
let breakHour
let breakMinute
let working = true
let workHourTotal
let workMinuteTotal
let breakHourTotal
let breakMinuteTotal
let timerHour
let timerMinute
let timerSecond
let enterWorkTime = false
let enterBreakTime = false
let hoursLeft
let minutesLeft
let secondsLeft
let workOrBreak
let longActivities = []
let shortActivities = []
let image


async function runProgram(){
    console.log('runProgram');
    declareVars();
    image.src = "sprite_0.png"
    await getActivity()
    themeSelect.addEventListener('change', changeTheme);
    makeListWork();
    workButton.addEventListener('click', getWorkTime);
    breakButton.addEventListener('click', getBreakTime);
    
}
function declareVars(){
    themeSelect = document.querySelector('#themeSelect');
    taskInput = document.querySelector('#taskInput');
    taskButton = document.querySelector('#taskButton');
    difficultySelect = document.querySelector('#difficultySelect');
    workButton = document.querySelector('#workButton');
    workHour = document.querySelector('#workHour');
    workMinute = document.querySelector('#workMinute');
    breakButton = document.querySelector('#breakButton');
    breakHour = document.querySelector('#breakHour');
    breakMinute = document.querySelector('#breakMinute');
    timerHour = document.querySelector('#timerHour');
    timerMinute = document.querySelector('#timerMinute');
    timerSecond = document.querySelector('#timerSecond');
    workOrBreak = document.querySelector('#workOrBreak');
    image = document.querySelector("#image");
}

function changeTheme(){
    theme = themeSelect.value;
    console.log(`theme has been changed to ${theme}`);
    let styleRef = document.querySelector('#styleRef');
    styleRef.href = `${theme}.css`;
    if (theme === "default"){
        image.src = "sprite_0.png"
    }
    if (theme ==="strawberry"){
        image.src = "sprite_1.png"
    }
    if (theme ==="orange"){
        image.src = "sprite_2.png"
    }
    if (theme ==="floral"){
        image.src = "sprite_3.png"
    }


}
function makeListWork(){
    taskButton.addEventListener('click', newListItem);
    
}
function newListItem(){
    console.log("making new list item");
    let text = taskInput.value;
    let newItem = document.createElement('p');
    let difficulty = difficultySelect.value;
    let section = document.querySelector(`#${difficulty}Tasks`);
    newItem.textContent= text;
    let checkBox = document.createElement('input');
    checkBox.setAttribute('type', 'checkbox');
    let div = document.createElement('div');
    div.classList.add('thingsNextToEachOther');
    div.appendChild(checkBox);
    div.appendChild(newItem);
    section.appendChild(div);
    checkBox.addEventListener('change', checkOff.bind(null, newItem, checkBox));
}
function checkOff(item, checkBox){
    if (checkBox.checked){
        item.classList.add('cross-out');
    }
    else{
        item.classList.remove('cross-out');
    }
}
function getWorkTime(){
    enterWorkTime = true;
    console.log("Work time entered");
    workHourTotal = Number(workHour.value);
    workMinuteTotal = Number(workMinute.value);
    if (enterWorkTime&&enterBreakTime){
        makeTimer();
    }
}
function getBreakTime(){
    enterBreakTime = true;
    console.log("Break time entered");
    breakHourTotal = Number(breakHour.value);
    breakMinuteTotal = Number(breakMinute.value);
    if (enterWorkTime&&enterBreakTime){
        makeTimer();
    }
}
function makeTimer(){
    secondsTotal = 0
    console.log(`My work time is ${workHourTotal}:${workMinuteTotal} and my break time is ${breakHourTotal}:${breakMinuteTotal}.`);
    if (working){
        timerHour.textContent = `${String(workHourTotal)}:`;
        timerMinute.textContent = `${String(workMinuteTotal)}:`;
    }
    else{
        timerHour.textContent = `${String(breakHourTotal)}:`;
        timerMinute.textContent = `${String(breakMinuteTotal)}:`;
    }
    timerSecond.textContent = secondsTotal;
    timerCountdown()
}
function timerCountdown(){
    secondsLeft = secondsTotal;
    console.log("counting down");
    // at the beginning
    if (working){
        hoursLeft = workHourTotal;
        minutesLeft = workMinuteTotal;
    }
    else{
        hoursLeft = breakHourTotal;
        minutesLeft = breakMinuteTotal;
    }

    // every second
    let second = setInterval(function(){countdown()}, 1000);
    // when timer runs out
    
}
function countdown(){
    if (secondsLeft===0){
        if (minutesLeft===0){
            if (hoursLeft===0){
                console.log("Time is up!");
            }
            else{
                hoursLeft -=1;
                minutesLeft = 60;
                secondsLeft = 60;
            }
        }
        else{
            minutesLeft -= 1;
            secondsLeft = 60;
        }
    }
    else{
        secondsLeft -= 1;
    }
    timerHour.textContent = `${hoursLeft}:`;
    timerMinute.textContent =`${minutesLeft}:`;
    timerSecond.textContent = secondsLeft;
    if (hoursLeft===0&&minutesLeft===0&&secondsLeft===0){
        console.log("timer has run out");
        if (working){
            alert("Your work time is over! Time to take a break!");
            working = false;
            pickActivity()
        }
        else{
            alert("Your break is over! Get to work!");
            working=true;
            workOrBreak.textContent = "You are working right now!";
        }
        // makeTimer()
        if (working){
            timerHour.textContent = `${String(workHourTotal)}:`;
            timerMinute.textContent = `${String(workMinuteTotal)}:`;
        }
        else{
            timerHour.textContent = `${String(breakHourTotal)}:`;
            timerMinute.textContent = `${String(breakMinuteTotal)}:`;
        }
        timerSecond.textContent = secondsTotal;
        if (working){
            hoursLeft = workHourTotal;
            minutesLeft = workMinuteTotal;
        }
        else{
            hoursLeft = breakHourTotal;
            minutesLeft = breakMinuteTotal;
        }
    }
}
function pickActivity (){
    let activities
    if (breakHourTotal>=1){
        activities = longActivities
    }
    else{
        activities = shortActivities
    }
    // activities = shortActivities
    let x = Math.random()*activities.length
    let i = Math.floor(x);
    let activity = activities[i];
    console.log(i)
    console.log(activity)
    console.log(activities)
    workOrBreak.textContent = `You are on break right now! You should ${activity} while you're taking a break!`
}
async function getActivity(){
    console.log("getting activity");
    const response = await fetch ("activities.json");
    const activities = await response.json();
    console.log(activities)
    for (let currentActivity of activities){
        if (currentActivity.time==="long"){
            longActivities.push(currentActivity.name)
        }
        if (currentActivity.time==="short"){
            shortActivities.push(currentActivity.name)
        }
    }
}
document.addEventListener('DOMContentLoaded', runProgram);