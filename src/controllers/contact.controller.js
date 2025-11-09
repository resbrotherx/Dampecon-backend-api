const Contact = require("../models/Contact");
const sendEmail = require("../utils/sendEmail");

exports.createContact = async (req, res) => {
  try {
    const { full_name, email, message, budget } = req.body;
    if (!full_name || !email || !message) {
      return res.status(400).json({ error: "full_name, email, and message are required" });
    }

    const files = Array.isArray(req.files)
      ? req.files.map(f => f.path)
      : req.files
      ? [req.files.path]
      : [];

    const contact = new Contact({ full_name, email, message, budget, files });
    await contact.save();

    await sendEmail({
      to: process.env.COMPANY_EMAIL,
      subject: "📩 New Contact Form Submission",
      html: `
        <h3>New Contact Message</h3>
        <p><strong>Name:</strong> ${full_name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Budget:</strong> ${budget || "N/A"}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
      attachments: files.map((path) => ({ path })),
    });

    res.status(201).json({
      success: true,
      message: "Contact message sent successfully!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
