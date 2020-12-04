const SerialPort = require('serialport')

SerialPort.list().then((ports) => {
  console.log('Serials ports :', ports)

  // 
}).catch((error) => {
  console.error('Serials error :', error)
})

var comNamePath = '/dev/tty.usbmodem141121101';
/**
{
  path: '/dev/tty.usbmodem141121101',
  manufacturer: 'Arduino (www.arduino.cc)',
  serialNumber: '75833353734351315192',
  pnpId: undefined,
  locationId: '14112110',
  vendorId: '2341',
  productId: '0043'
}
 */

var port = new SerialPort(comNamePath, {
  autoOpen: true
}).setEncoding('hex')

// Open errors will be emitted as an error event
port.on('error', (err) => {
  console.log('port Error:', err)
})

// The open event is always emitted
port.on('open', () => {
  console.log('port open')
})

// Read data that is available but keep the stream in "paused mode"
port.on('readable', function () {
  var readableData = port.read()
  //readableDataToString = readableData.toString('utf-8', 0, 24)
  //console.log('port readable:', readableData, readableDataToString)
})

const convert = (from, to) => str => Buffer.from(str, from).toString(to)
const utf8ToHex = convert('utf8', 'hex')
const hexToUtf8 = convert('hex', 'utf8')

//hexToUtf8(utf8ToHex('dailyfile.host')) === 'dailyfile.host'

// Switches the port into "flowing mode"
var serialData = [];
var serialDataTimeout = null;

// https://www.techonthenet.com/ascii/chart.php
// console.log('new line', parseInt('0a', 16)); // 10	0A	012	^J	Line feed (LF)

port.on('data', function (data) {
  const dataToString = String(data)

  var parts = dataToString.match(/.{1,2}/g); // Need split string into 2 part [xx, aa, bb]
  serialData = serialData.concat(parts);

  clearTimeout(serialDataTimeout)
  serialDataTimeout = setTimeout(() => { // Need setTimeout to put buffer in array
    console.log('data:', serialData)
    var textFromSerialData = [];
    for( var i in serialData ){
      textFromSerialData.push(String.fromCharCode(parseInt(serialData[i], 16)));
    }
    console.log('data:', textFromSerialData.join(''))
    console.log()
    
    serialData = [] // Reset bar code
  }, 25)

})

setInterval(() => {
  
  port.write('abc', function(err) {
    if (err) {
      return console.log('Error on write: ', err.message)
    }
    console.log('message written')
  })

}, 2000);