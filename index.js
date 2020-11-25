var Koa = require('koa');
var router = require('koa-router')();


var url = require('url');
const serve = require('koa-static');
const IO = require('koa-socket')
const io = new IO();

var app = new Koa();
app.use(serve('static'))
io.attach(app);



router.get('/', async (ctx) => {
    await ctx.render('index');
})

app.use(router.routes());   /*启动路由*/
app.use(router.allowedMethods());

app._io.on('connection', socket => {
    console.log('建立连接了');

    // 监听客户端连接
    socket.on("addData", function (data) {
        console.log(data);
        socket.broadcast.emit("addInputData", data);
    })
})

app.listen(3000);