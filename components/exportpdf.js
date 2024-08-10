
// here's how to compile PDF from tailwind

const express = require('express');
const puppeteer = require('puppeteer');

const app = express();

app.use(express.static('public'));

app.get('/generate-pdf', async (req, res) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(`http://localhost:${PORT}/index.html`, { waitUntil: 'networkidle0' });

  const pdfBuffer = await page.pdf({ format: 'A4' });

  await browser.close();

  res.set({
    'Content-Type': 'application/pdf',
    'Content-Disposition': 'attachment; filename=output.pdf',
    'Content-Length': pdfBuffer.length,
  });

  res.send(pdfBuffer);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Add watermark

const { PDFDocument, rgb } = require('pdf-lib');

async function addWatermark(pdfBuffer) {
  const pdfDoc = await PDFDocument.load(pdfBuffer);
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];
  firstPage.drawText('Confidential', {
    x: 50,
    y: 500,
    size: 50,
    color: rgb(0.95, 0.1, 0.1),
    rotate: degrees(45),
    opacity: 0.5,
  });

  return await pdfDoc.save();
}

app.get('/generate-pdf', async (req, res) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(`http://localhost:${PORT}/index.html`, { waitUntil: 'networkidle0' });

  const pdfBuffer = await page.pdf({ format: 'A4' });

  await browser.close();

  const watermarkedPdfBuffer = await addWatermark(pdfBuffer);

  res.set({
    'Content-Type': 'application/pdf',
    'Content-Disposition': 'attachment; filename=output.pdf',
    'Content-Length': watermarkedPdfBuffer.length,
  });

  res.send(watermarkedPdfBuffer);
});



