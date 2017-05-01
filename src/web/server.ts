import 'reflect-metadata';

import * as Koa from 'koa';
import * as Router from 'koa-router';

import { PayrollReportService } from '../payroll/report';
import { PayrollTimeTrackService } from '../payroll/track';


class Server {

    constructor(
        private track: PayrollTimeTrackService,
        private report: PayrollReportService,
    ) {}

    public async start() {
        const app = this.createApp(this.createRouter());
        await this.startApp(app);
        return app;
    }

    private createRouter() {
        const router = new Router();
        router.get('/', async (ctx, next) => {
            await next();
            ctx.body = 'Hello!';
            ctx.status = 200;
        });
        return router;
    }

    private createApp(router: Router) {
        const app = new Koa();
        app.use(router.routes());
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
