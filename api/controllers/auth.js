import User from "../models/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

//REGISTRATION
export const register = async (req, res, next) => {
    try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);


    const newUser = new User({
        username:req.body.username,
        email:req.body.email,
        password:hash,

    })
    await newUser.save()
    res.status(200).send("User has been created successfully")
      }catch(err){
        next(err)
      }
    }

//LOGIN

export const login = async (req, res, next) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) return next(createError(404, "User not found!"));
  
      const isPasswordCorrect = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!isPasswordCorrect)
        return next(createError(400, "Wrong password or username!"));

        //token generation using JWT and passing into taken via cookie 
        // cretaed a JWT token and added to the env file
        const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT)
        
    const {password, isAdmin, ...otherDetails} = user._doc;
    res.cookie("access_token", token,{
        httpOnly: true //this will not allow client to get access to the admin more security
    }).status(200).json({...otherDetails})
      }catch(err){
        next(err)
      }
    }