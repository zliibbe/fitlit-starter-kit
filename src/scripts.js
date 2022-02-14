// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// console.log(userData,"<>>>>userData")
// An example of how you tell webpack to use a CSS file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/user-icon.png';
import {fetchUserData, fetchSleepData, fetchHydrationData} from './apiCalls.js';

console.log('This is the JavaScript entry file - your code begins here.');

// An example of how you tell webpack to use a JS file

import userData from './data/users';
import User from './User';
import UserRepository from './UserRepository';
import Hydration from './Hydration'
import {dailyHydration, weeklyHydration} from './Chart.js'

//=====================================================
//imports?
//variable initiation ?


//querySelectors
let userInfoCard = document.querySelector('.user');
let userName = document.querySelector('#user-name');
let userDailyStepGoal = document.querySelector('#user-daily-step-goal');
let userID = document.querySelector('#user-id');
let userAddress = document.querySelector('#user-address');
let userEmail = document.querySelector('#user-email');
let userStrideLength = document.querySelector('#user-stride-length');
let userFriends = document.querySelector('#user-friends');
let moreInfoBtn = document.querySelector('#more-info');
let infoDropdownContent = document.querySelector('#info-dropdown');
let stepGoalComparison = document.querySelector('#step-goal-comparison');
let hydrationTitle = document.querySelector('#hydration');
let hydrationDropdown = document.querySelector('#hydrationDropdown');
let weeklyHydrationData = document.querySelectorAll('.weekly-hydration-data');
let dailyHydrationData = document.querySelector('.daily-hydration-data');
let allTimeAvgHydrationData = document.querySelector('.all-time-average-hydration-data')
let dailyWaterDaySelector = document.querySelector('#daily-water');

//data
// let allUsers = new UserRepository(userData);



//functions


// const getData = () => {
//   let promises = Promise.all([fetchUserData(), fetchSleepData(),fetchhydrationData(),
//   fetchActivityData()]).then(data => console.log(data)})
// }
// console.log(fetchUserData());
// console.log(users);
// getData();

let allUsers;
let luisa;
let hydrationUser;
let ourUser;

const getRandomNumber = (array) => {
    return Math.floor(Math.random() * array.length);
}

const renderCharts = (date, dailyData, dates, weeklyData) => {
  addDataToCharts(dailyHydration, date, dailyData)
  addDataToCharts(weeklyHydration, dates, weeklyData)
}

const addDataToCharts = (chart, label, data) => {
    chart.data.labels = [label];
    chart.data.datasets.forEach((dataset) => {
        dataset.data = [data];
    });
    chart.update();
}

const loadUserInfo = (id) => {
    // let randomIndex = getRandomNumber(userData)
    // let randomUser = userData[randomIndex];
    fetchData(id);
}

const fetchData = (id) => {
  return Promise.all([fetchUserData(), fetchSleepData(), fetchHydrationData()])
  .then(data => {allUsers = new UserRepository(data[0].userData);
    hydrationUser = new Hydration(data[2].hydrationData, id);
    console.log(hydrationUser);
   })
  .then(() => {ourUser = allUsers.users[id]})
  //DOM
  .then(() => generateUserInfoCard(ourUser))
  .then(() => generateHydrationCard(hydrationUser, ourUser))

}

//Data/DOM; initial function on Load
const loadPage = () => {
    loadUserInfo(2)
}

//DOM
const generateUserInfoCard = (user) => {
    userName.innerText = user.returnFirstName();
    userDailyStepGoal.innerText = user.dailyStepGoal;
    userID.innerText = user.id;
    userAddress.innerText = user.address;
    userEmail.innerText = user.email;
    userStrideLength.innerText = user.strideLength;
    userFriends.innerText = user.friends;
    stepGoalComparison.innerText = allUsers.getAvgStepGoal();
}

//DOM
const generateHydrationCard = (hydration, user) => {
  let day = dailyWaterDaySelector.value
  console.log(day)
  let dailyWater = user.dailyWater(hydration, day)
  dailyHydrationData.innerText = dailyWater

  weeklyHydrationData.forEach((day, index) => {
    day.innerText = user.weeklyWater(hydration, ["2019/06/15", "2019/06/16","2019/06/17","2019/06/18","2019/06/19","2019/06/20","2019/06/21"])[index]
  })

  allTimeAvgHydrationData.innerText = user.totalAvgWater(hydration);

addDataToCharts(dailyHydration, day, dailyWater)
}

const displayHydration = () => {
    toggleHidden(hydrationDropdown);
}

const toggleHidden = (element) => {
    element.classList.toggle("hidden");
}

const infoButton = () => {
    toggleHidden(infoDropdownContent);
}

const doTheThing = () => {
  console.log(dailyWaterDaySelector.value)
}
//eventListeners
window.addEventListener('load', loadPage)
moreInfoBtn.addEventListener('click', infoButton)
hydrationTitle.addEventListener('click', displayHydration);
dailyWaterDaySelector.addEventListener('click', doTheThing)
/*
For your user (or any user you choose), add:

A display to show how much water they have consumed today (these displays are often called “widgets” in the FE tech world)
A display to show much water they have consumed each day over the course of the latest week*/
