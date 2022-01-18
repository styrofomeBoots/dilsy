import * as Tone from 'tone'

export async function playTone(update) {
  const note = update.note
  const octave = update.octave
  console.log(`${note}${octave}`)
  const c4 = new Tone.Player(
    `https://gleitz.github.io/midi-js-soundfonts/MusyngKite/clavinet-mp3/${note}${octave}.mp3`
  ).toDestination()
  const xyl = new Tone.Player(
    `https://gleitz.github.io/midi-js-soundfonts/MusyngKite/clavinet-mp3/${note}${octave}.mp3`
  ).toDestination()
  c4.fadeOut = 3
  c4.fadeIn = 0.1
  xyl.fadeOut = 2
  xyl.fadeIn = 0.2
  // Tone.loaded().then(() => {
  //   c4.start()
  // })
  await Tone.loaded()
  c4.start()
  xyl.start()
}
