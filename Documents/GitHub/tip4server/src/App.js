import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import Total from './components/Total';
import List from './components/List';

function App() {
  return (
    <div>
       <Container>
        <h1 className="text-center m-3">Tip 4 Server</h1>
        <Row>
          <Col className="border-column">
            <Total/>
          </Col>
        </Row>
        <Row>
          <Col>
            <List/>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;


// UI
// 3 different section 
// Top - Total Tip with 3 blanks - cash, online, card
// Middle - Kitchen,  Able to add person who works a day
// Bottom - Hall, Also able to add person who works a day

//Top 3 Blanks on left, 2 blanks on right, top - Total - cash $, Bottom Total $

//Middle -  In the Box  3 objections - Name, Work hour (Wheel), Tip

//Bottom - Select 2 options - Divided 2 or put workhour - In the Box - Name, Work hour(wheel), Tip

//Add Calculation on top after input each blanks, Add all Value and show in Total

//After showing Total , x0.45 -> Kitchen. x0.55 -> Hall

//Middle, Bottom option 1 - next to person’s name, Able to add work hour 0 to 5 and .5 each (wheel)

// Kitchen, Bottom option 1 -> tip Value = @@

// Bottom option 2 - Automatically /2
