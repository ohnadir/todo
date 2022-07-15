const { check, param } = require('express-validator');
const { default: mongoose } = require('mongoose');


exports.addTodoValidator = [
    check('title')
    .trim()
    .notEmpty()
    .withMessage('Title is Required'),
    check('desc')
    .trim()
    .notEmpty()
    .withMessage('Description is Required'),
    
    check('category')
    .trim()
    .notEmpty()
    .withMessage('Category is Required')
    .custom(async (category) => {
        if (category) {
            if (! mongoose.Types.ObjectId.isValid(category)) {
            throw 'No category Data found by Todo Id'
            }
        }
    })
]

exports.updateTodoValidator = [
    check('category')
    .custom(async (category) => {
        if (category) {
            if (!mongoose.Types.ObjectId.isValid(category)) {
                throw 'No category Data found by Todo Id'
            }
        }
    })
]
exports.idValidator = [
    param('id').custom(async (id) => {
        if (! mongoose.Types.ObjectId.isValid(id)) {
            throw 'No todo data found by todo id';
        }
    })
]