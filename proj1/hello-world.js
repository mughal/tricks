// // const { createServer } = require('node:http');

// // const hostname = '127.0.0.1';
// // const port = 3000;

// // const server = createServer((req, res) => {
// //   res.statusCode = 200;
// //   res.setHeader('Content-Type', 'text/plain');
// //   res.end('Hello World');
// // });

// // server.listen(port, hostname, () => {
// //   console.log(`Server running at http://${hostname}:${port}/`);
// // });
// // __dirname Global Variable
// console.log(__dirname);

// // __filename Global Variable
// console.log(__filename);
// const sayHello = require('./hello.js');
// sayHello("Hina");


// const myModule = require('./myModule');

// myModule.myFunction1(); // logs 'Hello from myFunction!'
// myModule.myFunction2(); // logs 'Hello from myFunction!'


// const os = require('os');

// // os.uptime()
// const systemUptime = os.uptime();

// // os.userInfo()
// const userInfo = os.userInfo();

// // We will store some other information about my WindowsOS in this object:
// const otherInfo = {
//     name: os.type(),
//     release: os.release(),
//     totalMem: os.totalmem(),
//     freeMem: os.freemem(),
// }

// // Let's Check The Results:
// console.log(systemUptime);
// console.log(userInfo);
// console.log(otherInfo);


// // Import 'path' module using the 'require()' method:
// const path = require('path')

// // Assigning a path to the myPath variable
// const myPath = 'F:\software\dev\learn\js\oddin\repos\proj1\hello-world.js'

// const pathInfo = {
//     fileName: path.basename(myPath),
//     folderName: path.dirname(myPath),
//     fileExtension: path.extname(myPath),
//     absoluteOrNot: path.isAbsolute(myPath),
//     detailInfo: path.parse(myPath),
// }

// // Let's See The Results:
// console.log(pathInfo);


// // Importing 'events' module and creating an instance of the EventEmitter Class
// const EventEmitter = require('events');
// const myEmitter = new EventEmitter();

// // Listener Function - welcomeUser()
// const welcomeUser = () => {
//     console.log('Hi There, Welcome to the server!');
// }

// // Listener Function - welcomeUser()
// const goodByeUser = () => {
//     console.log('Hi There, Goodbye from the server!');
// }
// // Listening for the userJoined event using the on() method
// myEmitter.on('userJoined', welcomeUser);
// myEmitter.on('userJoined', goodByeUser);

// // Emitting the userJoined event using the emit() method
// myEmitter.emit('userJoined');


// const myEvent = new EventEmitter();

// // Listener function
// const greetBirthday = (name, newAge) => {
//     // name = John
//     // newAge = 24
//     console.log(`Happy Birthday ${name}. You are now ${newAge}!`);
// }

// // Listening for the birthdayEvent
// myEmitter.on('birthdayEvent', greetBirthday);

// // Emitting the birthdayEvent with some extra parameters
// myEmitter.emit('birthdayEvent', 'John', '24');

const http = require('http');

const server = http.createServer((req, res) => {
    if(req.url === '/'){
        res.end('This is my Home Page');
    } else if(req.url === '/about'){
        res.end('This is my About Page');
    } else if(req.url === '/contact'){
        res.end('This is my Contact Page');
    } else {
        res.end('404, Resource Not Found');
    }
})

server.listen(5000, () => {
	console.log('Server listening at port 5000');
})