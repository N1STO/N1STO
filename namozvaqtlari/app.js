window.addEventListener("DOMContentLoaded", () => {
    /* --------------------------- === TOGGLE MENU === -------------------------- */
  
    const accordion = document.querySelector(".accordion");
    const panel = document.querySelector(".panel");
    const toggle = document.getElementById("toggle");
  
    toggle.addEventListener("click", () => {
      panel.classList.toggle("active");
      accordion.classList.toggle("active");
  
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  
    /* ------------------------------ Select region ----------------------------- */
  
    const region = document.getElementById("region");
    const reg = document.getElementById("reg");
    const regions = document.querySelectorAll("li");
  
    regions.forEach((item) => {
      item.addEventListener("click", (e) => {
        const selectRegion = e.target.innerText;
        region.innerText = selectRegion;
        panel.style.maxHeight = null;
        accordion.classList.remove("active");
      });
    });
  
    /* ------------------------------ Date and time ----------------------------- */
  
    const hour = document.getElementById("hour");
    const newDate = document.querySelector(".date");
  
    updateDate();
  
    function updateDate() {
      const date = new Date();
      const newHour = date.getHours();
      const newMin = date.getMinutes();
      const newSecund = date.getSeconds();
  
      hour.innerHTML =
        getZero(newHour) + ":" + getZero(newMin) + ":" + getZero(newSecund);
  
      setTimeout(updateDate, 1000);
      newDate.innerHTML = dateBuilder(date);
    }
  
    function getZero(num) {
      if (num >= 0 && num < 10) {
        return "0" + num;
      } else {
        return num;
      }
    }
  
    // Set Date
  
    function dateBuilder(a) {
      let months = [
        "Yanvar",
        "Fevral",
        "Mart",
        "April",
        "May",
        "Iyun",
        "Iyul",
        "Avgust",
        "Sentabr",
        "Oktabr",
        "Noyabr",
        "Dekabr",
      ];
      let weekDays = [
        "Yakshanba",
        "Dushanba",
        "Seshanba",
        "Chorshanba",
        "Payshanba",
        "Juma",
        "Shanba",
      ];
  
      let haftaKuni = weekDays[a.getDay()];
      let sana = a.getDate();
      let oyNomi = months[a.getMonth()];
      return `${haftaKuni}, ${sana}-${oyNomi}`;
    }
  
    /* ------------------------- Get praying time by API ------------------------ */
  
    const prayTimes = document.querySelectorAll(".pray-time");
    const cards = document.querySelectorAll(".card");
  
    const api = {
      baseurl: "https://islomapi.uz/api/present/",
    };
  
    async function getResult(query) {
      const res = await fetch(`${api.baseurl}day?region=${query}`);
      const result = await res.json();
      displayResult(result);
    }
  
    getResult(reg.innerHTML);
  
    regions.forEach((region) => {
      region.addEventListener("click", (e) => {
        getResult(e.target.innerHTML);
      });
    });
  
    function displayResult(time) {
      // console.log(Object.values(time.times));
      reg.innerHTML = time.region;
      prayTimes.forEach((item, index) => {
        item.innerHTML = Object.values(time.times)[index];
      });
  
      removeCardActive();
    }
  
    /* ---------------------- ADD ACTIVE PRAYING TIME CLASS --------------------- */
  
    const dates = new Date();
    const newHour = dates.getHours();
    const newMin = dates.getMinutes();
    const nowTime = getZero(newHour) + ":" + getZero(newMin);
  
    function removeCardActive() {
      let currentTimeToString = nowTime.split(":").join("");
      const newArr = [];
  
      prayTimes.forEach((time) => {
        newArr.push(time.innerHTML.split(":").join(""));
      });
  
      let number = newArr.reverse().find((e) => e <= currentTimeToString);
  
      let sortedArr = newArr.sort(function (a, b) {
        return a - b;
      });
  
      const cardActiveIndex = newArr.indexOf(number);
  
      cards.forEach((card) => {
        card.classList.remove("active");
      });
  
      if (currentTimeToString >= "0000" && currentTimeToString < sortedArr[0]) {
        cards.forEach((card) => {
          card.classList.remove("active");
        });
        cards[5].classList.add("active");
      } else {
        cards[cardActiveIndex].classList.add("active");
      }
  
      setTimeout(removeCardActive, 10000);
    }
  
    /* ----------------------------- SET HIJRIY YEAR ----------------------------- */
  
    const hijriYear = new Intl.DateTimeFormat("en-EN-u-ca-islamic", {
      day: "numeric",
      year: "numeric",
      month: "long",
    }).format(Date.now());
  
    hijri.innerHTML = hijriYear;
  });




  // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBl8kCG393XLTkXN-FWhXtJL_7kY3WevqI",
  authDomain: "namoz-vaqtlari-1de3a.firebaseapp.com",
  projectId: "namoz-vaqtlari-1de3a",
  storageBucket: "namoz-vaqtlari-1de3a.appspot.com",
  messagingSenderId: "1004436362600",
  appId: "1:1004436362600:web:458c1c9995fb6bc56ff2dd",
  measurementId: "G-7T5DWEGPD0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);