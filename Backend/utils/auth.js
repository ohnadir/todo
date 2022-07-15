const bcrypt = require('bcrypt');

exports.hashPassword = async (password) => {
    const hashedPassword = await bcrypt.hash(password, 10)
    return hashedPassword;
}

exports.comparePassword = (password, hashed)=>{
    return bcrypt.compare(password, hashed);
}