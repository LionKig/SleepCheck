import { connectDB } from './connectDB'

export async function assembleUserState(user){
    let db = await connectDB();

    let sleeptimes = await db.collection(`sleeptimes`).find({userid:user.id}).toArray();    
    let users = await db.collection(`users`).findOne({id:user.id});   

    return {
        session:{authenticated:`AUTHENTICATED`,id:user.id},        
        sleeptimes,
        users
    };
}