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

  update(avgVolume = 0) {
    // update the size based on average microphone volume
    const scale = 0.5 + avgVolume * 3; // adjust sensitivity of reaction
    this.width = this.baseWidth * scale;
    this.height = this.baseHeight * scale;

    // rectangle centered
    this.xCenter = this.x - (this.width - this.baseWidth) / 2;
    this.yCenter = this.y - (this.height - this.baseHeight) / 2;

    const c = this.context;
    c.clearRect(0, 0, c.canvas.width, c.canvas.height); // clear canvas
    c.fillStyle = this.fill_color;
    c.strokeStyle = this.stroke_color;
    c.lineWidth = 2;
    c.fillRect(this.xCenter, this.yCenter, this.width, this.height);
    c.strokeRect(this.xCenter, this.yCenter, this.width, this.height);
  }

  async initMic() {
    try {
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      const audioCtx = new AudioContext();
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const micSource = audioCtx.createMediaStreamSource(stream);

      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 1024;
      micSource.connect(analyser);

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const animate = () => {
        analyser.getByteFrequencyData(dataArray);
        const volumeArray = Array.from(dataArray).map(v => v / 255);
        const avgVolume = volumeArray.reduce((a,b) => a + b, 0) / volumeArray.length;

        this.update(avgVolume);

        requestAnimationFrame(animate);
      };

      animate();

    } catch (err) {
      console.error("Error accessing microphone:", err);
    }
  }
}