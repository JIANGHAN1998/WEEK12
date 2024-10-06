const sgMail = require('@sendgrid/mail');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');

// 设置 SendGrid API Key
sgMail.setApiKey('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');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// 配置 multer 用于处理文件上传
const upload = multer({ dest: 'uploads/' });

// 处理发送邮件的 POST 请求，并支持上传附件
app.post('/send-email', upload.array('attachments'), async (req, res) => {
  const { name, email, message } = req.body;
  const attachments = req.files;

  // 处理上传的附件
  let formattedAttachments = [];
  if (attachments) {
    formattedAttachments = attachments.map((file) => {
      const content = fs.readFileSync(file.path).toString('base64');
      // 删除临时文件
      fs.unlinkSync(file.path);
      return {
        content: content,
        filename: file.originalname,
        type: file.mimetype,
        disposition: 'attachment',
      };
    });
  }

  // 构建要发送的邮件内容
  const msg = {
    to: 'h344012511@gmail.com',  // 替换为实际的收件人邮箱
    from: 'h344012511@gmail.com',   // 替换为验证过的发件人邮箱
    subject: `New message from: ${name}`,
    text: message,  // 纯文本消息
    html: `<p>${message}</p>`,  // HTML 格式的消息
    attachments: formattedAttachments,  // 添加附件
  };

  try {
    console.log('Attempting to send email with the following details:', msg);  // 打印日志方便调试
    await sgMail.send(msg);  // 发送邮件
    res.status(200).send('Email sent successfully');
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email: ', error.response ? error.response.body : error);  // 打印详细错误日志
    res.status(500).send('Error sending email');
  }
});

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
