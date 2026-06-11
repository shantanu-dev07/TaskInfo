const express = require("express")
const { UserModel } = require("./models/user.model")
const { default: mongoose } = require("mongoose")
const { TaskModel } = require("./models/task.model")
const router = express.Router()

//register user
router.route("/register")
.post(async(req,res)=>{
    try{
        if(!req.body){
            throw new Error("Enter Payload")
        }
        const{name,email,password} = req.body
        if(!name){
            throw new Error("Enter name")
        }
        if(!email){
            throw new Error("Enter email")
        }
        if(!password){
            throw new Error("Enter password")
        }
        const existUser = await UserModel.findOne({email})

        if(existUser){
            throw new Error("Account already exists")
        }
        const user = await UserModel.create({
            name,
            email,
            password
        })

        res.status(200).send({message:"User Register Success",token:user._id})

    }catch(error){
        res.status(400).send({error:error.message})

    }

})

//login user
router.route("/login")
.post(async(req,res)=>{
    try{
        if(!req.body){
            throw new Error("Enter Payload")
        }
        const{email,password} = req.body
        if(!email){
            throw new Error("Enter email")
        }
        if(!password){
            throw new Error("Enter password")
        }
        const existUser = await UserModel.findOne({email})

        if(!existUser){
            throw new Error("User not found")
        }
        if(existUser.password !=password){
            throw new Error("Enter valid Password")
        }

        res.status(201).send({message:"User Login Success",token:existUser._id})

    }catch(error){
        res.status(400).send({error:error.message})

    }

})

router.use((req,res,next)=>{
    try {
        const token = req.headers['user']
        if(!token){
            throw new Error("Login first")
        }
        if(!mongoose.isValidObjectId(token)){
            throw new Error("Enter valid ID")
        }
        req.user = token
        next()  
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})

//profile
router.route("/profile")
.get(async(req,res)=>{
    try{
        
        const user = await UserModel.findById(req.user).select("-password")

        return res.status(200).send(user)

    }catch(error){
        res.status(400).send({error:error.message})
    }
})

router.route("/add-task")
.post(async(req,res)=>{
    try {
        const{title,description,category}=req.body
        if(!title){
            throw new Error("Title is Required")
        }
        if(!description){
            throw new Error("Description is Required")
        }
        if(!category){
            throw new Error("Category is Required")
        }
        await TaskModel.create({
            title,description,category,
            user:req.user
        })
        res.status(200).send({message:"Task Added !"})

    } catch (error) {
        res.status(400).json({error:error.message})
    }
})

router.route("/all-task")
.get(async(req,res)=>{
    try {
        const all_tasks = await TaskModel.find({user:req.user})

        res.status(200).send(all_tasks)

    } catch (error) {
        res.status(400).json({error:error.message})
    }
})

router.route("/task/:id")
.get(async(req,res)=>{
    try {
        console.log("Task Request ID:", req.params.id)

        const task = await TaskModel.findById(req.params.id)
        console.log("Task Found:", task)

        res.status(200).send(task)

    } catch (error) {
        res.status(400).json({error:error.message})
    }
})
.put(async(req,res)=>{
    try {
        const id = req.params.id
        const{title,description,category}=req.body
        if(!title){
            throw new Error("Title is Required")
        }
        if(!description){
            throw new Error("Description is Required")
        }
        if(!category){
            throw new Error("Category is Required")
        }

        await TaskModel.findByIdAndUpdate(id,{
            title,
            description,
            category
        })
        return res.status(200).send({message:"Task Updated"})
    } catch (error) {
        res.status(400).json({ error: error.message })
        
    }
})

.delete(async(req,res)=>{
    try {
        console.log("Task Request ID:", req.params.id)

        const task = await TaskModel.findByIdAndDelete(req.params.id)
        console.log("Task Found:", task)

        if(!task){
            throw new Error("Task not found")
        }

        res.status(200).send({message:"Task Deleted"})

    } catch (error) {
        res.status(400).json({error:error.message})
    }
})


module.exports = router


router.get("/test", (req, res) => {
  res.send("API Working");
});