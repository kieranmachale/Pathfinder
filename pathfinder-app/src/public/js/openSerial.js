const normalRadioButton = document.querySelector("#rd1");
const sketchRadioButton = document.querySelector("#rd2");
const connectButton = document.getElementById ("openSerial");
// Filter on devices with the Arduino Uno USB Vendor/Product IDs.
const filters = [
    { usbVendorId: 0x2341, usbProductId: 0x0043 },
    { usbVendorId: 0x2341, usbProductId: 0x0001 }
];
let port;
let noRotations = document.querySelector("#rotations");
let temp = document.querySelector("#temp");
let length = document.querySelector("#modal-length");

if ('serial' in navigator) {
  connectButton.addEventListener('click', function () {
    // Store user's configurations in local storage
    localStorage.setItem("currentRotations", noRotations.value);
    localStorage.setItem("currentTemp", temp.value);
    localStorage.setItem("objectLength", length.innerHTML.toString().split(" ")[0]);

    if (port) {
      port.close();
      port = undefined;

      connectButton.innerText = '🔌 Connect';
      document.querySelector('figure').classList.replace('bounceIn', 'fadeOut');
    }
    else {
      // No mode selected
      if(!normalRadioButton.checked==true && !sketchRadioButton.checked==true){
        window.alert("Please select a connection mode!");
      }else if(normalRadioButton.checked==true){
        getReader();
      }else{
        window.open('http://localhost:3000/sketch', '_blank');
      }
    }
  });

  connectButton.disabled = false;
}
else {
  /*
  const firstBubble = document.querySelector("#bubble");
  const noSerialSupportNotice = document.createElement('p');
  noSerialSupportNotice.innerHTML = '<p class="notice bubble">You\'re on the right track! This browser is lacking support for Web Serial API, though, and thats a bummer.</p>';

  firstBubble.parentNode.insertBefore(noSerialSupportNotice, firstBubble.nextSibling);
  */
  const firstBubble = document.querySelector(".bubble");
  firstBubble.innerHTML = "<b>NOTE:</b> This browser is lacking support for the Web Serial API. To use all features of the app please use Google Chrome";
}

/* Get available ports */
async function getReader() {
    port = await navigator.serial.requestPort({ filters });
    await port.open({ baudRate: 9600 });
    connectButton.innerText = '🔌 Disconnect';
    if(!port.writable){
      console.log("Not writable!");
    }
    const textEncoder = new TextEncoderStream();
    const writableStreamClosed = textEncoder.readable.pipeTo(port.writable);

    const writer = textEncoder.writable.getWriter();
    const res = await writeStream(writer);

    writer.releaseLock();
    port.close();
}

function writeStream(writer){
  return new Promise((resolve, reject) => {
  setTimeout(function(){
    writer.write(String.fromCharCode(14)); // Send data to Arduino

  }, 3000);  
  });
}