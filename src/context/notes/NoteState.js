import React, {useState} from 'react'
import  NoteContext  from './noteContext'
const NoteState = (props)=>{
    const s1 = {
        "name": "Tariq",
        "class": "5b"
    }
    const [state, setState] = useState(s1);
    const update = ()=>{
        setTimeout(() => {
            setState(
                {
                    "name": "Ahmed",
                    "class": "10b"
                }
            )
        }, 1000);
    }
    console.log(props.children);
    return(
        
        <NoteContext.Provider value={{state, update}}>
            {props.children }
        </NoteContext.Provider>
    )
}
export default NoteState;
