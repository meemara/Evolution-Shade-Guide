let graphToken = null;
let tokenExpiry = 0;

async function getGraphToken() {
  if (graphToken && Date.now() < tokenExpiry - 300000) {
    return graphToken;
  }

  const tokenUrl = `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}/oauth2/v2.0/token`;
  const body = new URLSearchParams({
    client_id: process.env.AZURE_CLIENT_ID,
    client_secret: process.env.AZURE_CLIENT_SECRET,
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

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

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

    rooms.forEach((room) => {
      htmlBody += `
        <div style="margin-bottom: 20px; border-left: 4px solid #8CC63F; padding-left: 15px;">
          <h4 style="color: #2D2D2D; margin: 0 0 10px 0;">${room.name}</h4>
      `;

      room.fabricSelections.forEach((fabric) => {
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
    `;

    const mailSender = process.env.MAIL_SENDER || 'mmeece@evolutionava.com';
    const token = await getGraphToken();

    const message = {
      message: {
        subject: `Shade Selection Summary${projectName ? ` - ${projectName}` : ''}`,
        body: { contentType: 'HTML', content: htmlBody },
        toRecipients: recipients.map((email) => ({
          emailAddress: { address: email },
        })),
      },
      saveToSentItems: false,
    };

    const resp = await fetch(
      `https://graph.microsoft.com/v1.0/users/${mailSender}/sendMail`,
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

    res.json({ success: true, message: `Email sent to ${recipients.length} recipient(s)` });
  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({ message: 'Failed to send email: ' + error.message });
  }
}
