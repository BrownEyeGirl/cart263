

class FreeStyleObj {
    constructor(x, y, length, f_color, s_color, context) {
        // We write instructions to set up a Flower here
        // Position and size information
        this.x = x;
        this.y = y;
        this.fill_color = f_color;
        this.stroke_color = s_color;
        this.theta = 0;
        this.length = length;
        this.yOffset = 20;
        this.angularSpeed = .07;
        this.context = context;

        this.avgVolume = 0;

        this.getMicrophoneInput();
    }

    display() {
        this.theta = 0; //reset everytime
        this.context.fillStyle = this.fill_color; // change the color we are using
        this.context.strokeStyle = this.stroke_color; // change the color we are using
        this.context.beginPath();
        this.context.moveTo(this.x, this.y)

        for (let i = this.x; i < this.x + this.length; i++) {
            this.context.lineTo(i, (Math.sin(this.theta) * 5) + this.y)
            this.context.lineTo(i, (Math.sin(this.theta) * 5) + this.y + this.yOffset)
            this.theta += this.angularSpeed;
        }

        this.context.stroke(); //set the stroke
    }
    update() {
        //update freestyle
        console.log(this.avgVolume);
        // this.x+=1;

        let v = this.avgVolume;



        let r = Math.min(255, v * 25);
        let g = Math.min(255, v * 5);
        let b = Math.min(255, v * 80);

        let r1 = Math.min(255, v * 1);
        let g1 = Math.min(255, v * 10);
        let b1 = Math.min(255, v * 1);

        this.x = v;

        this.stroke_color = `rgb(${r}, ${g}, ${b})`;
        this.fill_color = `rgb(${r1}, ${g1}, ${b1})`;

        console.log(this.stroke_color)
    }

    async getMicrophoneInput() {//async b/c we have await for mic permission
        console.log("canvas c mic working");


        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        let audioContext = new AudioContext(); //using the web audio library

        try {
            //returns a MediaStreamAudioSourceNode.
            let audioStream = await navigator.mediaDevices.getUserMedia({
                audio: true,
            });
            // console.log(audioStream)

            //pass the microphone input to the web audio API
            let microphoneIn = audioContext.createMediaStreamSource(audioStream);
            console.log(microphoneIn);


            const analyser = audioContext.createAnalyser();
            analyser.fftSize = 32;


            // microphone -> filter ->  analyzer->destination
            microphoneIn.connect(analyser);
            //use the analyzer object to get some properties ....


            let freqData = new Uint8Array(analyser.frequencyBinCount);

            console.log("mic ready");

            // call animation loop 
            const animateFrequencies = () => {
                analyser.getByteFrequencyData(freqData);

                let sum = 0;

                for (let i = 0; i < freqData.length; i++) {
                    sum += freqData[i];
                }

                // logs avg volume 
                this.avgVolume = sum / freqData.length;

                console.log(this.avgVolume);

                // recurse loop it 
                requestAnimationFrame(animateFrequencies);
            };

            animateFrequencies();


        }
        catch (err) {
            /* handle the error */
            console.log("had an error getting the microphone");
        }
    }



}