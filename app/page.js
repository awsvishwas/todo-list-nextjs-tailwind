"use client"
import axios from "axios";
import {React,useState,useEffect} from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {

  const [formData, setFormData] = useState({title:'',description:''})
  const [todoData, setTodoData] = useState([])

  const onChangeHandler = (event) =>{
    const name = event.target.name
    const value = event.target.value
    setFormData(prev=>({...prev,[name]:value}))
  }

const onSubmitHandler = async(event) =>{
  event.preventDefault()
  try
  {
    const response = await axios.post('/api',formData)

    toast.success(response.data.msg)
    setFormData({title:'',description:''})
    fetchTodos()
  }
  catch(error){

  }
}

const fetchTodos = async()=>{
  const response = await axios.get('/api')
  setTodoData(response.data.todos)
}

const updateTodos = async(id)=>{
  const response = await axios.put('/api',{id})
  toast.success(response.data.msg)
  fetchTodos()
}
const deleteTodos = async(id)=>{
  const response = await axios.delete('/api', {data: {id}})
  toast.success(response.data.msg)
  fetchTodos()
}

useEffect(()=>{
  fetchTodos()
},[])



  return (
    <>
    
   <div className="max-w-[800px] mt-[40px] mx-auto flex flex-col gap-[20px] p-10" >
    <h1 className="mx-auto font-bold text-[36px]">To-do List App (NextJS - Tailwind CSS)</h1>
   <ToastContainer/>
   <form className="flex items-start flex-col mx-auto  gap-[20px] px-6 w-full" onSubmit={onSubmitHandler}>
      <input type="text" placeholder="Task" name="title" className=" px-3 py-2 w-[100%] border border-gray-400 rounded" 
      value={formData.title} onChange={onChangeHandler}/>
      <textarea name="description" rows='4' placeholder="description" className="px-3 py-2 w-[100%] border border-gray-400 rounded" 
      value={formData.description} onChange={onChangeHandler} ></textarea>
      <button type="submit" className="py-2 px-6 rounded bg-sky-500 text-white">Add Task</button>
      </form>
      <div className="flex flex-col gap-[5px] items-start w-full mx-auto">

        <div className="flex items-start gap-[20px] py-2 px-8">
        <ul className="flex justify-between items-center gap-[20px] font-bold">
              <li>Id</li>
                <li className="w-[100px]">Task</li>
                <li className="w-[200px]">Task Desctiption</li>
                <li className="w-[100px]">Status</li>
              </ul>
        </div>
      {
          todoData.map((item,index)=>(
            <div key={index} className="flex justify-between items-center gap-[20px] mx-auto border py-2 px-5">
           
              <ul className="flex justify-between items-center gap-[20px]">
                <li>{index+1}</li>
                <li className="w-[100px]">{item.title}</li>
                <li className="w-[200px]">{item.description}</li>
                <li className="w-[100px]">{item.isComplete?'Completed':'Pending'}</li>
              </ul>
              <div className="flex gap-[10px] justify-between items-center">
                <button className="px-3 py-2 bg-green-600 rounded text-white" onClick={()=>updateTodos(item._id)}>Done</button>
                <button className="px-3 py-2 bg-red-400 rounded text-white" onClick={()=>deleteTodos(item._id)}>Delete</button>
              </div>
            </div>
          ))
        }
      </div>

   </div>


    </>
  );
}
