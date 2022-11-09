import puppeteer from 'puppeteer';

import globalOptions from '../config/puppeteerOptions'

//Interfaces
import { PuppeteerOptions } from '../interfaces/puppeteer.interface'

type PuppeteerServiceResponse = {
  status: boolean,
  error?: any,
  content: string
}

class PuppeteerService {
  static async extractContent(url: string, pupOptions: PuppeteerOptions): Promise<PuppeteerServiceResponse> {
    try {
      const options = globalOptions.getOptions();
      //Open Chromiun Browser
      const browser = await puppeteer.launch(options);
      const page = await browser.newPage();

      page.setRequestInterception(true);
      page.on('request', async (request) => {
        if (request.resourceType() === 'stylesheet') {
          await request.respond({
            body: '',
            status: 200,
          });
        } else if (['image', 'font'].indexOf(request.resourceType()) !== -1) {
          await request.abort();
        } else {
          const requestHeaders = request.headers();
          await request.continue({ headers: requestHeaders });
        }
      });

      //Navigate
      await page.goto(url, { timeout: pupOptions.delay, waitUntil: pupOptions.waitUntil });

      //Extract Content
      const content = await page.evaluate(() => {
        {
          const dom = document.querySelector('*');
          return dom?.outerHTML
        }
      });

      if (content == undefined) {
        throw new Error('Page content was empty')
      }

      //Close Chromiun Browser
      await browser.close();

      return {
        status: true,
        content: content
      }
    } catch (err: unknown) {
      return {
        status: false,
        error: err,
        content: ''
      }
    }
  }
}
export default PuppeteerService
