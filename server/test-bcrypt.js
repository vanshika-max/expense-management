const bcrypt = require('bcryptjs');

const utf8 = require('utf8');
require('dotenv').config(); // To use environment variables for DB URI



const samplePassword = '1234'; 
const utf8Bytes = utf8.encode(samplePassword);

console.log('UTF-8 Encoded Password:', utf8Bytes);
const storedHash = '$2a$10$RSAr4SILwnNwDw7BBzSAdurF/sO4WvFowDGtIreQsqxZSZiGiE.yi'; 
const checkPassword = async () => {
    try {
        // const hashed = await bcrypt.hash(samplePassword, 10);
        // console.log('hashed:',hashed);
        
        
        const isMatch = await bcrypt.compare(utf8Bytes, storedHash);

        console.log('Password match result:', isMatch);
        // const ismatch=await bcrypt.compare(samplePassword,hashed);
        // console.log('password match result using manually hashing ',ismatch);
        
    } catch (err) {
        console.error('Error comparing passwords:', err);
    }
};

 checkPassword();



