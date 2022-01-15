const COORDS = ["lat", "lon"];

const BOUNDS = {
  min: [],
  max: [],
};

const SCALE = "major";

const NOTES = {
  major: [
    { value: "G", point: null },
    { value: "A", point: null },
    { value: "B", point: null },
    { value: "C", point: null },
    { value: "D", point: null },
    { value: "E", point: null },
    { value: "F", point: null },
  ],
  pentatonic: [
    { value: "G", point: null },
    { value: "A", point: null },
    { value: "C", point: null },
    { value: "D", point: null },
    { value: "E", point: null },
  ],
};

let OCTAVES = [
  { value: 1, point: null },
  { value: 2, point: null },
  { value: 3, point: null },
  { value: 4, point: null },
  { value: 5, point: null },
  { value: 6, point: null },
  { value: 7, point: null },
];

export function setupNoteGrid(stations) {
  for (const i of COORDS) {
    const max = Math.max.apply(
      Math,
      stations.map((x) => x[i])
    );
    const min = Math.min.apply(
      Math,
      stations.map((x) => x[i])
    );
    BOUNDS.max.push(max);
    BOUNDS.min.push(min);
  }
  const latStep = (BOUNDS.max[0] - BOUNDS.min[0]) / OCTAVES.length;
  const lonStep = (BOUNDS.max[1] - BOUNDS.min[1]) / NOTES[SCALE].length;
  OCTAVES = OCTAVES.map((item, index) => {
    return {
      value: item.value,
      point: BOUNDS.min[0] + latStep * index,
    };
  });
  NOTES[SCALE] = NOTES[SCALE].map((item, index) => {
    return {
      value: item.value,
      point: BOUNDS.min[1] + lonStep * index,
    };
  });
}

export function getStationNote(lat, lon) {
  const notes = NOTES[SCALE].filter((x) => x.point <= lon);
  const octaves = OCTAVES.filter((x) => x.point <= lat);
  const note = notes[notes.length - 1].value;
  const octave = octaves[octaves.length - 1].value;
  return [note, octave];
}
