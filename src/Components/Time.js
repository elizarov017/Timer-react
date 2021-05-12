import React from 'react';

export default function Time(props) {

    const time = props.time;
    const hours = parseInt(time/3600);
    const minutes = parseInt(time/60) - hours * 60;
    const seconds = time % 60;

    return (
        <>
            <span className="time" > { hours > 9? "" : "0" }{ hours }:{ minutes > 9? "" : "0" }{ minutes }:{ seconds > 9? "" : "0" }{ seconds } </span>
        </>
    )
}
