/* Script that handles serial communication between Chrome and Arduino */

const connectButton = document.getElementById ("openSerial");
let port;

if ('serial' in navigator) {
  connectButton.addEventListener('click', function () {
    if (port) {
      port.close();
      port = undefined;

      connectButton.innerText = '🔌 Connect';
      document.querySelector('figure').classList.replace('bounceIn', 'fadeOut');
    }
    else {
      getReader();
    }
  });

  connectButton.disabled = false;
}
else {
  const firstBubble = document.querySelector('p.bubble');
  const noSerialSupportNotice = document.createElement('p');
  noSerialSupportNotice.innerHTML = '<p class="notice bubble">You\'re on the right track! This browser is lacking support for Web Serial API, though, and thats a bummer.</p>';

  firstBubble.parentNode.insertBefore(noSerialSupportNotice, firstBubble.nextSibling);
}

/* Get available ports */
async function getReader() {
    port = await navigator.serial.requestPort({});
    await port.open({ baudRate: 9600 });

    console.log(port);
}