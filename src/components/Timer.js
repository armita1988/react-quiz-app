
import { useEffect } from "react"

export default function Timer({ remainedTime, dispatch }) {

    const min = Math.floor(remainedTime / 60);
    const sec = remainedTime % 60;
    useEffect(function () {

        const id = setInterval(function () {
            dispatch({ type: 'updateRemainedTime' })
        }, 1000)
        // console.log(id)

        return () => { clearInterval(id); }
    }, [dispatch])

    return (
        <div className="btn timer ">
            {min < 10 ? "0".concat(min) : min}:{sec < 10 ? "0".concat(sec) : sec}
        </div>
    )
}