import { useState } from "react";
import { Observable } from "./timer";

const timer=(obj)=>{
    obj.run();
}
const observableObj = new Observable(timer)

const App = ()=> {
    const [time, setTime] = useState(0)
    const [id, setId] = useState(0)
    const [isWait, setWait] = useState(false);
    
    const startObj = {
        run(){
            if(isWait) return;
            setId(observableObj.start(setTime))
        }
    }

    const reset = {
        run(){
            setWait(false);
            setId(observableObj.reset(setTime, id))
        }
    }

    const wait = {
        run(){
            setWait(!isWait);
            observableObj.wait(observableObj)
        }
    }

    const stopObj = {
        run(){
            setWait(false);
            observableObj.stop(setTime, id)
        }
    }
    return <>
        <button disabled={isWait} onClick={()=>observableObj.subscribe(startObj)}>Start</button>
        <button onClick={()=>observableObj.subscribe(stopObj)}>Stop</button>
        <button onClick={()=>observableObj.subscribe(reset)}>Reset</button>
        <button onClick={()=>observableObj.subscribe(wait)}>Wait</button>
        <div>Time : {time}</div>
    </>
}

export default App;
