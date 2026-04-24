import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import nodemailer from 'nodemailer';
import PDFDocument from 'pdfkit';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(join(__dirname, 'dist')));

// Configure email transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Generate PDF endpoint
app.post('/api/generate-pdf', (req, res) => {
  try {
    const { clientName, projectName, rooms, date } = req.body;

    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${clientName || 'Selections'}-${projectName || 'Project'}.pdf"`);

    doc.pipe(res);

    // Header
    doc.fillColor('#8CC63F');
    doc.fontSize(24).font('Helvetica-Bold').text('EVOLUTION', { align: 'center' });
    doc.fontSize(10).font('Helvetica').text('Audio • Video • Automation', { align: 'center' });
    doc.fontSize(9).fillColor('#6D6E71').text('Shade Selection Guide', { align: 'center' });

    doc.moveTo(50, doc.y + 10).lineTo(550, doc.y + 10).fillColor('#8CC63F').fill();
    doc.moveDown();

    // Project Info
    doc.fillColor('#2D2D2D').fontSize(14).font('Helvetica-Bold').text('Selection Summary');
    doc.moveDown(0.3);

    if (clientName || projectName) {
      doc.fontSize(11).font('Helvetica');
      if (clientName) doc.text(`Client: ${clientName}`);
      if (projectName) doc.text(`Project: ${projectName}`);
      doc.text(`Date: ${date}`);
      doc.moveDown();
    }

    // Rooms and Selections
    rooms.forEach((room, index) => {
      doc.fillColor('#2D2D2D').fontSize(12).font('Helvetica-Bold').text(room.name);
      doc.fontSize(10).font('Helvetica').fillColor('#6D6E71');

      room.fabricSelections.forEach(fabric => {
        doc.text(`  • ${fabric.family} - ${fabric.color}`);
        doc.fontSize(9).fillColor('#999999');
        doc.text(`    SKU: ${fabric.sku} | Light Transmission: ${fabric.opacity}`);
        if (fabric.notes) {
          doc.text(`    Notes: ${fabric.notes}`);
        }
        doc.fillColor('#6D6E71').fontSize(10);
      });

      if (index < rooms.length - 1) {
        doc.moveDown();
      }
    });

    doc.moveDown();
    doc.fontSize(9).fillColor('#999999').text('For more information, contact Evolution Audio • Video • Automation');

    doc.end();
  } catch (error) {
    console.error('PDF generation error:', error);
    res.status(500).json({ message: 'Failed to generate PDF' });
  }
});

// Send email endpoint
app.post('/api/send-selections', async (req, res) => {
  try {
    const { clientName, projectName, rooms, recipientEmails, additionalEmail, date } = req.body;

    const recipients = [...recipientEmails];
    if (additionalEmail && additionalEmail.trim()) {
      recipients.push(additionalEmail.trim());
    }

    if (recipients.length === 0) {
      return res.status(400).json({ message: 'No recipients specified' });
    }

    // Build HTML email body
    let htmlBody = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #8CC63F 0%, #7ab030 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0; font-size: 28px;">EVOLUTION</h1>
          <p style="margin: 5px 0; font-size: 12px;">Audio • Video • Automation</p>
        </div>
        <div style="background: #f5f5f5; padding: 30px;">
          <h2 style="color: #2D2D2D; margin-top: 0;">Shade Selection Summary</h2>

          <div style="background: white; padding: 20px; border-radius: 4px; margin-bottom: 20px;">
            <h3 style="color: #2D2D2D; margin-top: 0;">Project Details</h3>
    `;

    if (clientName) htmlBody += `<p><strong>Client:</strong> ${clientName}</p>`;
    if (projectName) htmlBody += `<p><strong>Project:</strong> ${projectName}</p>`;
    htmlBody += `<p><strong>Date:</strong> ${date}</p>`;

    htmlBody += `
            </div>

            <div style="background: white; padding: 20px; border-radius: 4px; margin-bottom: 20px;">
              <h3 style="color: #2D2D2D; margin-top: 0;">Selections by Room</h3>
    `;

    rooms.forEach(room => {
      htmlBody += `
        <div style="margin-bottom: 20px; border-left: 4px solid #8CC63F; padding-left: 15px;">
          <h4 style="color: #2D2D2D; margin: 0 0 10px 0;">${room.name}</h4>
      `;

      room.fabricSelections.forEach(fabric => {
        htmlBody += `
          <div style="background: #fafafa; padding: 10px; margin-bottom: 8px; border-radius: 4px; font-size: 13px;">
            <strong>${fabric.family}</strong> - ${fabric.color}<br/>
            <span style="color: #666;">SKU: ${fabric.sku} | Light Transmission: ${fabric.opacity}</span>
        `;
        if (fabric.notes) {
          htmlBody += `<br/><span style="color: #666;">Notes: ${fabric.notes}</span>`;
        }
        htmlBody += `</div>`;
      });

      htmlBody += `</div>`;
    });

    htmlBody += `
            </div>
          </div>

          <div style="background: #2D2D2D; color: white; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px;">
            <p style="margin: 0;">Evolution Audio • Video • Automation</p>
            <p style="margin: 5px 0 0 0; color: #8CC63F;">Bozeman, Montana</p>
          </div>
        </div>
      </div>
    `;

    // Send email
    await transporter.sendMail({
      from: process.env.SMTP_FROM || 'Evolution AV <noreply@evolutionava.com>',
      to: recipients.join(', '),
      subject: `Shade Selection Summary${projectName ? ` - ${projectName}` : ''}`,
      html: htmlBody,
    });

    res.json({ success: true, message: `Email sent to ${recipients.length} recipient(s)` });
  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({ message: 'Failed to send email: ' + error.message });
  }
});

// SPA fallback
app.get('*', (req, res) => res.sendFile(join(__dirname, 'dist', 'index.html')));

app.listen(PORT, () => console.log(`Evolution Shade Guide running on port ${PORT}`));
