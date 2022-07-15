const User = require('../Models/User');

const { hashPassword, comparePassword } = require('../utils/auth');


exports.userSingUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const newUser = new User({
            name,
            email,
            password: await hashPassword(password)
        })
        await newUser.save();
        res.status(200).json({
            message: "User Added Successfully"
        })
    }
    catch (error) {
        res.status(500).json({
            message: "Error, Try again"
        })
    }
}

exports.userSingIn = async (req, res) => {
    
    try {
        const { email, password } = req.body;
        const user = await User.findOne({email});

        if (!user) {
            return res.status(404).json({
                message: "Invalid credential"
            })
        }

        const match = await comparePassword(password, user.password);

        if (!match) {
            res.status(404).json({
                message: 'Invalid Credential'
            })
        }

        res.status(200).json({
            message: "Success..."
        })

    }
    catch (error) {
        res.status(500).json({
            message: "Error, Try again"
        })
    }
}

exports.getSingleUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user)
    }
    catch (error) {
        res.status(500).json({
            message: "Error, Try Again"
        })
    }
}

exports.getPagonationUsers = async (req, res) => {
    try {
        const {page, size} = req.query;
        const pageNumber= page ? parseInt(page) : 1;
        const limit = size ? parseInt(size) : 10;
        const totalDocument = await User.countDocuments({})
        const totalPage = Math.ceil(totalDocument / limit);

        const users = await User.find({})
        .sort({_id : -1})
        .skip((pageNumber -1) * limit)
        .limit(limit)
        .lean();
        if(users.length === 0){
            return res.status(404).json({ message: 'No User data found' });
        }
        res.status(200).json({users, totalPage})
    }
    catch (error) {
        res.status(404).json({
            message: 'Error, Try Again'
        })
    }
}

exports.getSearchUser = async (req, res) => {
    try {
        const {q} = req.query;
        let regex = new RegExp(q, 'i');
        const query = {
            $or : [{title: regex}, {desc: regex}]
        }
        const users = await User.find(query)
        
        res.status(200).json({users})
    }
    catch (error) {
        res.status(404).json({
            message: 'Error, Try Again'
        })
    }
}