'use strict'

const activeList = document.querySelectorAll('.specific-list-choice');

// weather queries info
let weather;
let dayOrNight;
let userCity;
let localTime = document.querySelector('#time');
let morOrNight = document.querySelector('#mor-or-night');
const inputFile = document.querySelector("#input-file");
const fileName = document.querySelector("#file-name");

// responsive nav
const nav = document.querySelector(".responsive-nav");
const tag = document.querySelector("#nav-toggle");

const wavesurfer = WaveSurfer.create({
    container: '#waveform', // connect the wave with the dev
    waveColor: '#1e0af8',   // the primary color
    progressColor: '#745ce9', // color when turing on
    cursorColor: '#adacb3',   // indctor color
    barWidth: 2,            // columns widht
    barRadius: 3            // around the edges
});


// on off button
document.querySelector('#playButton').addEventListener('click', () => {
    wavesurfer.playPause();
});


// file 
let dragDrop = document.querySelector(".drag-drop-container");

activeList[0].classList.add('active-list');


for (let list of activeList)
{
    list.addEventListener('click', function() {
    if(!list.classList.contains('active-list'))
    {
        for (let i = 0; i < activeList.length; i++)
        {
            activeList[i].classList.remove('active-list');
        }
    }
        list.classList.add('active-list');
    });
}

// get user location for the weather display
navigator.geolocation.getCurrentPosition(position => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=fc86fb40dccbd5b597ec08467795c4df`).then(response => 
        {
            if(!response.ok)
            {
                throw new Error(`HTTP Error ${response.status}`);
            }
            return response.json();
        }).then(data => {
        weather = data.weather[0]['main'];
        dayOrNight = data.weather[0]['icon'];
        userCity = data.name
        if(dayOrNight.slice(-1) === 'n')
        {
            morOrNight.innerHTML = "🎑";
        }

        else {
            morOrNight.innerHTML = "🌅"
        }

    }).catch(error => {
        console.log(error);
    })},
(error) => {
    console.log("something went wronge");
    }
);

function time()
{
    const now = new Date();
    localTime.innerHTML = now.toLocaleString(undefined, {
        weekday: "long",
        year: "numeric",
        day:"numeric",
        hour:"2-digit",
        minute: "2-digit",
        second: "2-digit"
    });
}

setInterval(time, 1000);


// drag drop file

const checkFileExtention = function(fileName)
{
    if(fileName.name.slice(-4) !== '.wav')
        return false

    return true
}

dragDrop.addEventListener('dragover', function(e)
{
    e.preventDefault()
});

dragDrop.addEventListener('drop', function(e)
{
    e.preventDefault();
    const fileSrc = document.querySelector('#file-preview');
    const file = e.dataTransfer.files[0];
    const dropMessage = document.querySelector("#drag-drop-message");
    if(checkFileExtention(file))
    {

        fileSrc.src = URL.createObjectURL(e.dataTransfer.files[0]);
        wavesurfer.load(URL.createObjectURL(e.dataTransfer.files[0]));
        fileName.innerHTML = file.name;
        dropMessage.innerHTML = "";

    }
    else {
        dropMessage.innerHTML = "You have to enter a .wav file";
    }
});


inputFile.addEventListener("change", function(){
    const file = inputFile.files[0];
    const fileSrc = document.querySelector('#file-preview');
    const dropMessage = document.querySelector("#drag-drop-message");

    if(checkFileExtention(file))
    {
        fileSrc.src = URL.createObjectURL(file);
        wavesurfer.load(URL.createObjectURL(file));
        dropMessage.innerHTML = "";
        fileName.innerHTML = file.name;
    }
    else {
        dropMessage.innerHTML = "You have to enter a .wav file";
    }
    
});


// responsive nav
tag.addEventListener("click", function(){
    console.log("hi")
    nav.classList.toggle("active-res-nav");
});