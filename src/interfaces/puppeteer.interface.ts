import { PuppeteerLifeCycleEvent } from 'puppeteer';

export interface PuppeteerOptions {
  delay: number,
  ua: string,
  waitUntil: PuppeteerLifeCycleEvent,
  lcs?: string
}

export enum waitUntilEnum {
  load = 'load',
  domcontentloaded = 'domcontentloaded',
  networkidle0 = 'networkidle0',
  networkidle2 = 'networkidle2'
}