import dbConnection from "../../../utils/mongoConnection";
import Notes from "../../../model/schema";

dbConnection()

export default async (req, res) => {

    const { method } = req;

    if (method === "GET") {
        try {
            const notes = await Notes.find({});

            res.status(200).json({ success: true, data: notes })
        } catch (error) {
            res.status(400).json({ success: false, err: error });
        }
    }
    else if (method === "POST") {
        try {
            /*This will show data on PostMan and Mongodb Atlas*/

            const note = await Notes.create(req.body);  //This creates the entry plus saves it as well and then returns back data entered

            /* This will show canges in console as well*/
            // const note = await new Notes(req.body)
            // const save = await note.save();
            // console.log(save)

            res.status(200).json({ success: true, data: note })
        } catch (error) {
            res.status(400).json({ success: false, err: error });
        }
    }
    else {
        res.status(400).json({ success: false });
    }
}