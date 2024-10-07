import jwt from "jsonwebtoken";
import User from "../Schemas/User";
import bcrypt from "bcryptjs/dist/bcrypt";

const router = express.Router();

//sign up
router.post("/registration", async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const newUser = new User({
      name,
      email,
      password,
      role,
    });

    await newUser.save();

    res.status(201).json({ message: "user created succefully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

//log in

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {

    const user = await User.findOne({email})
    if(!user){
        res.status(400).json({Message: "User not found"})
    }



    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const payload = { user: { id: user.id, role: user.role } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});
