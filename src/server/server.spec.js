import { addNewTime, deleteTime } from './communicate-db'
import { connectDB } from './connectDB'

(async function () {

    let db = await connectDB();
    let collection = db.collection(`users`);

    //let user = await collection.findOne({ "name": "Morty" });
    await addNewTime({entime:"Spec task",sttime:"0254215",id:"TEST-1"});
    //console.info("Added task");
    //await deleteTime({id:"TEST-1"});
    console.info("Task updated",);
})();