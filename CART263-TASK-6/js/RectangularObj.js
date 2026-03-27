class RectangularObj {
    constructor(x, y, w, h, f_color, s_color, context) {
        this.x = x;
        this.y = y;
        this.baseWidth = w;   // original width
        this.baseHeight = h;  // original height
        this.width = w;
        this.height = h;
        this.fill_color = f_color;
        this.stroke_color = s_color;
        this.context = context;

        this.avgVolume = 0; // store mic volume

        const c = this.context;
        c.shadowColor = "rgba(0, 180, 255, 10)";
        c.shadowBlur = 20;        // strength of glow
        c.shadowOffsetX = 0.5;
        c.shadowOffsetY = 0;

        // start mic
        this.initMic();
    }

    display() {
        const c = this.context;
        c.fillStyle = this.fill_color;
        c.fillRect(this.x, this.y, this.width, this.height);
        c.strokeStyle = this.stroke_color;
        c.lineWidth = 2;
        c.strokeRect(this.x, this.y, this.width, this.height);
    }

    update() {
        const scale = 0.5 + this.avgVolume * 0.01;

        this.width = this.baseWidth * scale;
        this.height = this.baseHeight * scale;

        this.xCenter = this.x - (this.width - this.baseWidth) / 2;
        this.yCenter = this.y - (this.height - this.baseHeight) / 2;
    }

    async initMic() {
        console.log("here we are ");

        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        let audioContext = new AudioContext(); // create audio processor 

        try {
            // get mic access 
            let audioStream = await navigator.mediaDevices.getUserMedia({
                audio: true,
            });

            // connect microphone to audio processor 
            let microphoneIn = audioContext.createMediaStreamSource(audioStream);

            // processing modes 
            const filter = audioContext.createBiquadFilter();
            const analyser = audioContext.createAnalyser();

            // connects the mic to the processing modes 
            microphoneIn.connect(filter);
            filter.connect(analyser);

            analyser.fftSize = 32; // size of data stored 

            // create array to hold sound values 
            let frequencyData = new Uint8Array(analyser.frequencyBinCount);


            // call animation loop 
            const animateFrequencies = () => {
                analyser.getByteFrequencyData(frequencyData);

                let sum = 0;

                for (let i = 0; i < frequencyData.length; i++) {
                    sum += frequencyData[i];
                }

                // logs avg volume 
                this.avgVolume = sum / frequencyData.length;

                console.log(this.avgVolume);

                // recurse loop it 
                requestAnimationFrame(animateFrequencies);
            };

            animateFrequencies();

        } catch (err) {
            /* handle the error */
            console.log("had an error getting the microphone");
        }
    }
}