const sgMail = require('@sendgrid/mail');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');

sgMail.setApiKey('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');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const upload = multer({ dest: 'uploads/' });

app.post('/send-email', upload.array('attachments'), async (req, res) => {
  const { name, email, message } = req.body;
  const attachments = req.files;

  let formattedAttachments = [];
  if (attachments) {
    formattedAttachments = attachments.map((file) => {
      const content = fs.readFileSync(file.path).toString('base64');
      fs.unlinkSync(file.path);
      return {
        content: content,
        filename: file.originalname,
        type: file.mimetype,
        disposition: 'attachment',
      };
    });
  }

  const msg = {
    to: 'h344012511@gmail.com',  
    from: 'h344012511@gmail.com',  
    subject: `New message from: ${name}`,
    text: message,
    html: `<p>${message}</p>`, 
    attachments: formattedAttachments,
  };

  try {
    console.log('Attempting to send email with the following details:', msg);
    await sgMail.send(msg);
    res.status(200).send('Email sent successfully');
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email: ', error.response ? error.response.body : error);
    res.status(500).send('Error sending email');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
