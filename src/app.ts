import express, { Application, NextFunction, Request, Response } from 'express'
import * as bodyParser from 'body-parser';
import cors from 'cors';

//Controllers
import SearchProviderController from './controllers/searchprovider.controller';

const app: Application = express()

const port = 3000

//Middlewares
app.use(logger);
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  SearchProviderController.findSearch(req, res, next);
})

app.listen(port, function () {
  console.log(`App is listening on port ${port} !`)
})

function logger(request: express.Request, response: express.Response, next: () => void) {
  console.log(`${new Date().toISOString()}: ${request.method} request received on endpoint:  ${request.path}`);
  next();
}