"use client"
import axios from "axios";
import {React,useState,useEffect} from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import  { CiCalendar, CiCircleChevDown, CiLogout, CiShoppingTag, CiSquarePlus, CiTrash, CiViewList } from "react-icons/ci";
import { GoDotFill } from "react-icons/go";
import { FcHighPriority,FcLowPriority,FcMediumPriority } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { MdDownloadDone } from "react-icons/md";
import './globals.css'
import Image from "next/image";

export default function Home() {

  const [formData, setFormData] = useState({title:'',description:'',tag:'',dueDate:'',classification:''})
  const [todoData, setTodoData] = useState([])
  const [viewForm, setViewForm] = useState(false)
  const [isExpanded, setIsExpanded] = useState({});

  // const toggleDescription = () => setIsExpanded(!isExpanded);

  const toggleDescription = (id) => {
    setIsExpanded(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };
  
  const onChangeHandler = (event) =>{
    const name = event.target.name
    const value = event.target.value
    setFormData(prev=>({...prev,[name]:value}))
    console.log(formData)
  }
const onSubmitHandler = async(event) =>{
  
  event.preventDefault()
  try
  {
    const response = await axios.post('/api',formData)

    toast.success(response.data.msg)
    setFormData({title:'',description:'',tag:'',dueDate:'',classification:''})
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
   <div className="mx-auto w-[70%] flex shadow-lg h-[80vh] my-20">
    <div className="bg-gray-900 w-[30%] h-full flex flex-col px-4 py-4 relative">
      <div className="flex justify-between items-center">
      <Image src='/assets/logo.png' width={120} height={25}></Image>
      <CiSquarePlus color="white" size={36} className="text-[28px] cursor-pointer" onClick={()=>setViewForm((prev)=>!prev)}/>
      </div>

      <div className="mt-10">
        {
          todoData.map((item,index)=>(
            <div key={index} className="flex justify-between items-center shadow-sm rounded-sm p-2 text-[14px]">
              <p className="text-white flex items-center gap-2">
              <>
              {item.dueDate === 'Today' ? <FcHighPriority /> : null}
              {item.dueDate === 'Tomorrow' ? <FcMediumPriority /> : null}
              {item.dueDate !== 'Today' && item.dueDate !== 'Tomorrow' && <FcLowPriority />}
  </>
                {item.title}</p>
              <div className="flex gap-2 items-center">
              <GoDotFill className={item.isComplete?'text-green-500':'text-yellow-500'}/>
              {item.isComplete?<></>:<MdDownloadDone size={24} onClick={()=>updateTodos(item._id)} className="cursor-pointer text-white hover:text-green-500 focus:text-green-500" />}
              <CiTrash size={24} onClick={()=>deleteTodos(item._id)} className="cursor-pointer text-white hover:text-red-500 focus:text-red-500"/>
              
              </div>
            </div>
          ))

        }
        
      </div>
          <button className="flex items-center justify-center gap-2 absolute bottom-[20px] right-4 mx-auto w-[90%] text-[14px] 
          font-medium rounded-sm bg-slate-200 px-4 py-1 
           text-gray-800">
            Get Code on Github
            <FaGithub size={24}/> </button>
      
    </div>
    <div className="px-12 py-12 flex flex-col gap-[20px] w-[90%]  border-t-purple-600 border-[4px] overflow-y-scroll">
      <div className="mt-4 mx-auto flex flex-col gap-[10px] max-w-[700px]">
        <h1 className="text-center text-6xl font-semibold text-purple-600">
        Focus. Prioritize. Achieve.
        </h1>
        <p className="text-center text-gray-900">Streamline your workflow and maximize productivity with our intuitive to-do app.</p>
      </div>
      <hr className="border border-purple-400"/>
      <div className={viewForm?'flex h-[280px] myclass':'h-0 overflow-hidden myclass'}>
        <ToastContainer/>
    <form className="flex items-start flex-col gap-[20px] mt-4 px-6 w-full text-[14px] font-medium" onSubmit={onSubmitHandler}>
      <div className="pt-2 border border-slate-300 w-full border-b-0 rounded-md">
      <input type="text" placeholder="Title" name="title" className=" 
      px-3 py-2 w-[100%]  rounded-sm outline-none text-[18px]" 
      value={formData.title} onChange={onChangeHandler}/>
      <textarea name="description" rows='4' placeholder="Write a description...." className="px-3 py-2 w-[100%] 
       rounded-sm outline-none resize-none font-normal" 
      value={formData.description} onChange={onChangeHandler} ></textarea>
      <div className="my-2 flex px-4 py-2 flex-row-reverse gap-[20px] font-normal text-[14px]">
        <div className="flex gap-1 items-center justify-center  border-[0.5px] border-slate-300 px-2 rounded-md">
          <CiCalendar size={24}/>
          <select name="dueDate" id="" className="px-3 py-2 outline-none appearance-none" onChange={onChangeHandler}>
            <option value="No due date">No due date</option>
            <option value="Today"> Today</option>
            <option value="Tomorrow">Tomorrow</option>
            <option value="Next Week">Next Week</option>
          </select>
        </div>
        <div className="flex gap-1 items-center justify-center border-[0.5px] border-slate-300 px-2 rounded-md">
          <CiViewList size={24}/>
        <select name="classification" className="px-3 py-2 outline-none appearance-none" onChange={onChangeHandler}>
            <option value="No due date">No Classification</option>
            <option value="Programming">Programming</option>
            <option value="Content">Content</option>
            <option value="Design">Design</option>
          </select>
        </div>
        <div className="flex gap-1 items-center justify-center border-[0.5px] border-slate-300 px-2 rounded-md">
          <CiShoppingTag size={24}/>
          <select name="tag" id="" className="px-3 py-2 outline-none appearance-none" onChange={onChangeHandler}>
            <option value="No Tags">No Tags</option>
            <option value="Personal">Personal</option>
            <option value="Office">Office</option>
          </select>
        </div>
      </div>
      <div className="w-full border border-slate-300 py-1 px-4 border-x-0 text-right" >
      <button type="submit" className="py-2 px-4 rounded-md bg-purple-800 text-white">Create</button>
      </div>
      </div>
      </form>
    </div>
    <div className="w-full mt-5">
      <div className="flex flex-col gap-1">
      {
          todoData.map((item,index)=>(
            <div className="flex flex-col text-[12px] ">
            <button key={index} className="flex justify-between items-center shadow-sm 
            rounded-t-lg p-2 text-[14px] border-[1px]"
            onClick={()=>toggleDescription(item._id)}>
              <p className="text-gray-800 flex items-center gap-2">
              <>
              {item.dueDate === 'Today' ? <FcHighPriority /> : null}
              {item.dueDate === 'Tomorrow' ? <FcMediumPriority /> : null}
              {item.dueDate !== 'Today' && item.dueDate !== 'Tomorrow' && <FcLowPriority />}
              </>
                {item.title}</p>
              <div className="flex gap-2 items-center">
                <p className={item.isComplete?'text-green-500':'text-yellow-500'}>{item.isComplete?'Completed':'Pending'}</p>
              <GoDotFill className={item.isComplete?'text-green-500':'text-yellow-500'}/>
              <CiCircleChevDown size={24}  className="cursor-pointer"/>
              </div>
            </button>
            <div className={isExpanded[item._id]?' flex flex-col myclass h-[100px] border-t-0 border-[1px]'
              :'h-0 overflow-hidden myclass'}>
              <p className="mx-6 mt-2">{item.description}</p>
              <div className="flex gap-2 px-4 py-2 flex-row-reverse text-white">
              <span className="py-2 px-3 bg-sky-500 rounded-md">{item.dueDate}</span>
              <span className="py-2 px-3 bg-blue-500 rounded-md">{item.tag}</span>
              <span className="py-2 px-3 bg-indigo-500 rounded-md">{item.classification}</span>
                
              </div>
            </div>
            </div>
          ))

        }

      </div>
    </div>
    </div>
   
   </div>


    </>
  );
}