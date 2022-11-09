import { NextFunction, Request, Response } from 'express';

import { parse } from 'node-html-parser';

import PuppeteerService from '../services/puppeteer.service'
import SearchFinder from '../utils/searchFinder'
import UrlParser from '../utils/urlParser'

//Interfaces
import { PuppeteerOptions, waitUntilEnum } from '../interfaces/puppeteer.interface'

class SearchProviderController {
  public static findSearch = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (req.query.domain == null) {
        throw new Error('Domain was empty or invalid')
      }
      const url = UrlParser.addPrefix(req.query.domain.toString());

      //Defines Puppeteer process options
      const puppeteerParams: PuppeteerOptions = {
        delay: req.query.delay != null ? parseInt(req.query.delay.toString()) : 5000,
        ua: req.query.ua != null ? req.query.ua.toString() : 'Mozilla%2F5.0%20(Windows%20NT%2010.0%3B%20cludo.com%20bot)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F61.0.3133.0%20Safari%2F537.36',
        waitUntil: (req.query.waitUntil != undefined && (req.query.waitUntil.toString() in waitUntilEnum)) ? req.query.waitUntil.toString() as waitUntilEnum : waitUntilEnum.load,
        lcs: req.query.waitUntil != null ? req.query.waitUntil.toString() : undefined
      }
      
      //Gets page content
      const pageContent = await PuppeteerService.extractContent(url, puppeteerParams)
      if (!pageContent.status) {
        throw new Error(pageContent.error)
      }
      const parsedContent = parse(pageContent.content);

      //Checks for the presence of search provider indicators
      const hasSearch = SearchFinder.hasSearch(parsedContent)

      res.send(hasSearch)

    } catch (error) {
      res.status(500)
      next(error);
    }
  };
}

export default SearchProviderController;