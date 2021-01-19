import  mongoose  from "mongoose";
import PostModel from "../models/postModel.js";

export const getPosts = async (req, res) => {
    try{
        const postMessages = await PostModel.find();

        res.status(200).json(postMessages);
    }catch(error){
        console.log(error);

        
       res.status(404).json({message: error.message});
    }
};


export const createPost = async (req,  res) => {
   try{
       const post = req.body;
       const newCreatedPost = new PostModel(post);
       await newCreatedPost.save();
       res.status(201).json(newCreatedPost);
   }catch(error){
       res.status(404).json({message: error.message});
   }
};

export const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        // console.log(req.body);
        const { title, creator, tags, selectedFile, message } = req.body
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No data found with id:${id}`);
        const updatedPost = { title, creator, tags, selectedFile, message, _id: id};
        await PostModel.findByIdAndUpdate(id, updatedPost, {new: true});
        res.json(updatedPost);
    } catch (error) {
        console.log(error);
    }
};


export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No document found with id:${id}`); 
        const deletedPost = await PostModel.findByIdAndDelete(id);
        // console.log(deletedPost);
        res.json(deletedPost);
    } catch (error) {
        console.log(error);
    }
};

export const likePost = async (req, res) => {
    try {
        const { id } = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No document found with id:${id}`);
        const post  = await PostModel.findById(id);
        // console.log(post);
        const updatedPost = await PostModel.findByIdAndUpdate(id, { likeCount: post.likeCount + 1}, { new: true });
        // console.log(updatedPost);
        res.json(updatedPost);
    } catch (error) {
        console.log(error);
    }
};