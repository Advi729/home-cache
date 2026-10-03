import fs from "fs/promises";
// import * as pdfParse from "pdf-parse";
import { PDFParse } from 'pdf-parse';

export const extractPdfText = async (
  filePath: string
): Promise<string> => {
  const fileBuffer = await fs.readFile(filePath);

  // const pdf = await (pdfParse as any).default(fileBuffer);
  // return pdf.text.trim();
  // Checks for .default first, and if it's undefined, calls pdfParse directly
  // const parseFn = (pdfParse as any).default || (pdfParse as any);
  
  // const pdf = await parseFn(fileBuffer);

// Convert the Node Buffer into a standard Uint8Array to satisfy modern PDF.js engines
  const uint8ArrayData = new Uint8Array(
    fileBuffer.buffer, 
    fileBuffer.byteOffset, 
    fileBuffer.byteLength
  );
  
  const parser = new PDFParse(uint8ArrayData);
  
	const pdf = await parser.getText();
	console.log(pdf.text);
  return pdf.text.trim();
};