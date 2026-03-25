
window.onload = getMicrophoneInput;

async function getMicrophoneInput() {
  console.log("here we are ");

  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  let audioContext = new AudioContext(); //using the web audio library
  
// get the canvas
let canvas = document.getElementById("drawingCanvas");
//get the context
let context = canvas.getContext("2d");   


  
  try {
    //returns a MediaStreamAudioSourceNode.
    let audioStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });
    //console.log(audioStream)
    //pass the microphone input to the web audio API
    let microphoneIn = audioContext.createMediaStreamSource(audioStream);
    const filter = audioContext.createBiquadFilter();
    const analyser = audioContext.createAnalyser();
    // microphone -> filter ->  analyzer->destination
    microphoneIn.connect(filter);
    //use the analyzer object to get some properties ....
    filter.connect(analyser);
    analyser.fftSize = 32;
    let frequencyData = new Uint8Array(analyser.frequencyBinCount);

    //call loop ...
    requestAnimationFrame(animateFrequencies);

    /****our looping callback function */
    function animateFrequencies() {

        // get the canvas
let canvas = document.getElementById("drawingCanvas");
//get the context
let context = canvas.getContext("2d");  
        context.clearRect(0, 0, canvas.width, canvas.height);

context.fillStyle = "#00629fff";
      analyser.getByteFrequencyData(frequencyData);
      let average = 0;
      let sum = 0;

      const barWidth = (WIDTH / bufferLength) * 5;
let barHeight;
let x2 = 0;
for (let i = 0; i < bufferLength; i++) {
    //frequency value in that bin (more dominant will be higher)
    console.log(dataArrayFreq[i]);
    //frequency value in that bin (more dominant will be higher)
    barHeight = dataArrayFreq[i];
    context.fillStyle = `rgb(0 0 ${barHeight + 100})`;
    context.fillRect(x2, HEIGHT - barHeight, barWidth, barHeight);
    x2 += barWidth + 1;
}
      average = sum / frequencyData.length;
      console.log(average);


//context.fillStyle = "#FF0000";
//use the average frequency
//context.fillRect(canvas.width / 2, canvas.height / 2, average, 30);
  
  
      
      //call loop ...
      requestAnimationFrame(animateFrequencies);
    }


    visualizeTimeAndFreq();
    function visualizeTimeAndFreq() {
      const WIDTH = 500;
      const HEIGHT = 500;

      analyser.fftSize = 1024; // fft conversion from time to frequency samples
      //console.log (analyser.frequencyBinCount) //half of fft size
      const bufferLength = analyser.fftSize;
      const dataArrayFreq = new Uint8Array(bufferLength); //array

      let drawVisual = requestAnimationFrame(animateVisual);
      function animateVisual() {
        analyser.getByteFrequencyData(dataArrayFreq);
        //each respective frequency goes in its own bin
        //lowest to highest frequency domain

        /* looking for dominant frequencies*/
        /* higher bars === more dominant frequency  (db)*/

        //each bin represents a given frequency
        //get only the first
              const barWidth = (WIDTH / bufferLength) * 5;
      let barHeight;
      let x2 = 0;
      for (let i = 0; i < bufferLength; i++) {
          //frequency value in that bin (more dominant will be higher)
          console.log(dataArrayFreq[i]);
          //frequency value in that bin (more dominant will be higher)
          barHeight = dataArrayFreq[i];
          context.fillStyle = `rgb(${barHeight + 100} 50 200)`;
          context.fillRect(x2, HEIGHT - barHeight, barWidth, barHeight);
          x2 += barWidth + 1;
      }
        drawVisual = requestAnimationFrame(animateVisual);
      }
    }
  } catch (err) {
    /* handle the error */
    console.log("had an error getting the microphone");
  }
}