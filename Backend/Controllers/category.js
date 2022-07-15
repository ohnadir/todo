const Category = require('../Models/Category');

exports.addCategory = async (req, res) => {
    try {
        const category = new Category(req.body);
        category.save();
        res.status(200).json({
            message: 'Category Added Successfully'
        })
    }
    catch (error) {
        res.status(500).json({
            message : 'Error, Try again'
        })
    }
} 
exports.updateCategory = async (req, res) => {
    try {
        const { title, desc } = req.body;
        const category = await Category.findById(req.params.id);
        if (!category) {
            res.status(200).json({
                message: 'Category Not Found'
            })
        }

        category.title = title ? title : category.title,
        category.desc = desc ? desc : category.desc,
        category.save();
        
        res.status(200).json({
            message: 'Category Added Successfully'
        })
    }
    catch (error) {
        res.status(500).json({
            message : 'Error, Try again'
        })
    }
}

exports.getAllCategory = async (req, res) => {
    try {
        const category = await Category.find();
        res.status(200).json(category)
    }
    catch (error) {
        res.status(500).json({
            message : 'Error, Try Again'
        })
    }
}
exports.getSingleCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        res.status(200).json(category)
    }
    catch (error) {
        res.status(500).json({
            message : 'Error, Try Again'
        })
    }
}
exports.deleteCategory = async (req, res) => {
    try {
        await Category.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: 'Category Delete Successfully'
        })
    }
    catch (error) {
        res.status(500).json({
            message : 'Error, Try Again'
        })
    }
}

exports.getPagonationCategories = async (req, res) => {
    try {
        const {page, size} = req.query;
        const pageNumber= page ? parseInt(page) : 1;
        const limit = size ? parseInt(size) : 10;
        const totalDocument = await Category.countDocuments({})
        const totalPage = Math.ceil(totalDocument / limit);

        const categories = await Category.find({})
        .sort({_id : -1})
        .skip((pageNumber -1) * limit)
        .limit(limit)
        .lean();
        if(categories.length === 0){
            return res.status(404).json({ message: 'No Catogory data found' });
        }
        res.status(200).json({categories, totalPage})
    }
    catch (error) {
        res.status(404).json({
            message: 'Error, Try Again'
        })
    }
}

exports.getSearchCategory = async (req, res) => {
    try {
        const {q} = req.query;
        let regex = new RegExp(q, 'i');
        const query = {
            $or : [{title: regex}, {desc: regex}]
        }
        const categories = await Category.find(query)
        
        res.status(200).json({categories})
    }
    catch (error) {
        res.status(404).json({
            message: 'Error, Try Again'
        })
    }
}