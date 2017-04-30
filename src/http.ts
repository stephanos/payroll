import 'reflect-metadata';

import * as Koa from 'koa';
import * as Router from 'koa-router';


function createRouter() {
    const router = new Router();
    router.get('/', async (ctx, next) => {
        await next();
        ctx.body = 'Hello!';
        ctx.status = 200;
    });
    return router;
}

function createApp(router: Router) {
    const app = new Koa();
    app.use(router.routes());
    return app;
}

async function startApp(app: Koa) {
    const port = process.env.PORT || 3000;
    return new Promise((fullfilled, rejected) => {
        app.listen(port, () => {
            console.log(`Listening on port ${port}`); // tslint:disable-line:no-console
            fullfilled(app);
        });
    });
}

async function startServer() {
    const app = createApp(createRouter());
    await startApp(app);
    return app;
}


export { startServer };
