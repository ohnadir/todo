const { check, param } = require('express-validator');
const validateEmail = require('../utils/validateEmail');

exports.singUpUserValidator = [
    check('name')
        .trim()
        .notEmpty()
    .withMessage('Name is Required')
        .custom(async (name) => {
            if (name) {
                if (name.length < 5) {
                throw 'Name must be 5 or longer Character'
            }
        }
        }),
    check('email')
    .isLowercase()
    .isEmail()
    .withMessage('Invalid Email')
        .custom(async (email) => {
            if (email) {
                const output = validateEmail(email);
                if (!output) {
                    throw 'Invalid Email'
                }
        }
    }),
    check('password')
    .trim()
    .custom(async (password) => {
        if (password) {
            const isNonWhiteSpace = /^\S*$/;

            if (!isNonWhiteSpace.test(password)) {
                throw "Password must not contain WhiteSpaces.";
            }

            const isContainsUppercase = /^(?=.*[A-Z]).*$/;
            if (!isContainsUppercase.test(password)) {
                throw "Password must have at least one Uppercase Character.";
            }

            const isContainsLowercase = /^(?=.*[a-z]).*$/;
            if (!isContainsLowercase.test(password)) {
                throw "Password must have at least one Lowercase Character.";
            }

            const isContainsNumber = /^(?=.*[0-9]).*$/;
            if (!isContainsNumber.test(password)) {
                throw "Password must contain at least one Digit.";
            }

            const isContainsSymbol =
                /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/;
            if (!isContainsSymbol.test(password)) {
                throw "Password must contain at least one Special Symbol.";
            }

            const isValidLength = /^.{7,10}$/;
            if (!isValidLength.test(password)) {
                throw "Password must be 7-10 Characters Long.";
            }
        }
    })
]

exports.singInUserValidator = [
    
    check('email')
    .isLowercase()
    .isEmail()
    .withMessage('Invalid Email')
        .custom(async (email) => {
            if (email) {
                const output = validateEmail(email);
                if (!output) {
                    throw 'Invalid Email'
                }
        }
    }),
    check('password')
    .trim()
    .custom(async (password) => {
        if (password) {
            const isNonWhiteSpace = /^\S*$/;

            if (!isNonWhiteSpace.test(password)) {
                throw "Password must not contain WhiteSpaces.";
            }

            const isContainsUppercase = /^(?=.*[A-Z]).*$/;
            if (!isContainsUppercase.test(password)) {
                throw "Password must have at least one Uppercase Character.";
            }

            const isContainsLowercase = /^(?=.*[a-z]).*$/;
            if (!isContainsLowercase.test(password)) {
                throw "Password must have at least one Lowercase Character.";
            }

            const isContainsNumber = /^(?=.*[0-9]).*$/;
            if (!isContainsNumber.test(password)) {
                throw "Password must contain at least one Digit.";
            }

            const isContainsSymbol =
                /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/;
            if (!isContainsSymbol.test(password)) {
                throw "Password must contain at least one Special Symbol.";
            }

            const isValidLength = /^.{10,16}$/;
            if (!isValidLength.test(password)) {
                throw "Password must be 10-16 Characters Long.";
            }
        }
    })
]