const axios = require("axios");

const VOICERY_URL = "https://api.voicery.com";

class VoiceryError extends Error {
  constructor(message) {
    super(message);
    this.name = "VoiceryError";
  }
}

class VoiceryClient {
  /**
   *  Creates a new handle to Voicery API.
   *
   *  Arguments:
   *    - key: An API key to use. By default use no key.
   *           API requests with no key will be heavily rate-limited.
   */
  constructor(key) {
    this.key = key;
  }

  /**
   *  Gets a list of available speakers.
   */
  async getAvailableSpeakers() {
    const headers = this.key
      ? { Authorization: `Bearer ${this.key}` }
      : undefined;

    try {
      const response = await axios({
        url: `${VOICERY_URL}/speakers`,
        method: "get",
        headers
      });
      return response.data;
    } catch (error) {
      throw new VoiceryError(error);
    }
  }

  /**
   *  Stream audio from the Voicery API.
   *
   *  See the documentation for the generate endpoint (https://www.voicery.com/docs).
   */
  async stream({
    speaker,
    text,
    style,
    encoding = "mp3",
    sampleRate = 24000,
    ssml = false
  }) {
    if (typeof speaker !== "string") {
      throw new VoiceryError("Argument 'speaker' must be a string");
    }

    if (typeof text !== "string") {
      throw new VoiceryError("Argument 'text' must be a string");
    }

    if (speaker && typeof speaker !== "string") {
      throw new VoiceryError("Argument 'style' must be a string");
    }

    if (!["mp3", "wav", "pcm"].includes(encoding)) {
      throw new VoiceryError(
        "Argument 'encoding' must be one of 'mp3', 'wav', 'pcm'"
      );
    }

    if (![8000, 16000, 24000].includes(sampleRate)) {
      throw new VoiceryError(
        "Argument 'encoding' must be one of 8000, 16000, 24000"
      );
    }

    const headers = this.key ? { Authorization: `Bearer ${this.key}` } : {};
    const data = { text, speaker, encoding, sampleRate, ssml, style };
    try {
      const stream = await axios.request({
        url: `${VOICERY_URL}/generate`,
        method: "post",
        headers,
        data,
        responseType: "stream"
      });
      return stream.data;
    } catch (error) {
      console.log(error);
      throw new VoiceryError(error);
    }
  }
}

module.exports = function(key) {
  return new VoiceryClient(key);
};
