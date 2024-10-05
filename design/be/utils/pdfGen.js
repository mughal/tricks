const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const { finished } = require('stream/promises');

/**
 * Function to create a PDF with a heading, body, links, and footer
 * @param {string} heading - The heading of the PDF
 * @param {string} body - The body text of the PDF
 * @param {Array} linksObjects - Array of objects with {text, link} for clickable links
 * @param {string} footer - The footer text of the PDF
 * @param {string} outputFilePath - The file path where the PDF should be saved
 * @returns {Promise<string>} - Resolves with the file path when PDF is successfully created
 */
async function createPDF(heading, body, linksObjects, footer, outputFilePath) {
    const doc = new PDFDocument();
    const writeStream = fs.createWriteStream(outputFilePath);

    doc.pipe(writeStream);

    // Add heading
    if (heading) {
        doc.fontSize(20).text(heading, { align: 'center', underline: true });
    }

    // Add body text
    if (body) {
        doc.moveDown().fontSize(14).text(body, { align: 'left' });
    }

    // Add clickable links
    if (Array.isArray(linksObjects) && linksObjects.length > 0) {
        doc.moveDown();
        linksObjects.forEach(({ text, link }) => {
            doc.fontSize(12).text(text, {
                link: link,
                underline: true,
                color: 'blue'
            });
            doc.moveDown(0.5);
        });
    }

    // Add footer
    if (footer) {
        doc.moveDown(2).fontSize(10).text(footer, { align: 'center' });
    }

    // Finalize the PDF
    doc.end();

    // Await the stream to finish
    await finished(writeStream);

    return outputFilePath;
}

// Export the createPDF function
module.exports = { createPDF };

// Test call if this script is run directly
if (require.main === module) {
    (async () => {
        try {
            const heading = 'Test Device Report';
            const body = 'This is a test report for the device.';
            const linksObjects = [
                { text: 'Test Device Link', link: 'http://yourdomain.com/device/testdevice' }
            ];
            const footer = 'Test Footer';
            const outputFilePath = path.join(__dirname, 'test_device_report.pdf');

            // Generate the PDF for testing
            const filePath = await createPDF(heading, body, linksObjects, footer, outputFilePath);
            console.log(`Test PDF created at ${filePath}`);
        } catch (error) {
            console.error('Error creating test PDF:', error);
        }
    })();
}
