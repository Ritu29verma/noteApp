const NoteModel = require("../model/Note");
exports.createNote= async (req, res) => {
  try{
      const{title,description} = req.body;
      const response = await NoteModel.create({title,description});
      res.status(200).json(
        {
            success:true,
            data:response,
            message:"entry created successfully"
        }
      );
  }
  catch(err){
    res.status(500).json({ 
        success:false,
        data: "Error creating note",
    message: err.message,
 });
  }
};

exports.getNote = async (req,res) =>
  {
    try{
      const notes = await NoteModel.find({});
      res.status(200).json({
        success:true,
        data:notes,
        message:"notes fetched successfully"
      })}
    catch(err){
      console.log(err);
      res.status(500).json({
        success:false,
        data: "Error fetching notes",
        error : err.message,
    });
  }
 }

 exports.getNotebyID = async(req, res) => {
  try{
    const id = req.params.id;
    const note = await NoteModel.findById(id);
    if(!note){
      res.status(404).json({
        success:false,
        data: "Note not found",
        message: "Note not found"
        });
        }
        else{
          res.status(200).json({
            success:true,
            data:note,
            message:"note ${id} data fetched successfully"
            })
            }
            }
            catch(err){
              res.status(500).json({
                success:false,
                data: "Error fetching note",
                error : err.message,
                });
                }
 }

 exports.updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body; // Extract fields from the request body

  try {
    let updatedNote;

    if (completed !== undefined) {
      
      const note = await NoteModel.findById(id);
      if (!note) {
        return res.status(404).json({
          success: false,
          message: "Note not found",
        });
      }
      note.completed = !note.completed;
      updatedNote = await note.save();
    } else {
      
      updatedNote = await NoteModel.findByIdAndUpdate(
        id,
        { title, description },
        { new: true, runValidators: true } 
      );
    }

    if (!updatedNote) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    res.status(200).json({
      success: true,
      data: updatedNote,
      message: completed !== undefined ? "Note completed status toggled" : "Note updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error updating note",
      error: err.message,
    });
  }
};

  
exports.deleteNote = async(req,res) => {
  const { id } = req.params;
  try {
    const deletedNote = await NoteModel.findByIdAndDelete(id);
    if (!deletedNote) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
        });
        }
        res.status(200).json({
          success: true,
          message: "Note deleted successfully",
          });
          } catch (err) {
            res.status(500).json({
              success: false,
              message: "Error deleting note",
              error: err.message,
              });
              }
}

