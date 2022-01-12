import * as Tone from 'tone'

TONE_URL = '"https://gleitz.github.io/midi-js-soundfonts/MusyngKite/"'
CLAVINET = 'clavinet-mp3/'

export default {
  async playNote(note) {
    const tone = new Tone.Player(
      `${TONE_URL}${CLAVINET}${note}.mp3`
    ).toDestination()
    tone.fadeOut = 3
    tone.fadeIn = 0.1
    await Tone.loaded()
    tone.start()
  }
}
