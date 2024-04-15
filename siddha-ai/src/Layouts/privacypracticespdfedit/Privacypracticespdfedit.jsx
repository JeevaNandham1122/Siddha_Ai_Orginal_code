
// import { PDFDocument } from 'pdf-lib';

// import samplePdf from '../../assets/sample.pdf';



// // const [ pdfDataUri, setPdfDataUri ] = useState(null);
// const handleInsertImage = async () => {

  
//       try {
//       const pdfData = new Uint8Array(await fetch(samplePdf).then((response)=>response.arrayBuffer()));
//       const imageBlob = await fetch(url).then((response) => response.arrayBuffer());
  
//       const pdfDoc = await PDFDocument.load(pdfData);
//       const page = pdfDoc.getPages();
//       const pages = page[5]
  
//       const image = await pdfDoc.embedPng(imageBlob);
//       const { width, height } = image.scale(0.5);
  
//       pages.drawImage(image, {
//         x: 500,
//         y: 100,
//         width,
//         height,
//         opacity: 1,
//       });
  
//       const modifiedPdfBytes = await pdfDoc.save();
  
//       // Convert modified PDF to a data URI to display it in a React component
//       const modifiedPdfDataUri = `data:application/pdf;base64,${btoa(
//         String.fromCharCode(...modifiedPdfBytes)
//       )}`;
//       // setPdfDataUri(modifiedPdfDataUri);
//       const pdfDataUri = modifiedPdfDataUri
//       return pdfDataUri
  
//     } catch (error) {
//       console.error('Error loading or manipulating the PDF:', error);
//     }

//   };

