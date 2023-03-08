// Get references to HTML elements
const cameraButton = document.getElementById("cameraButton");
const videoContainer = document.getElementById("videoContainer");
const videoElement = document.getElementById("videoElement");

// Add event listener to button to open camera when clicked
cameraButton.addEventListener("click", function () {
  // Show video container and hide button
  videoContainer.classList.remove("hidden");
  cameraButton.classList.add("hidden");

  // Start camera and display video feed in video element
  navigator.mediaDevices
    .getUserMedia({ video: { facingMode: { exact: "environment" } } })
    .then(function (stream) {
      videoElement.srcObject = stream;
    })
    .catch(function (err) {
      console.log(err);
    });

  // Capture an image every second and decode QR code
  setInterval(function () {
    // Create a canvas element to draw the picture on
    const canvasElement = document.createElement("canvas");
    canvasElement.width = videoElement.videoWidth;
    canvasElement.height = videoElement.videoHeight;
    const context = canvasElement.getContext("2d");
    context.drawImage(videoElement, 0, 0);

    // Get image data from canvas
    const imageData = context.getImageData(
      0,
      0,
      canvasElement.width,
      canvasElement.height
    );

    // Decode QR code from image data
    const code = jsQR(imageData.data, imageData.width, imageData.height, {
      inversionAttempts: "dontInvert",
    });

    // If QR code is found, send data to API
    if (code) {
      sendDataToAPI(code.data);
    }
  }, 1000);
});

// Function to send data to API
function sendDataToAPI(data) {
  // Show data to user as an alert
  alert(data);
}
