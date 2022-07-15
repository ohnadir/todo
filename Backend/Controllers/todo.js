const Todo = require('../Models/Todo');
const Category = require('../Models/Category');


exports.addTodo = async (req, res) => {
    try {
        const { category } = req.body;
        /* const isCategoryExist = await Category.findById(category);
        console.log(isCategoryExist)
        if (!isCategoryExist) {
            return res.status(404).json({message : "No category Data Found By Category Id"})
        } */

        const newTodo = new Todo(req.body);
        console.log(newTodo);

        await newTodo.save();
        res.status(200).json({
            message: 'Todo added Successfully'
        })
    }
    catch (error) {
        res.status(404).json({
            message: 'Error, Try Again'
        })
    }
}
exports.updateTodo = async (req, res) => {
    try {
        const { title, desc, category } = req.body;
        const todo = await Todo.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({ message: 'No todo data found by id' });
        }

        todo.title = title ? title : todo.title,
        todo.desc = desc ? desc : todo.desc,
        todo.category = category ? category : todo.category,
        await todo.save()
        
        res.status(200).json({
            message: 'Todo updated Successfully'
        })
    }
    catch (error) {
        res.status(500).json({
            message: 'Error, Try Again'
        })
    }
}

exports.deleteTodo = async (req, res) => {
    try {
        await Todo.findByIdAndDelete(req.params.id)
        res.status(200).json({
            message: 'Todo Delete Successfully'
        })
    }
    catch (error) {
        res.status(404).json({
            message: 'Error, Try Again'
        })
    }
}

exports.getTodos = async (req, res) => {
    try {
        const allTodo = await Todo.find({title:"Course Work"})
        if (!allTodo) {
            return res.status(404).json({message : "No Todo Data Found"})
        }
        res.status(200).json(allTodo)
    }
    catch (error) {
        res.status(404).json({
            message: 'Error, Try Again'
        })
    }
}
exports.getTodo = async (req, res) => {
    try {
        const allTodo = await Todo.findById(req.params.id)
        if (!allTodo) {
            return res.status(404).json({message : "No Todo Data Found"})
        }
        res.status(200).json(allTodo)
    }
    catch (error) {
        res.status(404).json({
            message: 'Error, Try Again'
        })
    }
}
exports.getPagonationTodos = async (req, res) => {
    try {
        const {page, size} = req.query;
        const pageNumber= page ? parseInt(page) : 1;
        const limit = size ? parseInt(size) : 10;
        const totalDocument = await Todo.countDocuments({})
        const totalPage = Math.ceil(totalDocument / limit);

        const todos = await Todo.find({})
        .sort({_id : -1})
        .skip((pageNumber -1) * limit)
        .limit(limit)
        .lean();
        if(todos.length === 0){
            return res.status(404).json({ message: 'No todo data found' });
        }
        res.status(200).json({todos, totalPage})
    }
    catch (error) {
        res.status(404).json({
            message: 'Error, Try Again'
        })
    }
}

exports.getSearchTodo = async (req, res) => {
    try {
        const {q} = req.query;
        let regex = new RegExp(q, 'i');
        const query = {
            $or : [{title: regex}, {desc: regex}]
        }
        const todos = await Todo.find(query)
        
        res.status(200).json({todos})
    }
    catch (error) {
        res.status(404).json({
            message: 'Error, Try Again'
        })
    }
}