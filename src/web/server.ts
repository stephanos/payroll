import 'reflect-metadata';

import * as Koa from 'koa';
import * as serve from 'koa-static';
import * as views from 'koa-views';
import * as moment from 'moment';

import { Router } from './router';


class Server {

    constructor(
        private router: Router,
    ) {}

    public async start() {
        const app = this.createApp();
        await this.startApp(app);
        return app;
    }

    private createApp() {
        const app = new Koa();
        app.use(async (ctx, next) => {
            try {
                await next();
            } catch (err) {
                console.log('uncaught error', err); // tslint:disable-line
                ctx.redirect('/error');
            }
        });
        app.use(serve(__dirname + '/assets'));
        app.use(views(__dirname + '/views', {
            map: {
                html: 'handlebars',
            },
            options: {
                helpers: {
                    toDateString: (date: Date) => moment(date).format('DD/MM/YYYY'),
                },
            },
        }));
        app.use(this.router.routes());
        return app;
    }

    private async startApp(app: Koa) {
        const port = process.env.PORT || 3000;
        return new Promise((fullfilled, rejected) => {
            app.listen(port, () => {
                console.log(`Listening on port ${port}`); // tslint:disable-line:no-console
                fullfilled(app);
            });
        });
    }
}


export { Server };
