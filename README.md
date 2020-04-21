# Javascript Voicery API

Voicery provides a text-to-speech engine accessible via an easy-to-use REST API in the
cloud. This repository provides some starter Javascript code that you can include in your
project to quickly and easily synthesize speech using the Voicery speech synthesis
engine, without worrying about the details of HTTP requests and encodings.

## Example Usage

### voicery-browser.js

Import the ES6 module into your browser:

```
<script type="module">
  import createVoiceryRequestUrl from "../voicery-browser.js"
  window.createVoiceryRequestUrl = createVoiceryRequestUrl;
</script>
```

Then you can access `createVoiceryRequestUrl` from other scripts.  For example:

```
 <script>
   /**
    *  Button click callback that manages audio playback.
    */
   function play() {
     // Generate request URL based on input text.
     const text = document.getElementById("text-input").value;
     const url = createVoiceryRequestUrl({ text, speaker: "steven" })

     // Create and play new HTML5 Audio.
     const newAudio = new Audio(url);
     newAudio.preload = "auto";
     newAudio.play();

     // Show button Loading.
     const button = document.getElementById("play-button");
     button.innerText = "Loading...";
     button.disabled = true;

     // Show button playing.
     newAudio.addEventListener("playing", () => {
       button.innerText = "Playing..."
     });

     // Reset button on end.
     newAudio.addEventListener("ended", () => {
       button.innerText = "Play";
       button.disabled = false;
     });
   }
 </script>
```

See [demos/browser.html](https://github.com/voicery/voicery.js/blob/master/demos/browser.html) for a full example.

Run can run the browser-based API demo by running `npm run demo-browser`.

### voicery-nodejs.js

Import the CJS module into your code:

```
const VoiceryClient = require("./voicery-nodejs");
```


Then you can access the `VoiceryClient`. For example:

```
const client = VoiceryClient();
const speakers = await client.getAvailableSpeakers();
speakers.forEach(speaker => {
  console.log(`Speaker: ${speaker.id}`);
  console.log(`\tGender: ${speaker.gender}`);
  console.log(
    `\tStyles: ${speaker.styles.map(style => style.id).join(", ")}`
  );
});
```

## Including this in your project

### voicery-browser.js

1. Copy this file from this repository into a place you can import it.
2. Import this directly as an ES6 module (see [demos/browser.html](https://github.com/voicery/voicery.js/blob/master/demos/browser.html) for an example of this) or use it with your existing asset bundler (e.g. webpack, rollup, or parcel).

### voicery-nodejs.js

1. Ensure that your `package.json` includes all of the dependencies in [package.json](https://github.com/voicery/voicery.js/blob/master/package.json).
2. Copy this file from this repository into a place you can import it.
3. Import this into your nodejs project (see [demos/nodejs.js](https://github.com/voicery/voicery.js/blob/master/demos/nodejs.js) for an example of this)
