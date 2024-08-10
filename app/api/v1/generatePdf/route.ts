import { NextRequest, NextResponse } from "next/server";
import chromium from "chrome-aws-lambda";
import puppeteer, { Browser, LaunchOptions } from "puppeteer-core";

// Define a partial type for chrome-aws-lambda to prevent TypeScript errors
let chrome: Partial<typeof chromium> = {};
let puppeteerLib: typeof puppeteer;

if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
  chrome = require("chrome-aws-lambda");
  puppeteerLib = require("puppeteer-core");
} else {
  puppeteerLib = require("puppeteer");
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  let options: LaunchOptions = {};

  if (
    process.env.AWS_LAMBDA_FUNCTION_VERSION &&
    chrome.args &&
    chrome.executablePath
  ) {
    options = {
      args: [...chrome.args, "--hide-scrollbars", "--disable-web-security"],
      defaultViewport: chrome.defaultViewport || null,
      executablePath: await chrome.executablePath,
      headless: true,
      ignoreHTTPSErrors: true,
    };
  } else {
    options = {
      headless: true,
    };
  }

  console.log("Puppeteer Launch Options:", options);

  let browser: Browser | null = null;

  try {
    console.log("Launching Puppeteer browser...");
    browser = await puppeteerLib.launch(options);
    console.log("Browser launched successfully");

    const page = await browser.newPage();
    console.log("New page created");

    console.log("Navigating to the URL...");
    await page.goto("https://aishowprep.com/showprep?forPdf=false", {
      waitUntil: "networkidle0",
    });
    console.log("Page navigation complete");

    const pdfBuffer = await page.pdf({ format: "a4" });
    console.log("PDF generated successfully. Buffer length:", pdfBuffer.length);

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=page.pdf",
      },
    });
  } catch (err) {
    console.error("Error generating PDF:", err);
    return new NextResponse("Failed to generate PDF", { status: 500 });
  } finally {
    if (browser !== null) {
      console.log("Closing browser...");
      await browser.close();
      console.log("Browser closed");
    }
  }
}
