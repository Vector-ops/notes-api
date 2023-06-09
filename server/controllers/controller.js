const Note = require('../Schema/schema');
const asyncWrapper = require('../middleware/asyncWrapper');
const {CustomError, customError} = require('../error/all-route-catch');

const getAllNotes = asyncWrapper(async (req, res)=>{
    const notes = await Note.find();
    res.status(200).json({notes});
});

const getSingleNote = asyncWrapper(async (req, res, next)=>{
    const noteTitle = req.params.title;
    const notes = await Note.findOne({title:noteTitle});
    if(!notes){
        return next(customError(404, `No notes with title: ${noteTitle}`));
    }
    res.status(200).json({notes});
});

const createNotes = asyncWrapper(async (req, res)=>{
    const {title, body} = req.body;
    const notes = await Note.create({title:title, body:body});
    res.status(201).json({notes});
});

const updateNotes = asyncWrapper(async (req, res, next)=>{
    const noteTitle = req.params.title;
    const updateTitle = req.body.title;
    const updateBody = req.body.body;
    const notes = await Note.findOneAndUpdate({title:noteTitle}, 
        {
            title:updateTitle, 
            body:updateBody
        }, 
        {
            new:true,
            runValidators:true
    });
    if(!notes){
        return next(customError(404, `No notes with title: ${noteTitle}`));
    }
    res.status(200).json({notes});
});

const deleteNotes = asyncWrapper(async (req, res, next)=>{
    const noteTitle = req.params.title;
    const notes = await Note.findOneAndDelete({title:noteTitle});
    if(!notes){
        return next(customError(404, `No notes with title: ${noteTitle}`));
    }
    res.status(200).json({notes});
});

module.exports = {
    getAllNotes,
    getSingleNote,
    createNotes,
    updateNotes,
    deleteNotes,
}