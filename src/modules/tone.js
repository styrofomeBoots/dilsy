import * as Tone from 'tone'

export default {
  TONE_URL: 'https://gleitz.github.io/midi-js-soundfonts/MusyngKite/',
  CLAVINET: 'clavinet-mp3/',
  async playNote(note) {
    const tone = new Tone.Player(
      `${this.TONE_URL}${this.CLAVINET}${note}.mp3`
    ).toDestination()
    tone.fadeOut = 3
    tone.fadeIn = 0.1
    await Tone.loaded()
    tone.start()
  }
}
