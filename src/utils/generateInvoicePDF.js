import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";

const generateInvoiceHTML = (products) => {
  const productRows = products
    .map(
      (p, index) => `
      <tr class="bg-white">
        <td class="p-3">${index + 1}</td>
        <td class="p-3">${p.name}</td>
        <td class="p-3">${p.quantity}</td>
        <td class="p-3">₹${p.price}</td>
        <td class="p-3">₹${p.quantity * p.price}</td>
      </tr>`
    )
    .join("");
  const total = products.reduce((sum, p) => sum + p.quantity * p.price, 0);

  return `
    <html>
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
        @page {
            margin: 40px;
        }
        </style>
      </head>
      <body>
        <div class="max-w-4xl mx-auto p-6">
        <div class="flex justify-between items-start mb-4">
            <div class="d-flex">
            <img src="https://dummyimage.com/60x60/000/fff&text=Logo" alt="Logo" class="w-12 h-12" />
              <div class="ml-2">
                <h2 class="text-xl font-bold mt-2">Levitation</h2>
                <p class="text-xs text-gray-500">InTech</p>
              </div>
            </div>
            <div class="text-right">
            <h1 class="text-2xl font-semibold">INVOICE REPORT</h1>
            <p class="text-sm text-gray-500">Invoice ID: <strong>${
              "INV" + Date.now()
            }</strong></p>
            <p class="text-sm mt-2">Date : <strong>${new Date().toLocaleDateString()}</strong></p>
            </div>
        </div>

        <div class="bg-gradient-to-r from-indigo-900 to-green-700 text-white p-4 rounded-lg flex justify-between items-center mb-6">
            <div class="bg-white text-gray-700 px-4 py-2 rounded-full text-sm font-medium">
            <p class="text-sm">Name</p>
            <p class="text-xl font-semibold">${products[0].user.name}</p>
            </div>
            <div class="bg-white text-gray-700 px-4 py-2 rounded-full text-sm font-medium">
            <p class="text-sm">Email</p>
            <p class="text-xl font-semibold">${products[0].user.email}</p>
            </div>
        </div>
        
        <table class="w-full text-sm border-collapse">
            <thead>
            <tr class="bg-gradient-to-r from-indigo-900 to-green-700 text-white">
                <th class="p-3 text-left">S.No.</th>
                <th class="p-3 text-left rounded-tl-lg">Product</th>
                <th class="p-3 text-left">Qty</th>
                <th class="p-3 text-left">Rate</th>
                <th class="p-3 text-left rounded-tr-lg">Total Amount</th>
            </tr>
            </thead>
            <tbody class="text-gray-700">
            ${productRows}
            </tbody>
        </table>

        <div class="flex justify-end mt-6">
            <div class="w-64 bg-white border border-gray-200 shadow-md rounded-lg p-4">
            <div class="flex justify-between mb-2">
                <span>Total Charges</span>
                <span>₹ ${total}</span>
            </div>
            <div class="flex justify-between mb-2">
                <span>GST (18%)</span>
                <span>₹ ${total * 0.18}</span>
            </div>
            <hr class="my-2" />
            <div class="flex justify-between font-semibold text-blue-700 text-lg">
                <span>Total Amount</span>
                <span>₹ ${total + total * 0.18}</span>
            </div>
            </div>
        </div>
        <p class="mt-4 text-sm text-gray-400">Date: ${new Date().toLocaleDateString()}</p>

        <p class="mt-40 text-center text-sm text-gray-700 border-black pt-4">
            We are pleased to provide any further information you may require and look forward to assisting with
            your next order. Rest assured, it will receive our prompt and dedicated attention.
        </p>

        </div>
      </body>
    </html>
  `;
};

const generateInvoicePDF = async (invoice) => {
  const html = generateInvoiceHTML(invoice);
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setContent(html);
  const pdfBuffer = await page.pdf({ format: "A4" });

  await browser.close();
  return pdfBuffer;
};

export default generateInvoicePDF;
