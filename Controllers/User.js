import User from "../Model/User.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const privateKey = 'djbhrueibv94bv349fcb2o90bc328gec298bh'

export const CreateUser = async(req,res) => {
    try {
        const {name,email,password} = req.body
        
        const findExistsEmail = await User.findOne({email})

        if(findExistsEmail){return res.status(200).json({msg:'email exist',success:0})}

        const saltRound = 10

        const hashPassword = await bcrypt.hash(password,saltRound)
        
        console.log(hashPassword)

        const CreateUser = new User({
            name,
            email,
            password:hashPassword
        })

        await CreateUser.save()

        return res.status(200).json({msg:'sucessfully created the user',success:1})

    } catch (error) {
        if(error.name === 'ValidationError'){
            return res.status(200).json({msg:'validation error',error:error.errors,success:0})
        }
        return res.status(200).json({msg:'Internet Error',error:error,success:0})
    }
}



export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });
  
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ msg: 'Invalid email or password', success: 0 });
      }
      
      const token = jwt.sign({userId:user._id}, privateKey)

      res.json({ token,user, success: 1, });

    } catch (error) {
      return res.status(500).json({ msg: 'Internal Server Error', error, success: 0 });
    }
  };
  
  export const checkToken = (req, res , next) => {

    const token = req.headers.authorization;

    console.log(token ,' gottin')

    const tokenWithNoBearerText = token.split(' ')[1]
    console.log(tokenWithNoBearerText)
  
    if (!token) {
      return res.status(401).json({ msg: 'Token not provided', success: 0 });
    }
  
    jwt.verify(tokenWithNoBearerText, privateKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({ msg: 'Invalid token', success: 0 });
      }
      req.u = decoded
      next()
    });
  };

  const developers = [
    {
      name: 'John Doe',
      email: 'john.doe@example.com',
      salary: 80000,
    },
    {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      salary: 90000,
    },
    {
      name: 'Bob Johnson',
      email: 'bob.johnson@example.com',
      salary: 75000,
    },
    // Add more developer objects as needed
  ];

  export const MessageForUsers = async(req,res) => {
    return res.status(200).json({msg:'success got the users',developers})
  }