import {useState} from "react";
import './App.css';
import Box from "./components/Box";
import rock from "./img/rock.png";
import scissors from "./img/scissors.png";
import paper from "./img/paper.png";


//Logic - 
//1. Need two boxes for game -In Box (title, photo, result)- 
//2. Bottom centre- imoticon button of sissors, rock, paper
//3. If click the button result is showing in the box
//4. Computer gonna choose randomly
//5. Result of 3,4 showing the winner
//6. Depends on the Result box color will be changed (win-green, tie-black, lost- red)
const choice = {
  rock: {
    name:"Rock",
    img: rock
  },
  scissors: {
    name:"Scissors",
    img: scissors
  },
  paper: {
    name:"Paper",
    img: paper
  }
};

function App() {

  const [userSelect, setUserSelect] = useState(null);

  const [computerSelect, setComputerSelect]= useState(null);

  const [result,setResult] = useState("");


  //Component for play the game
  const play = (userChoice) => {
    setUserSelect(choice[userChoice]);
    let computerChoice = randomChoice();
    setComputerSelect(computerChoice); // Computer choosing random Array
    setResult(judgement(choice[userChoice], computerChoice ));
  };

  const randomChoice = () => {
    let itemArray = Object.keys(choice); // function to make Array from one of object value, 객체의 키값만 뽑아서 Array로 만들어주는 함수
    console.log("item array", itemArray);
    
    let randomItem = Math.floor(Math.random() * itemArray.length); //Math.floor //버림함수
    console.log("random value", randomItem);

    let final = itemArray[randomItem];
    
    return choice[final];
    // 객체에서 랜덤한 값을 뽑는 방식, Pickup random value from the Object
  };

  const judgement = (user, computer) => {
    console.log("user", user, "computer", computer);

    // Roshambo logic 
    // 1. user # == computer # => tie
    // 2. user = rock(0) > computer = Scissors(2) => user (0) win, (2) loose
    // 3. user = rock(0) < computer = paper(1) => computer (1) win, (0) loose
    // 4. user = Scissors(2) > computer = paper(1) => user (2) win, (1) loose
    // 5. user = Scissors(2) < computer = rock(0) => computer (0) win, (2) loose
    // 6. user = paper(1) > computer = rock(0) => user (1) win, (0) loose
    // 7. user = paper(1) < computer = scissors(2) => computer (2) win, (1) loose
    //*However 0,1,2 are Object*

    if (user.name == computer.name) {
      return "tie";
    } else if (user.name == "Rock")
      return computer.name == "Scissors" ? "win" : "lose";
    else if (user.name == "Scissors")
      return computer.name == "Paper" ? "win" : "lose";
    else if (user.name == "Paper")
      return computer.name == "Rock" ? "win" : "lose";
  };
    //삼항연산식으로 위에 로직을 정리함
    //밑에꺼를 위에꺼로 삼항연산식으로 바꿈
    // {if(computer == "Scissors"){
    //     return "win"
    //   }else{
    //     return "lose"
    //   }
    // }
 
  return (
    <div>
      <div className="main">
        <Box title="You" item={userSelect} result={result} />
        <Box title="Computer" item={computerSelect} result={result} />
      </div>

      <div className="main">
        <button onClick={() => play("rock")}>Rock</button> 
        <button onClick={() => play("paper")}>Paper</button>
        <button onClick={() => play("scissors")}>Scissors</button>
      </div>
    </div>
  );
}

export default App;

//.button :() => Need to put as callback function