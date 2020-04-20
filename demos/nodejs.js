const fs = require("fs");

const VoiceryClient = require("../voicery-nodejs");

const main = async () => {
  const client = VoiceryClient();
  const speakers = await client.getAvailableSpeakers();
  speakers.forEach(speaker => {
    console.log(`Speaker: ${speaker.id}`);
    console.log(`\tGender: ${speaker.gender}`);
    console.log(
      `\tStyles: ${speaker.styles.map(style => style.id).join(", ")}`
    );
  });

  const filename = "./streamed.mp3";
  console.log(`\nWriting streaming audio to ${filename}`);
  const output = fs.createWriteStream(filename);
  const stream = await client.stream({
    speaker: "steven",
    style: "narration",
    encoding: "mp3",
    text: "Hello!"
  });
  stream.on("data", chunk => {
    output.write(Buffer.from(chunk));
  });
  stream.on("end", () => {
    output.end();
  });
};

main();
