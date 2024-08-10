declare module "puppeteer-core" {
  import puppeteer from "puppeteer";

  export const launch: typeof puppeteer.launch;
  export const connect: typeof puppeteer.connect;
  export const executablePath: typeof puppeteer.executablePath;
  export const defaultArgs: typeof puppeteer.defaultArgs;
  export const createBrowserFetcher: typeof puppeteer.createBrowserFetcher;

  export type Browser = puppeteer.Browser;
  export type LaunchOptions = puppeteer.LaunchOptions;
  export type Page = puppeteer.Page;
  export type BrowserContext = puppeteer.BrowserContext;
}
