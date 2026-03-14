import chalk from "chalk";
import {select} from "@inquirer/prompts";
import {countdownTimer} from "./triviaTimer.js";
export async function showMnMenu(Questions){
    const actions = await select({
        message: "Xenoblade Chronicles Trivia\na 20 minute timer will start when you start the quiz",
        
        choices:[
            {name:"Start Quiz", value:"start"},
            {name:"Quit", value:"Quit"},
        ],
    });
    switch(actions){
        case "start":
            await startGame(Questions);
            break;
        case "Quit":
            console.log("Goodbye");
            process.exit(0);
    }
}
export async function startGame(Questions){
    //get question numbers and quiz timer
    const qstnNums = Object.keys(Questions);
    let timerId = countdownTimer(1200);
    //convert timer to readable time 'MM:SS'
    //loop questions based on if isAnswered is false and the timer isnt 0
    while(qstnNums.some(num=>!Questions[num].isAnswered) && timerId){
        for(let num of qstnNums){
            if(!Questions[num].isAnswered){

                const qstn = Questions[num];
                const answer = await select({
                    //message should show Timer but in minutes and seconds instead of just seconds.
                    message:qstn.question,
                    choices:qstn.choices
                });
                qstn.isAnswered=true;
                if(answer===qstn.answer){
                    console.log(chalk.green("Correct!"));
                    qstn.correct=true;
                }else{
                    console.log(chalk.red("Wrong!"));
                }
                
            }
        }
        
    }
    //check all answered and output a percentage grade
    const correct = qstnNums.filter(num=>Questions[num].correct).length;
    const total = qstnNums.length;
    const percentage = (correct/total)*100;
    console.log(`You got ${correct}/${total} correct!`);
    console.log(`Your score is ${percentage}%!`);
    //ask if theyd like to retake quiz, yes = restart, no = quit
    const actions = await select({
        message:'want to try again?',
        choices:[
            {name:"Yes", value:"yes"},
            {name:"No", value:"no"}
        ]
    });
    if(actions==="yes"){
        await resetQuiz(Questions);
    }else{
        console.log("Goodbye!");
        process.exit(0);
    }

}
export async function resetQuiz(Questions){
    //resets the .isAnswered and .Correct flags back to false allowing to restart the quiz
    const qstnNums = Object.keys(Questions);
    qstnNums.forEach(num=>{
        Questions[num].isAnswered=false;
        Questions[num].correct=false;
    });
    showMnMenu(Questions);
}       