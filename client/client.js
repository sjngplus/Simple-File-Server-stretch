const fileRequest = process.argv[2];
if (!fileRequest) return console.log("Please input file name to retrieve");

const net = require('net');
const fs = require('fs');

const conn = net.createConnection({ 
  host: '127.0.0.1', 
  port: 3000 
});

conn.setEncoding('utf8');

conn.on('connect', () => {
  conn.write(fileRequest);
});

conn.on('data', (requestedFile) => {
  
  if (requestedFile === "Error Code Over 9000") {
    console.log('Error! No such file exists')    
    return;
  }
  
  fs.writeFile(fileRequest, requestedFile, writeError => {
    if (writeError) {
      console.error("Error writing to file:", writeError)
      return
    }
    console.log("File request return successfully")
  })
  
});

