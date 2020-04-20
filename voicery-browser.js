/**
 *  Creates the GET request URL for generating audio.
 *
 *  Supports all the POST arguments for the Voicery /generate endpoint.
 *  (see https://www.voicery.com/docs)
 *
 *  This does not accept using API keys as that would expose your
 *  secret key to users. If you want to use an API key you should
 *  use the server library instead.
 */
export default function createRequestUrl({
  text,
  speaker,
  style,
  ssml,
  encoding,
  sampleRate
}) {
  const url = new URL("https://api.voicery.com/generate");
  url.searchParams.append("text", text);
  url.searchParams.append("speaker", speaker);
  if (style) {
    url.searchParams.append("style", style);
  }
  url.searchParams.append("ssml", ssml ? "true" : "false");
  url.searchParams.append("encoding", encoding ? encoding : "mp3");
  return url;
}
