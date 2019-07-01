const router = require('koa-router')()

router.all('/newList-select-by-paging', async(ctx, next)  => {
	ctx.websocket.send('Hello World')
	ctx.websocket.on('message', function(message){
		console.log(message)
	})
	setTimeout(()=>{
        ctx.websocket.send('111111 World')
	},2000)
})

module.exports = router