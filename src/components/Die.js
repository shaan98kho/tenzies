import React from "react"

export default function Die(props) {
    return (
        <div className={`die-face ${props.isHeld && "die-face--green"}`}   onClick={()=>props.holdDie(props.id)}>
            <h2>{props.value}</h2>
        </div>
    )
}