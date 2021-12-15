import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, { useState }from 'react'

export default function Home() {
  const [count, setCount] = useState(0)
  const [todolist, settodoList] = useState([])
  const [todoAdd, setTodoAdd] = useState("")
  const [disabled, setDisabled] = useState(true);
  const [editableTodo, setEditableTodo] = useState("");


 const handlePush = event  =>{
settodoList(prevArray => [...todolist, todoAdd]);
 }

 const handleChange = event  =>{
   setTodoAdd(event.target.value);
  }

  const handleDelete = event  =>{
    settodoList(todolist.filter((_, i) => event !== i))
  }
    const editTask = (_, event) =>{
      setEditableTodo(event)
    }
    const handleEdit = event =>  {
      let newTodoList = [...todolist]
      newTodoList[editableTodo] = event.target.value
      settodoList(newTodoList)
    }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1> Test </h1>
        <h3>Count : {count}</h3>
        <button onClick={()=> setCount(prev => prev + 1)}>click</button>

       {/* input */}
       <input type="text" onChange={handleChange}/>
       {/* button */}
       <button onClick={() => handlePush()}>Submit</button>
        {todolist.length > 0 && (
          todolist.map((todo, i )=> {
            return(

              <div key={i}>
                <input key={i} value={todo} onChange={(event) =>handleEdit(event)} type="text" defaultValue ={todo} disabled={editableTodo === i ? false : true}/>
                <button key={i} onClick={()=> handleDelete(i)}>delete</button>
                <button key={i} onClick={()=> editTask(todo, i)}>edit</button>
            </div>
            )
          })
        )}
        
      </main>
    </div>
  )
}
