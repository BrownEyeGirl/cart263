
import * as Tone from "https://cdn.jsdelivr.net/npm/tone@latest/build/Tone.js";
//import * as Tone from "tone";


document.body.addEventListener('click', async () => {
    await Tone.start();
    console.log('Audio is ready');
});


const synth = new Tone.Synth().toDestination();
synth.triggerAttackRelease("C4", "8n");
