'use strict'

const haveAnAccount = document.querySelector("#have-question");
const donotHave = document.querySelector("#donotHave");

const register = document.querySelector(".register");
const login = document.querySelector(".login");

haveAnAccount.addEventListener("click", function(){
    login.style.transform = "translateX(-260px)";
    register.style.transform = "translateX(0px)";
});

donotHave.addEventListener("click", function() {
    login.style.transform = "translateX(0px)";
    register.style.transform = "translateX(260px)";
})
