$(function() {
    // sets time to 0 to calc the time it took to react

    let time = 0;
    let interval;
    let timeDelay;
    let delay;

    // adds click function to start the game

    $(`.reactionBox`).on('click', function() {
        // remove click function

        $(`.reactionBox`).off('click');

        // add click function to see if they failed or did it

        $('.reactionBox').on('click', function() {
            $(`.reactionBox`).css('display', 'none');
            if($(`.reactionBox`).css('background-color') == "rgb(156, 14, 14)"){
                // checks to see if failed
                
                fail();
            }else {
                //else calc time took to click

                calcTime();
            }
        });

        // change css to indicate that they started

        $(`.reactionBox`).css('background-color', 'rgb(156, 14, 14)');
        $(`.reactionBox`).text('Click when color turns green');

        // generate random number

        delay = Math.floor(Math.random() * 6 + 3);

        // set delay funtion

        timeDelay = setTimeout(function() {
            $(`.reactionBox`).css('background-color', 'limegreen');
            $(`.reactionBox`).text('Click to see reaction time!');
            interval = setInterval(function() {
                time++;
            },10)
        }, delay * 1000);

    });

    // 

    function calcTime() {
        $(`.sucess`).text(`Congrats!! You reacted in ${time * 10}ms`);
        $(`.sucess`).css("display", "flex");
        let newButton = document.createElement('button');
        newButton.setAttribute('id', "Restart");
        newButton.textContent = "Restart";
        newButton.style.width = "125px";
        newButton.onclick = function(){
            restart();
        };
        $(`.sucess`).append(newButton);
        clearTimeout(timeDelay);
        clearInterval(interval);

    };

    function fail() {
        $(`.failed`).text(`You have failed. Please try again.`);
        $(`.failed`).css("display", "flex");
        let newButton = document.createElement('button');
        newButton.setAttribute('id', "Restart");
        newButton.textContent = "Restart";
        newButton.style.width = "125px";
        newButton.onclick = function(){
            restart();
        };
        $(`.failed`).append(newButton);
        clearTimeout(timeDelay);
        clearInterval(interval);
    }

    function restart() {

        time = 0;
        $(`.reactionBox`).css('background-color', 'rgb(156, 14, 14)');
        $(`.reactionBox`).text('Click when color turns green');
        $(`.reactionBox`).css('display', 'flex');
        $(`.failed`).css("display", "none");
        $(`.sucess`).css("display", "none");
        timeDelay = setTimeout(function() {
            $(`.reactionBox`).css('background-color', 'limegreen');
            $(`.reactionBox`).text('Click to see reaction time!');
            interval = setInterval(function() {
                time++;
            },10)
        }, delay * 1000);

    }
})