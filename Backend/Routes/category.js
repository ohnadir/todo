const router = require('express').Router();

const {
    addCategory,
    updateCategory,
    getAllCategory,
    getSingleCategory,
    deleteCategory,
    getPagonationCategories,
    getSearchCategory
} = require('../Controllers/category');

const {
    addCategoryValidator,
    updateCategoryValidator
} = require('../Validation/category'); 


const validationResult = require('../Validation/index');

router.get('/', getAllCategory)
router.get('/', getPagonationCategories)
router.get('/', getSearchCategory)
router.get('/:id', getSingleCategory)
router.post('/', addCategoryValidator, validationResult, addCategory )
router.patch('/:id', updateCategoryValidator , updateCategory)
router.delete('/:id',  deleteCategory)

module.exports = router;