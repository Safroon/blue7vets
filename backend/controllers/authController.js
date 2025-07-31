const User = require('../models/User');
const Owner = require('../models/Owner');

exports.register = async (req, res) => {
  try {
    const { phone, password, fullName, address, pets } = req.body;

    // Check if phone already exists
    const existingUser = await User.findOne({ phone });
    if (existingUser)
      return res.status(400).json({ message: 'User already exists' });

    // Step 1: Create user
    const user = await User.create({ phone, password, role: 'owner' });

    // Step 2: Attach petId to each pet
    const updatedPets = pets.map((pet, index) => ({
      ...pet,
      petId: `${fullName.substring(0, 3).toUpperCase()}${phone.slice(-3)}${
        index + 1
      }`,
    }));

    // Step 3: Create owner linked to user
    const owner = await Owner.create({
      userId: user._id,
      fullName,
      address,
      pets: updatedPets,
    });

    // Dynamically format ownerId from fullName and user._id
    const dynamicOwnerId =
      fullName.substring(0, 3).toUpperCase() +
      user._id.toString().slice(-3).toUpperCase();

    res.status(201).json({
      message: 'Owner registered successfully',
      ownerId: dynamicOwnerId,
    });
  } catch (err) {
    console.error('Register api fail', err);
    res.status(500).json({ message: 'Registration failed from auth controll' });
  }
};

exports.login = async (req, res) => {
  try {
    const { phone, password } = req.body;

    const user = await User.findOne({ phone });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({
      message: 'Login successful',
      userId: user._id,
      role: user.role,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Login failed' });
  }
};
