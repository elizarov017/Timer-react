import React, { useState } from 'react';
import { timer } from "rxjs";

import Time from './Time';
import Button from './Button';

export default function Timer() {

    const [time, setTime] = useState(0);
    const [paused, setPaused] = useState(0);
    const [stopped, setStopped] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [subscribtion, setSubscribtion] = useState(null);

    const source = timer(0, 1000); // standart timer for 1 sec

    //
    // «Start / Stop» - запуск / остановка отсчета времени, останавливает и обнуляет значение таймера.
    const startStop = () => {
        if (subscribtion != null && !stopped && paused === 0) {
            subscribtion.unsubscribe();
            setStopped(true);
        }
        else if (subscribtion == null || stopped) {
            setSubscribtion(source.subscribe((val) => {
                    setTime(val);
                })
            );
            setStopped(false);
        }
        else if (paused > 0) {
            setSubscribtion(source.subscribe((val) => {
                    setTime(val + paused);
                })
            );
            setPaused(0);
        }
    }


    //
    // «Wait» - работает на двойной клик (время между нажатиями не более 300 мс!) таймер должен прекратить отсчет времени; 
    // если после него нажать старт, то возобновляется отсчет.
    const wait = () => {
        if (clicked) {
            setPaused(time);
            subscribtion.unsubscribe();
        }
        else {
            setClicked(true);
            setTimeout(() => setClicked(false), 300);
        }
    }


    //
    // «Reset» - сброс таймера на 0.  Обнуляет таймер и снова начинает отсчет.
    const reset = () => {
        subscribtion.unsubscribe();
        setSubscribtion(source.subscribe((val) => {
                setTime(val);
            })
        );
    }
 
    return (
        <div className="timer">
            <Time time={ time }></Time>
            <div className="buttons">
                <Button className="startStop" text="Start/Stop" onClick={ () => startStop() }></Button>
                <Button className="wait" text="Wait" onClick={ () => wait() }></Button>
                <Button className="reset" text="Reset" onClick={ () => reset() }></Button>
            </div>
        </div>
    )

}
