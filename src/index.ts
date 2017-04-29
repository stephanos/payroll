import * as Koa from 'koa';
import { Request } from 'koa';
import * as Router from 'koa-router';


const router = new Router();
router.get('/', async (ctx, next) => {
    await next();
    ctx.body = 'Hello!';
    ctx.status = 200;
});


const app = new Koa();
app.use(router.routes());


const port = process.env.PORT || 3000;
app.listen(port,
    () => console.log(`Listening on port ${port}`)); // tslint:disable-line:no-console


export { app };
