//the universal timer for this will be 20 minutes.
import chalk from "chalk";
function countdownTimer(startTime) {

  setInterval(()=>{
    startTime--;
    if(startTime<=0){
      console.log(chalk.red('Ran out of Time'))
      clearInterval(timerId);
    }
    else{
      //i wanted to get this to appear as a "you did quiz in Mins:Secs"
      //but couldnt get it to cooperate, so i left this here for test purposes.
      //console.log(`${Math.floor(startTime/60)}:${startTime%60}`)
    }
  },1000);
  const timerId=setInterval(()=>{})
  return timerId;
}
export {countdownTimer};

