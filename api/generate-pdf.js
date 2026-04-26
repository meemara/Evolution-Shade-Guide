import PDFDocument from 'pdfkit';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { clientName, projectName, rooms, date } = req.body;

    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${clientName || 'Selections'}-${projectName || 'Project'}.pdf"`
    );

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

      room.fabricSelections.forEach((fabric) => {
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
    doc
      .fontSize(9)
      .fillColor('#999999')
      .text('For more information, contact Evolution Audio • Video • Automation');

    doc.end();
  } catch (error) {
    console.error('PDF generation error:', error);
    res.status(500).json({ message: 'Failed to generate PDF' });
  }
}
