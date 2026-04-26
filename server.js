import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import PDFDocument from 'pdfkit';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(join(__dirname, 'dist')));

// --- Microsoft Graph API Email ---
const AZURE_TENANT_ID = process.env.AZURE_TENANT_ID;
const AZURE_CLIENT_ID = process.env.AZURE_CLIENT_ID;
const AZURE_CLIENT_SECRET = process.env.AZURE_CLIENT_SECRET;
const MAIL_SENDER = process.env.MAIL_SENDER || 'mmeece@evolutionava.com';

let graphToken = null;
let tokenExpiry = 0;

async function getGraphToken() {
  // Return cached token if still valid (with 5-min buffer)
  if (graphToken && Date.now() < tokenExpiry - 300000) {
    return graphToken;
  }

  const tokenUrl = `https://login.microsoftonline.com/${AZURE_TENANT_ID}/oauth2/v2.0/token`;
  const body = new URLSearchParams({
    client_id: AZURE_CLIENT_ID,
    client_secret: AZURE_CLIENT_SECRET,
    scope: 'https://graph.microsoft.com/.default',
    grant_type: 'client_credentials',
  });

  const resp = await fetch(tokenUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });

  if (!resp.ok) {
    const errText = await resp.text();
    throw new Error(`Token request failed (${resp.status}): ${errText}`);
  }

  const data = await resp.json();
  graphToken = data.access_token;
  tokenExpiry = Date.now() + data.expires_in * 1000;
  return graphToken;
}

async function sendMailViaGraph({ to, subject, htmlBody }) {
  const token = await getGraphToken();

  const message = {
    message: {
      subject,
      body: { contentType: 'HTML', content: htmlBody },
      toRecipients: to.map(email => ({
        emailAddress: { address: email },
      })),
    },
    saveToSentItems: false,
  };

  const resp = await fetch(
    `https://graph.microsoft.com/v1.0/users/${MAIL_SENDER}/sendMail`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    }
  );

  if (!resp.ok) {
    const errText = await resp.text();
    throw new Error(`Graph sendMail failed (${resp.status}): ${errText}`);
  }
}

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

    // Send via Microsoft Graph API
    await sendMailViaGraph({
      to: recipients,
      subject: `Shade Selection Summary${projectName ? ` - ${projectName}` : ''}`,
      htmlBody,
    });

    res.json({ success: true, message: `Email sent to ${recipients.length} recipient(s)` });
  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({ message: 'Failed to send email: ' + error.message });
  }
});

// Fabric image proxy — fetches from assets.lutron.com CDN and caches in memory
const fabricImageCache = new Map();

app.get('/api/fabric-image/:sku', async (req, res) => {
  const sku = req.params.sku.toLowerCase();
  const cacheKey = sku;

  // Serve from cache if available
  if (fabricImageCache.has(cacheKey)) {
    const cached = fabricImageCache.get(cacheKey);
    res.set('Content-Type', cached.type);
    res.set('Cache-Control', 'public, max-age=604800');
    return res.send(cached.buffer);
  }

  // Try multiple URL patterns — Lutron uses assets.lutron.com CDN
  const urlPatterns = [
    `https://assets.lutron.com/a/images/fabrics/fabric_thumbnail_image_${sku}_1.jpg`,
    `https://assets.lutron.com/a/images/fabrics/fabric_thumbnail_image_${sku}_1.png`,
    `https://www.lutronfabrics.com/a/images/fabrics/fabric_thumbnail_image_${sku}_1.jpg`,
  ];

  for (const imgUrl of urlPatterns) {
    try {
      const resp = await fetch(imgUrl, {
        headers: {
          'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.9',
          'Referer': 'https://www.lutronfabrics.com/',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        },
        redirect: 'follow',
      });

      if (resp.ok) {
        const contentType = resp.headers.get('content-type') || 'image/jpeg';
        const buffer = Buffer.from(await resp.arrayBuffer());

        // Only cache if we got actual image data (not an error page)
        if (buffer.length > 500) {
          fabricImageCache.set(cacheKey, { buffer, type: contentType });
          res.set('Content-Type', contentType);
          res.set('Cache-Control', 'public, max-age=604800');
          return res.send(buffer);
        }
      }
    } catch (err) {
      console.error(`Proxy fetch failed for ${imgUrl}:`, err.message);
    }
  }

  // Return a placeholder SVG if all attempts fail
  const placeholderSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="366" height="275" viewBox="0 0 366 275">
    <rect width="366" height="275" fill="#E8E8E8"/>
    <text x="183" y="130" text-anchor="middle" font-family="Arial" font-size="14" fill="#999">Fabric Texture</text>
    <text x="183" y="150" text-anchor="middle" font-family="Arial" font-size="11" fill="#BBB">${sku.toUpperCase()}</text>
  </svg>`;

  res.set('Content-Type', 'image/svg+xml');
  res.set('Cache-Control', 'public, max-age=3600');
  res.send(placeholderSvg);
});

// SPA fallback
app.get('*', (req, res) => res.sendFile(join(__dirname, 'dist', 'index.html')));

app.listen(PORT, () => console.log(`Evolution Shade Guide running on port ${PORT}`));
