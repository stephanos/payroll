import * as KoaRouter from 'koa-router';

import { PayrollReportService } from '../payroll/report';
import { PayrollTimeTrackService } from '../payroll/track';


const multer = require('koa-multer'); // tslint:disable-line
const upload = multer({ storage: multer.memoryStorage() });


class Router {

    private koaRouter: KoaRouter;

    constructor(
        tracker: PayrollTimeTrackService,
        reporter: PayrollReportService,
    ) {
        const router = new KoaRouter();

        router.get('/', async (ctx, next) => {
            await ctx.render('upload');
        });

        router.get('/error', async (ctx, next) => {
            await ctx.render('error');
        });

        router.post('/upload', upload.single('report'), async (ctx) => {
            const csv = (ctx.req as any).file.buffer.toString('utf-8');
            try {
                await tracker.importCSV(csv);
            } catch (err) {
                await ctx.render('upload', { error: err.message });
                return;
            }
            ctx.redirect('/report');
        });

        router.get('/report', async (ctx, next) => {
            await ctx.render('report', {
                report: await reporter.generateReport(),
            });
        });

        this.koaRouter = router;
    }

    public routes() {
        return this.koaRouter.routes();
    }
}

export { Router };
