import { connectDB } from "@/lib/config/db";
import { TodoModel } from "@/lib/models/TodoModel";
import { NextResponse } from "next/server";


const loadDB = async()=>{
    try{
        await connectDB()
    }
    catch(error){
        console.log('Error! Could Not Connect to DB.')
    }
}

loadDB()


export async function GET(request){
    const todos = await TodoModel.find({})
    return NextResponse.json({todos:todos})
}

export async function POST(request){
    const {title,description,tag,classification,dueDate} = await request.json()
    await TodoModel.create({
        title,description,tag,classification, dueDate
    })
    return NextResponse.json({msg: 'Todo Created'})
}

export async function PUT(request){
    const {id} = await request.json()
    await TodoModel.findByIdAndUpdate(id,{isComplete: true})
    return NextResponse.json({msg: 'Todo Updated'})
}

export async function DELETE(request){
    const {id} = await request.json()
    await TodoModel.findByIdAndDelete(id)
    return NextResponse.json({msg: 'Todo Deleted!'})
}