$(function() {
    let timeElem = document.getElementById('timer');
    let time = 99;
    let second = 7;
    let minute = 0;
    let hour = 0;
    let countdownTimer;
    let clicks = 0;
    timeElem.textContent = "00:00:08.00";

    $('#clickArea').on('click', function() {
        countdown();
    });

    clickArea.addEventListener('click', addClick);

    function countdown() {
        $('#clickArea').off('click');
        countdownTimer = setInterval(function() {
            time--;
            if(time == 0) {
                second--;
                time = 99;
            }

            if(second < 0) {
                clearInterval(countdownTimer);
                cps.textContent = (clicks / 8).toFixed(2);
                pCPS.style.display = "flex";
                timeElem.textContent = `00:00:00.0`;
                clickArea.textContent = "Restart";
                clickArea.style.visibility = "hidden"
                setTimeout(function(){clickArea.style.visibility = "visible"}, 1500)
                return;
            }
            timeElem.textContent = `0${hour}:0${minute}:${second}.${time}`;
        },10)
    }

    function addClick() {
        if(clickArea.textContent == "Click Here") {
            clicks++;
            click.textContent = clicks
        }else {
            restart();
        }
    }

    function restart() {
        console.log(`doesnt work`)
        clicks = 0;
        click.textContent = clicks
        pCPS.style.display = "none";
        clickArea.textContent = "Click Here";
        $('#clickArea').on('click', function() {
            countdown();
        });
        time = 99;
        second = 7;
    }
})