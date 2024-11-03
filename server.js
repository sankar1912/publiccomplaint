require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt'); // For hashing passwords
const multer = require('multer');
const nodemailer = require('nodemailer'); // Import nodemailer


const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Create a multer instance for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Make sure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Store the original filename
  }
});
const upload = multer({ storage });

// Define User model
const User = mongoose.model('User', new mongoose.Schema({
  name: String,
  email: String,
}));

// Define PublicUser model
const PublicUser = mongoose.model('PublicUser', new mongoose.Schema({
  name: String,
  mobile: Number,
  aadhar: Number,
  state: String,
  username: String,
  password: String,
  photo: String // Add field for photo URL
}));

// Define Complaint model
const Complaint = mongoose.model('Complaint', new mongoose.Schema({
  name: String,
  email: String,
  phone: Number,
  department: String,
  complaintTitle: String,
  complaintPlace: String,
  complaintDescription: String,
  photo: String, // Field to store the photo filename
  video: String, // Field to store the video filename
  like: { type: Number, default: 0 }, // Add field for likes
  unlike: { type: Number, default: 0 }, // Add field for unlikes
  refNumber: String, // Field for reference number
}));

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use Gmail as the email service
  auth: {
    user: 'sankar.sn.1925@gmail.com', // Your email address
    pass: process.env.EMAIL_PASSWORD // Your email password or app-specific password
  }
});

// Route to handle form submission
app.post('/register', async (req, res) => {
  try {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new PublicUser({
      name: req.body.name,
      mobile: req.body.mobile,
      aadhar: req.body.aadhar,
      state: req.body.state,
      username: req.body.username,
      
      password: hashedPassword,
      photo: req.body.photo // Optional: can be set later when uploading
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Error saving user', error });
  }
});

// Login route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await PublicUser.findOne({ username });

    if (!user) {
      return res.status(400).json({ success: false, message: 'User not found' });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    // If login is successful, send a success response
    res.status(200).json({ success: true, message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
  }
});
// Route to check complaint details by reference number and mobile number
app.post('/check-complaint', async (req, res) => {
  const { refNumber, mobileNumber } = req.body;

  try {
    // Find the complaint with matching reference number and phone
    const complaint = await Complaint.findOne({ refNumber, phone: mobileNumber });

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    // Return the complaint details
    return res.status(200).json({ complaint });
  } catch (error) {
    console.error('Error retrieving complaint:', error);
    return res.status(500).json({ message: 'Server error', error });
  }
});



// Route to fetch incidents based on department
app.get('/incidents', async (req, res) => {
  const { department } = req.query;
  
  if (!department) {
    return res.status(400).json({ message: 'Department is required' });
  }

  try {
    // Filter incidents based on department (case-insensitive comparison)
    const filteredIncidents = await Complaint.find({
      department: department // Case-insensitive regex search
    });
    console.log(filteredIncidents);
    res.json(filteredIncidents);
  } catch (error) {
    console.error('Error fetching incidents:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});



// Route to handle complaints
app.post('/complaints', upload.fields([{ name: 'photo', maxCount: 1 }, { name: 'video', maxCount: 1 }]), async (req, res) => {
  try {
    const newComplaint = new Complaint({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      department: req.body.department,
      complaintTitle: req.body.complaintTitle,
      complaintPlace: req.body.complaintPlace,
      complaintDescription: req.body.complaintDescription,
      photo: req.files.photo && req.files.photo.length > 0 ? req.files.photo[0].filename : null,
      video: req.files.video && req.files.video.length > 0 ? req.files.video[0].filename : null,
      like: 0, // Initialize likes to 0
      unlike: 0, // Initialize unlikes to 0
      refNumber: req.body.refNumber, // Set the reference number from the form
    });

    // Save the complaint to the database
    const savedComplaint = await newComplaint.save();

    // Send email notification to the user who submitted the complaint
    const userMailOptions = {
      from: 'ksankar1912@gmail.com', // Your email address
      to: req.body.email, // Send email to the email provided in the form
      subject: 'Complaint Acknowledgment',
      text: `Dear ${newComplaint.name},\n\nThank you for submitting your complaint. Below are the details:\n\n` +
            `Complaint Title: ${newComplaint.complaintTitle}\n` +
            `Place: ${newComplaint.complaintPlace}\n` +
            `Description: ${newComplaint.complaintDescription}\n` +
            `Reference Number: ${newComplaint.refNumber}\n\n` +
            `Our team will review your complaint and get back to you shortly.\n\n` +
            `Best Regards,\n` +
            `The Support Team`
    };

    // Send email notification to the department
    const departmentMailOptions = {
      from: 'ksankar1912@gmail.com', // Your email address
      to: 'ksankar1912@gmail.com', // Replace with the department's email address
      subject: 'New Complaint Submitted',
      text: `A new complaint has been submitted:\n\n` +
            `Name: ${newComplaint.name}\n` +
            `Email: ${newComplaint.email}\n` +
            `Phone: ${newComplaint.phone}\n` +
            `Department: ${newComplaint.department}\n` +
            `Title: ${newComplaint.complaintTitle}\n` +
            `Place: ${newComplaint.complaintPlace}\n` +
            `Description: ${newComplaint.complaintDescription}\n` +
            `Reference Number: ${newComplaint.refNumber}`
    };

    // Send email to the user
    transporter.sendMail(userMailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email to user:', error);
      } else {
        console.log('Email sent to user:', info.response);
      }
    });

    // Send email to the department
    transporter.sendMail(departmentMailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email to department:', error);
      } else {
        console.log('Email sent to department:', info.response);
      }
    });

    res.status(201).json({ message: 'Complaint submitted successfully', complaint: savedComplaint });
  } catch (error) {
    console.error('Error submitting complaint:', error); // Log the error
    res.status(500).json({ message: 'Error submitting complaint', error });
  }
});


// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
