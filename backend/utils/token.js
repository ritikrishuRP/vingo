import jwt from 'jsonwebtoken';

const genToken = async (user) => {
    try {
        const token = jwt.sign({userId},process.env.JWT_SECRET,{
            expiresIn:'7d'
        });
        return token;
    } catch (error) {
        console.log("Error generating token:", error);
    }
}

export default genToken;