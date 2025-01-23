import { useEffect, useState } from 'react';
import './App.css';
import data from './util/question.json';
import useSound from 'use-sound';
import playPath from './util/play.mp3';
import correctPath from './util/correct.mp3';
import wrongPath from './util/wrong.mp3';
import waitPath from './util/wait.mp3';

function App() {
  const [play] = useSound(playPath, { volume: 0.5 });
  const [wrong] = useSound(wrongPath, { volume: 0.5 });
  const [wait] = useSound(waitPath, { volume: 0.5 });
  const [correct] = useSound(correctPath, { volume: 0.5 });
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(10);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (started && time < 1) {
      setTime(10);
      if (currentQ < data.length) {
        setCurrentQ((prev) => prev + 1);wait();
        setSelected(null);
      }
      wrong();
    }
  }, [time, started]);

  useEffect(() => {
    if (started) {
      const timer = setInterval(() => setTime((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [started, currentQ]);

  const handleStart = () => {
    play();
    setStarted(true);
  };
useEffect(()=>{

},[])
  const handleClick = (otp) => {
    
    setSelected(otp.text);
    
      if (otp.correct) {
        correct();
        setScore((prev) => prev + 1);
      } else {
        wrong();
      }
      setTimeout(() => {
        if (currentQ < data.length - 1) {
          wait();
          setCurrentQ((prev) => prev + 1);
          setSelected(null);
          setTime(10);
        } else {
          setStarted(false);
        }
      }, 1000); 
  };

  return !started ? (
    <div className="quizz-app">
      <div className="start-screen">
        <h1>Welcome to the Quiz</h1>
        <button onClick={handleStart}>Start</button>
      </div>
    </div>
  ) : currentQ >= data.length ? (
    <div className="quizz-app">
      <div className="head">
        <h1>{ play()}
          WoW! Score {score}/{data.length}
        </h1>
        <button
          onClick={() => {
            play();
            setCurrentQ(0);
            setScore(0);
            setTime(10);
            setStarted(false);
          }}>
          Restart
        </button>
      </div>
    </div>
  ) : (
    <div className="quizz-app">
      <div className="head">
        <h1>
          Score {score}/{data.length}
        </h1>
        <button
          onClick={() => {
            setCurrentQ(0);
            play();
            setSelected(null);
            setTime(10);
            setScore(0);
          }}>
          Restart
        </button>
      </div>
      <div className="Question">
        <p>
          Question {currentQ + 1}: {data[currentQ].question}
        </p>
      </div>
      <div className="Options">
        {data[currentQ].answer.map((m, idx) => (
          <button
            key={idx}
            className="btn"
            onClick={() => handleClick(m)}
            disabled={selected}
            style={{
              backgroundColor:
                selected === m.text ? (m.correct ? 'green' : 'red') : '',
            }}>
            {m.text}
          </button>
        ))}
      </div>
      <div className="timer">
        <p>
          Time Left: <span>{time}</span>s
        </p>
      </div>
    </div>
  );
}

export default App;
