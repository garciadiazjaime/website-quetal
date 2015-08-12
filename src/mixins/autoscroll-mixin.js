var AutoScroll = {

    inProgress: false,

    /**
    * Function to autoscoll using an easing animation
    * {string} elementID Element to where scroll
    **/
    autoScrollTo: function(elementID){
        var wrapper = document.getElementById(elementID);
        
        if(wrapper && !AutoScroll.inProgress){
            var initYPos = Math.round(document.body.scrollTop) || Math.round(document.documentElement.scrollTop);
            var endYPos = Math.round(wrapper.offsetTop);
            var duration = 1000;
            var startTime = (new Date()).getTime(); //start time
            var isGoingDown = initYPos <= endYPos ? true : false;
            var waitFor = 4;
            AutoScroll.inProgress = true;
            
            //calculate elapse time 
            var interval = setInterval(function () {

                var elapsed = (new Date()).getTime() - startTime;
                
                //check if elapse time is less than duration
                if (elapsed < duration) {

                    // animate using an easing equation
                    var jump = AutoScroll.ease(isGoingDown, elapsed, initYPos, endYPos, duration)
                    window.scrollTo(0, jump);  
                } 
                //animation is complete, stop interval timer
                else {    
                    clearInterval(interval);
                    interval = null;
                    AutoScroll.inProgress = false;
                }
            }, waitFor);
        }
    },

    /**
    * Function to generate a jump based on accelaration
    * {boolean} isGoingDown true if is going down, false otherway
    * {numeric} elapseTime how many millesecons have passed
    * {numeric} initYPos Y point where animation starts
    * {numeric} endYPos Y point where animation ends
    * {numeric} duration animation duration in milliseconds
    * @numeric
    **/
    ease: function(isGoingDown, elapseTime, initYPos, endYPos, duration) {
        var teta = elapseTime / duration * (Math.PI / 2);
        var proportion = isGoingDown ? Math.sin(teta) : Math.cos(teta);
        var jump = isGoingDown ?
            Math.round((endYPos - initYPos) * proportion + initYPos) :
            Math.round((initYPos - endYPos) * proportion + endYPos);
        return jump;
    }

};

module.exports = AutoScroll;
