require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const hbs = require('hbs');
const sgMail = require('@sendgrid/mail');

const mongoose = require('mongoose');
const Contact = require("./src/models/messages");
const port = process.env.PORT || 8000;

const static_path = path.join(__dirname, "public");
const template_path = path.join(__dirname, "templates/views");
const partials_path = path.join(__dirname, "templates/partials");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// SendGrid API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Define routes
app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

app.get("/", (req, res) => {
    res.render("index", {
        title: "Get in touch",
        message: "Send us a message and we'll get back to you as soon as possible"
    });
});


app.get("/gallery", (req, res) => {
    res.render("gallery");
});

app.get("/interior", (req, res) => {
    res.render("interior");
});

app.get("/connect", (req, res) => {
    res.render("connect");
});

app.get("/abouts", (req, res) => {
    res.render("abouts");
});

app.post('/connect', (req, res) => {
    const { username, contactnumber, email, address, plan } = req.body;

    const msg = {
        to: 'anujmane007@gmail.com', // Replace with your recipient's email address
        from: 'vmane5785@gmail.com', // Replace with your sender's email address
        subject: `Anybody Want's to connect with our SM Construction Family`,
        html: `
        <p><strong>Name:</strong> ${username}</p>
        <p><strong>Contact Number:</strong> ${contactnumber}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Address:</strong> ${address}</p>
        <p><strong>Plan:</strong> ${plan}</p>
      `,
    };

    sgMail.send(msg)
        .then(() => {
            res.send(`
          <script>
            alert('Message sent successfully!');
            window.location.href = '/connect';
          </script>
        `);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send(`
          <script>
            alert('An error occurred while sending the message.');
            window.location.href = '/connect';
          </script>
        `);
        });
});

// Create a new contact document in the database
app.post('/contact', async (req, res) => {
    const contact = new Contact({
        name: req.body.name,
        email: req.body.email,
        number: req.body.number,
        message: req.body.message
    });

    try {
        const savedContact = await contact.save();
        console.log(savedContact); // Log the saved contact object to the console

        // Send email using SendGrid
        const msg = {
            to: 'anujmane007@gmail.com',
            from: 'vmane5785@gmail.com',
            subject: 'New Message Received via SM Construction Website',
            text: `Name: ${req.body.name}\nEmail: ${req.body.email}\nNumber: ${req.body.number}\nMessage: ${req.body.message}`
        };
        await sgMail.send(msg);

        // Display alert message
        res.send('<script>alert("Message Successfully Sent to SM Constructions"); window.location.href = "/";</script>');
    } catch (error) {
        console.error(error); // Log any errors to the console

        // Display alert message
        res.send('<script>alert("Message Not Sent, please try again."); window.location.href = "/";</script>');
    }
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running at ${port}`);
});