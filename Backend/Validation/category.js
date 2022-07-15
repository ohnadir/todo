const { check, param } = require('express-validator');


exports.addCategoryValidator = [
    check('title')
    .trim()
    .notEmpty()
    .withMessage('Title is Required')
    .custom(async (title) => {
        if (title) {
            if (title.length< 6) {
                throw 'Title must be 6 or longer Character'
            }
        }    
    }),
    check('desc')
    .trim()
    .notEmpty()
    .withMessage('Description is Required')
    .custom(async (desc) => {
            if (desc) {
                if (desc.length < 15) {
                throw 'The Description must be 15 or longer character'
            }
        }
    })
]

exports.updateCategoryValidator = [
    check('title')
    .custom(async (title) => {
        if (title) {
            if (title.length< 6) {
                throw 'Title must be 6 or longer Character'
            }
        }    
    }),
    check('desc')
    .custom(async (desc) => {
            if (desc) {
                if (desc.length < 15) {
                throw 'The Description must be 15 or longer character'
            }
        }
    })
]