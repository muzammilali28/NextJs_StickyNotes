import dbConnection from "../../../utils/mongoConnection";
import Notes from "../../../model/schema";

dbConnection()

export default async (req, res) => {

    const { method, query: { id } } = req;

    if (method === "GET") {
        try {
            const note = await Notes.findById(id);

            if (!note) {
                res.status(400).json({ success: false, Error: "ID Not Found!" })
            }

            res.status(200).json({ success: true, data: note })
        } catch (error) {
            res.status(400).json({ success: false , Error : "No Record found with this ID"})
        }
    }
    else if (method === "PUT") {
        try {
            const note = await Notes.findByIdAndUpdate(id, req.body, {
                new: true,  // If this attrubute is set then it will return the data after updating it to the mongoDB atlas , not the one before update
                runValidators: true   // Check for schema validations here again for update
            });

            if (!note) {
                res.status(400).json({ success: false, Error: "Cannot Update Data, Validation Restrictions" })
            }

            res.status(200).json({ success: true, data: note })
        } catch (error) {
            res.status(400).json({ success: false, Error: "Cannot Update Data, Validation Restrictions" })
        }
    }
    else if (method === "DELETE") {
        try {
            const deletedNote = await Notes.deleteOne({ _id: id });

            if (!deletedNote) {
                res.status(400).json({ success: false, Error: "ID was Not Found!, Cannot Delete Entry!!" })
            }

            res.status(200).json({ success: true, data: "Successfulyy Deleted Entry!" })
        }
        catch (error) {
            res.status(400).json({ success: false })
        }
    }
    else
    {
        res.status(400).json({ success: false })
    }
}