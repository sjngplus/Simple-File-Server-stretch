const net = require('net');
const fs = require('fs')

const server = net.createServer();

server.on('connection', (client) => {
  client.setEncoding('utf8');
  console.log('New client connected!');
  
  client.on('data', (fileRequest) => {
    console.log('Request from client for file:', fileRequest)

    fs.readFile(fileRequest, 'utf8' , (readError, requestedFile) => {
      if (readError) {
        console.error("Error reading file:", readError);
        client.write("Error Code Over 9000");
        return;
      }
      client.write(requestedFile);
    })

  });
});


server.listen(3000, () => {
  console.log('Server listening on port 3000!');
});


