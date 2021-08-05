const { createServer } = require("./index");
const redis = require("redis")

const { app } = createServer();


// redis.createClient({
//     port      : 6379,
//     host      : 'redis'
// });


app.listen(4000, function () {
  console.log('You are successfully running a Notification API');
});

