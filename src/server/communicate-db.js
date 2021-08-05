import { connectDB } from './connectDB'

export const addNewTime = async task=>{
    let db = await connectDB();
    let collection = db.collection(`sleeptimes`);
    await collection.insertOne(task);
};

export const deleteTime = async task=>{    
    let id = task;    
    let db = await connectDB();
    let collection = db.collection(`sleeptimes`);
    await collection.remove({"id":id});
};