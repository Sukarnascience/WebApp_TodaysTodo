import React,{useState,useEffect} from  'react';
import './guestRoomUI.css';

import {FaClipboardCheck} from 'react-icons/fa'
import {RiSendPlaneFill,RiFileInfoLine,RiCloseCircleLine} from 'react-icons/ri'
import {MdDeleteForever} from 'react-icons/md'
import {GoChecklist} from 'react-icons/go'
import {GiHand} from 'react-icons/gi'
import {AiOutlineClear} from 'react-icons/ai'

export default function GuestRoom(){

    const [todos,setTodos] = useState([{data:"I will complete all the Todo's of the day",id:0,completeNDB:false}])
    const [toDo,setToDo] = useState("")
    const addInTodo = (e) =>{
        setTodos([...todos,{data:toDo,id:todos.length,complete:false}])
        setToDo('')
        e.preventDefault()
    }
    const deleteTodo = index =>{
        const listTodo = [...todos];
        listTodo.splice(index,1);
        setTodos(listTodo)
    }
    const taskComplete = (index,completedNDB,dataIn) => {
        const listTodo = [...todos];
        if(completedNDB){
            listTodo.splice(index,1,{data:dataIn,complete:false});
        }
        else{
            listTodo.splice(index,1,{data:dataIn,complete:true});
        }
        setTodos(listTodo)

    }
    const [showInfo,setInfo] = useState(false)

    const ClearAllData = () => {
        setTodos([{data:"I will complete all the Todo's of the day",id:0,completeNDB:false}])
        localStorage.removeItem('UserTodos')
    }
    
    useEffect(()=>{
        const saveData = JSON.parse(localStorage.getItem('UserTodos'))
        if(saveData){
            setTodos(saveData)
        }
    },[])

    useEffect(()=>{
        localStorage.setItem('UserTodos',JSON.stringify(todos))
    },[todos])
    
    return(
        <div className="guestRoom">
            <header>
                <div className="Headder">
                    <h1 className="headTitle">Today's Todo<GiHand/></h1>
                    <button className="infoIcon" onClick={()=>{setInfo(!showInfo)}}>
                        <RiFileInfoLine size={30} color="yellow"/>
                    </button>
                    <button className="clearIcon" onClick={ClearAllData}>
                        <AiOutlineClear size={30} color="rgb(255, 114, 114)"/>
                    </button>
                </div>
            </header>
            <main>
                <div className="ToDo">
                    { showInfo? 
                        <div className="warningData">
                            <p className="warningText">
                                <b>Info:</b>Hello Alien, By making todo's for the day you will complete all your task
                                without forgetting anything... and <AiOutlineClear/> is used for clear all the data from your localStorage
                                <br/> <b>About Developer:</b>Myself Sukarna Jana ,If you find any bug it will 
                                be really greatfull, if you approach me then i will be fixing it as soon as posible.
                                <br/> <b>License under:</b>
                                <p>
                                    MIT License<br/>
                                    <br/>
                                    Copyright (c) 2021 Sukarna Jana<br/>
                                    <br/>
                                    Permission is hereby granted, free of charge, to any person obtaining a copy
                                    of this software and associated documentation files (the "Software"), to deal
                                    in the Software without restriction, including without limitation the rights
                                    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
                                    copies of the Software, and to permit persons to whom the Software is
                                    furnished to do so, subject to the following conditions:<br/>
                                    <br/>
                                    The above copyright notice and this permission notice shall be included in all
                                    copies or substantial portions of the Software.<br/>
                                    <br/>
                                    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
                                    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
                                    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
                                    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
                                    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
                                    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
                                    SOFTWARE.
                                </p>
                            </p>
                            <button className="infoIcon" onClick={()=>setInfo(!showInfo)}><RiCloseCircleLine size={20}/></button>
                        </div> : null
                    }
                    <h2><FaClipboardCheck/> I have Todo:</h2>
                    <ul>
                        {todos && todos.map((todo,index)=>(
                            <li key={todo.id}>
                                { todo.complete ? 
                                    <div className="TodoListPartComplete">
                                        <p>{todo.data}</p>
                                        <p className="deleteAlign">
                                            <button className="deleteAlignbtn" onClick={()=>deleteTodo(index)}>
                                                <MdDeleteForever size={20}/>
                                            </button>
                                        </p>
                                        <p>
                                            <button className="TaskCompletebtn" onClick={()=>taskComplete(index,todo.complete,todo.data)}>
                                                <GoChecklist size={20}/>
                                            </button>
                                        </p>
                                    </div> :
                                    <div className="TodoListPartNotComplete">
                                        <p>{todo.data}</p>
                                        <p className="deleteAlign">
                                            <button className="deleteAlignbtn" onClick={()=>deleteTodo(index)}>
                                                <MdDeleteForever size={20}/>
                                            </button>
                                        </p>
                                        <p>
                                            <button className="TaskCompletebtn" onClick={()=>taskComplete(index,todo.complete,todo.data)}>
                                                <GoChecklist size={20}/>
                                            </button>
                                        </p>
                                    </div> 
                                }
                        </li>))}
                    </ul>
                </div>
            </main>
            <footer>
                <div>
                    <div>
                        <form className="inputGrid" onSubmit={addInTodo}>
                            <input 
                                type="text" 
                                className="insertData" 
                                placeholder="I have todo ..." 
                                value={toDo} 
                                onChange={(e)=>{setToDo(e.target.value)}}/>  
                            <button type="submit" className="addTodo"><RiSendPlaneFill size={25} color="white"/></button>
                        </form>
                    </div> 
                </div>
            </footer>
        </div>
    )
}
