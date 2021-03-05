$(function () {
    let time = 0;
    let second = 0;
    let minute = 0;
    let hour = 0;
    let timeElem = document.getElementById('timer');
    let timer;
    let temp = [];
    let currentTime = 0;
    let laps = 0;
    let lastCurrentLapTime = 0;

    $(`#addMinute`).on('click', function () {
        minute++;
    })

    timeElem.textContent = "00:00:00.00";
    timeControl.addEventListener('click', function () {
        if (timeControl.textContent == "Start") {
            start();
        } else if (timeControl.textContent == "Stop") {
            stop();
        }
    });
    lap.addEventListener('click', function () {
        if (lap.textContent == "Lap") {
            addLap()
        } else {
            restart();
        }
    });

    function start() {
        timer = setInterval(function () {
            addTime();
            time++;
            timeControl.textContent = "Stop";
            lap.textContent = "Lap";
        }, 10)
    }

    function stop() {
        clearInterval(timer);
        timeControl.textContent = "Start";
        lap.textContent = "Restart";
    }

    function addTime() {
        if (time >= 100) {
            second++
            time = 0;
        }

        if (second >= 60) {
            minute++;
            second = 0;
        }

        if (minute >= 60) {
            hour++;
            minute = 0;
        }

        if (second < 10) {
            second = Number(second);
            second = "0" + second;
        }

        if (minute < 10) {
            minute = Number(minute);
            minute = "0" + minute;
        }

        if (hour < 10) {
            hour = Number(hour);
            hour = "0" + hour;
        }

        if (time < 10) {
            time = Number(time);
            time = "0" + time;
        }

        timeElem.textContent = hour + ":" + minute + ":" + second + "." + time;

        if (minute == 0) {
            currentTime = `${second}.${time}`;
        } else if (hour == 0) {
            currentTime = `${minute}:${second}.${time}`;
        } else {
            currentTime = `${hour}:${minute}:${second}.${time}`;
        }
    }
    let firstLap;
    let newLi;
    function addLap() {

        let tempTime = time + second*100 + minute*60*100 + hour*60*60*100;
        if (laps == 0) {
            firstLap = tempTime;
            console.log(firstLap);
            laps++;
            newLi = document.createElement('li');
            newLi.setAttribute('id', `lap${laps}`);

            newLi.textContent = currentTime;
        } else {
            laps++;
            newLi = document.createElement('li');
            newLi.setAttribute('id', `lap${laps}`);

            tempTime = tempTime - firstLap;
            let tempHour = Math.floor(tempTime / (60*60*100));
            tempTime = tempTime % (60*60*100);
            let tempMin = Math.floor(tempTime / (60*100));
            tempTime = tempTime % (60*100);
            let tempSec = Math.floor(tempTime / (100));
            tempTime = tempTime % (100);
            


            newLi.textContent = `-${tempHour}:${tempMin}:${tempSec}.${tempTime}`;
        }



        // }else {
        //     if(minute > 0) {
        //         if(laps == 2){
        //             let temp = currentTime.split(":");

        //             let tempCurrentTime = Number(temp[0]* 60) + Number(temp[1]);
        //             let tempMin = 0;
        //             if(tempCurrentTime >= 60) {
        //                 tempMin = (tempCurrentTime / 60).toFixed(0);

        //                 let convMin = (tempMin * 60).toFixed(0);
        //                 let difference = tempCurrentTime - convMin;
        //                 let putTogether;

        //                 if(difference.toFixed(2) < 10) {
        //                     putTogether = `${tempMin}:0${difference.toFixed(2)}`;
        //                 }else {
        //                     putTogether = `${tempMin}:${difference.toFixed(2)}`;
        //                 }

        //                 if(lastCurrentLapTime.split(':').length == 2) {
        //                     let splitLast = lastCurrentLapTime.split(':');
        //                     let differenceMin = (temp[0] - splitLast[0]).toFixed(0);
        //                     let differenceSec = (temp[1] - splitLast[1]).toFixed(2);
        //                     if(differenceSec < 10) {
        //                         differenceSec = "0"+differenceSec;
        //                     }
        //                     lastCurrentLapTime = `${differenceMin}:${differenceSec}`;
        //                     newLi.textContent = lastCurrentLapTime;

        //                 }else if(lastCurrentLapTime.split(':').length == 3) {

        //                 }else {

        //                 }

        //                 // newLi.textContent = finalDifference;


        //             }else {
        //                 let newLapTime = currentTime - lastCurrentLapTime;
        //                 newLi.textContent = newLapTime.toFixed(2);
        //             }

        //         }else {

        //         }

        //     }else {
        //         let newLapTime = tempCurrentTime - lastCurrentLapTime;
        //         newLi.textContent = newLapTime.toFixed(2);
        //     }

        // }

        lapList.append(newLi);
        lastCurrentLapTime = currentTime;
    }

    function restart() {
        laps = 0;
        lapList.innerHTML = '<p id="title">Laps:</p>';
        timeElem.textContent = "00:00:00.00";
        currentTime = 0;
        time = 0;
        second = 0;
        minute = 0;
        hour = 0;
        lap.textContent = "Lap";
    }
});