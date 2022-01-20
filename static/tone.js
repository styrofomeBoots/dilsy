import * as Tone from 'tone'
import { SCALES } from './grid'

const SF_URL = 'https://gleitz.github.io/midi-js-soundfonts/'

const LIBRARIES = {
  musyng: 'MusyngKite',
  fluid: 'FluidR3_GM',
  fatBoy: 'FatBoy',
}

const INSTRUMENTS = {
  clavinet: 'clavinet-mp3',
  piano: 'electric_piano_1-mp3',
  guitarHarmonics: 'guitar_harmonics-mp3',
  cello: 'cello-mp3',
}

// TODO
// - finalize how to build sound
//  - maybe some ambient noise
//  - Sound if 100% full or depleted
//  - play harmony based on if checkout/checkin
//  - length of reverb based on time sense last activity
//  - which instruments to use?

// conditions to check if step direction would return undefined from the scale array
const checkoutAtFirstNote = (index, isReturn) => index === 0 && !isReturn
const returnAtEndNote = (index, scaleLength, isReturn) =>
  index === scaleLength - 1 && isReturn

function buildTone(update, scale) {
  const currentScale = SCALES[scale]
  const scaleLength = currentScale.length
  const baseNote = update.note
  const baseOctave = update.octave
  const noteIndex = currentScale.findIndexOf(baseNote)
  const stepDirection = update.isReturn ? 1 : -1
  let harmonyNote
  if (checkoutAtFirstNote(noteIndex, update.isReturn)) {
    harmonyNote = currentScale[scaleLength - 1]
  } else if (returnAtEndNote(noteIndex, scaleLength, update.isReturn)) {
    harmonyNote = currentScale[0]
  } else {
    harmonyNote = currentScale[noteIndex + stepDirection]
  }
  let harmonyOctave
  if (baseOctave === 1 || baseOctave === 5) {
    harmonyOctave = baseOctave
  } else {
    harmonyOctave = baseOctave + stepDirection
  }
  return { baseNote, baseOctave, harmonyOctave, harmonyNote }
}

export async function playTone(update, scale) {
  const tone = buildTone(update, scale)

  // const c4 = new Tone.Player(
  //   `MusyngKite/clavinet-mp3/${note}${octave}.mp3`
  // ).toDestination()
  // const xyl = new Tone.Player(
  //   `https://gleitz.github.io/midi-js-soundfonts/MusyngKite/clavinet-mp3/${note}${octave}.mp3`
  // ).toDestination()
  // c4.fadeOut = 3
  // c4.fadeIn = 0.1
  // xyl.fadeOut = 2
  // xyl.fadeIn = 0.2
  // await Tone.loaded()
  // c4.start()
  // xyl.start()
}
