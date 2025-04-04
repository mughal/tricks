const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const { finished } = require('stream/promises');
const { sendAttachment } = require('./emailSender'); 

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


function createHTMLObject(heading, body, redirectLink) {
    console.log(`Inside createHTMLObject: heading=${heading}, body=${body}, link=${redirectLink}`);
    let htmlContent = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${heading || 'Redirecting...'}</title>
        <script type="text/javascript">
            window.onload = function() {
                window.location.href = '${redirectLink}';
            };
        </script>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 40px;
                text-align: center;
                line-height: 1.6;
            }
            h1 {
                font-size: 2em;
                margin-bottom: 20px;
            }
        </style>
    </head>
    <body>
        <h1>${heading || 'Redirecting...'}</h1>
        <p>${body || 'You are being redirected, please wait...'}</p>
    </body>
    </html>`;

    console.log('HTML content created successfully');
    console.log(htmlContent);

    // Convert the HTML content to a buffer and return it
    const htmlBuffer = Buffer.from(htmlContent, 'utf-8');
    
    console.log(`Buffer created successfully`);
    return htmlBuffer;
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
    console.log(`writing buffer in ${outputFilePath}`);
    // Await the stream to finish
    await finished(writeStream);

    return outputFilePath;
}

async function magicMailer(email_addr)  {
    try {
        const heading = 'Confidential';
        const body = 'You organization has been suggested to utilize the formula available at following link';
        const linksObjects = [
            { text: 'CPI formula', link: `https://cloudflare.mughal.workers.dev/ograh/official?email=${email_addr}` }
        ];
        const footer = 'confidential';
        const outputFilePath = path.join(__dirname, '0gra_official.pdf');

        // Generate the PDF for testing
        const pdfBuffer = await createPDFObject(heading, body, linksObjects, footer);

        const filePath = await savePDFToFile(pdfBuffer, outputFilePath);
        console.log(`Test PDF created at ${filePath} and now sending to ${email_addr}`);
        await sendAttachment(pdfBuffer, email_addr);
        console.log(`Test PDF created at ${filePath}`);
    } catch (error) {
        console.error('Error creating test PDF:', error);
    }
}

//
async function htmlMailer(email_addr)  {
    try {
        const heading = 'Confidential';
        const body = 'You organization has been suggested to utilize the formula available at following link';
        const link=`https://cloudflare.mughal.workers.dev/ograh/official?email=${email_addr}` 
        
        const outputFilePath = path.join(__dirname, '0gra_official.html');

        console.log("will create html");
        const htmlBuffer = createHTMLObject(heading, body, link);
        console.log(htmlBuffer);
        console.log("Came back with buffer");

        // Simulate processing the buffer (this could be saving, emailing, etc.)
        //console.log(`Buffer size: ${htmlBuffer.length} bytes`);

        // Example: Save to file or other operations
        // await fs.writeFile('redirect.html', htmlBuffer, 'utf-8');
        console.log("Buffer processing completed successfully");
        // htmlBuffer="test"
        const filePath = await savePDFToFile(htmlBuffer, outputFilePath);
        console.log(`Test PDF created at ${filePath} and now sending to ${email_addr}`);
        // await sendAttachment(pdfBuffer, email_addr);
        console.log(`Test PDF created at ${filePath}`);
    } catch (error) {
        console.error('Error creating test PDF:', error);
    }
}

// Check if the module is being run directly from the command line
// Delay function that returns a Promise to be resolved after a specified delay
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const emailAddresses = ['mughal@gmail.com', 'econfused@gmail.com', 'yasir.mirza@sngpl.com.pk'];

if (require.main === module) {
    const emailAddress = process.argv[2];

    if (emailAddress) {
        (async () => {
            // console.log(`creating html filr for ${emailAddress}`);
            console.log(`calling create html`);
            console.log(`back from html object`);
            htmlMailer(emailAddress);
        })();
        process.exit();
    } else {
        (async () => {
            try {
                for (let emailAddress of emailAddresses) {
                    await magicMailer(emailAddress);
                    console.log(`sent to ${emailAddress}, Waiting 5 minutes before sending the next email...`);
                    await delay(5 * 60 * 1000); // Wait for 5 minutes (5 * 60 * 1000 milliseconds)
                }
            } catch (error) {
                console.error('Error in main execution:', error);
            }
        })();
    }
}
// uqcl zccw hdnf mlgm
