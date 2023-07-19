import React from 'react';
import Ding from '../Sound/DING.mp3';
import {Howl, Howler} from 'howler';
import {Button} from 'react-bootstrap';


const Timer = (props) =>{
    Howler.volume(0.5);
    var hours = Math.trunc(Math.floor(props.time/60));
    var minutes = Math.trunc(props.time - 60 * hours);
    var seconds = Math.trunc((props.time - Math.floor(props.time))*100); 

    const [paused, setPaused] = React.useState(true);
    const [over, setOver] = React.useState(false);
    const [time, setTime] = React.useState({
        hours: parseInt(hours, 10),
        minutes: parseInt(minutes, 10),
        seconds:parseInt(seconds,10)
    });


    const tick=()=>{
        if(paused || over) return;

        if(time.hours === 0 && time.minutes === 0 && time.seconds === 0){
            var sound = new Howl({
                src:[Ding]
            })
            sound.play();
            setOver(true);
        } else if (time.minutes === 0 && time.seconds === 0){
            setTime({
                hours: time.hours - 1,
                minutes: 59,
                seconds: 59
              });
        } else if (time.seconds === 0){
            setTime({
                hours: time.hours,
                minutes: time.minutes - 1,
                seconds: 59
              });
        } else {
            setTime({
                hours: time.hours,
                minutes: time.minutes,
                seconds: time.seconds - 1
              });
        }
        
    };

    const reset = () => {
        setTime({
          hours: parseInt(hours),
          minutes: parseInt(minutes),
          seconds: parseInt(seconds)
        });
        setPaused(true);
        setOver(false);
      };
    
      React.useEffect(() => {
        let timerID = setInterval(() => tick(), 1000);
        return () => clearInterval(timerID);
      });
    




    return(
        <div className="timerDiv">
            <p>{`${time.hours
        .toString()
        .padStart(2, '0')}:${time.minutes
        .toString()
        .padStart(2, '0')}:${time.seconds.toString().padStart(2, '0')}`}</p>
      <div>{over ? "Timpul A Expirat !!!" : ''}</div>
      <div className="timerButtons">
      <div className="timerButton">
      <Button  onClick={() => setPaused(!paused)}>
        {paused ? 'Start' : 'Pause'}
      </Button>
      </div>
      <div className="timerButton">
      <Button variant="danger" onClick={() => reset()}>Restart</Button>
      </div>
      </div>
      </div>
    );
};

export default Timer;