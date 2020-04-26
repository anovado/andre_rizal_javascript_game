
// class startTimer {
//     constructor(duration) {
//         let timer = duration, minutes, seconds;
//         // let display = document.querySelector('#time');
//         let timerObj = setInterval(duration);
//         this.stop = function () {
//             if (timerObj) {
//                 clearInterval(timerObj);
//                 timerObj = null;
//             }
//             return this;
//         };
//         // start timer using current settings (if it's not already running)
//         this.start = function () {
//             if (!timerObj) {
//                 this.stop();
//                 timerObj = setInterval(timer);
//             }
//             return this;
//         };
//         // start with new or original interval, stop current interval
//         this.reset = function (newT = duration) {
//             duration = newT;
//             return this.stop().start();
//         };
//     }
// }

// let timer = new startTimer(function () {
//     // let timer = duration, minutes, seconds;
//     let display = document.querySelector('#time');
//     minutes = parseInt(timer / 60, 10);
//     seconds = parseInt(timer % 60, 10);

//     minutes = minutes < 10 ? "0" + minutes : minutes;
//     seconds = seconds < 10 ? "0" + seconds : seconds;

//     display.textContent = minutes + ":" + seconds;

//     if (timer > 0) {
//         --timer;
//     }
// }, 1000);

