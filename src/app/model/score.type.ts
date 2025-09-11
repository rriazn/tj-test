export type Score = {
    execution1: number,
    execution2: number,
    execution3: number,
    execution: number,
    execution5: number,
    execution6: number,
    difficulty: number,
    hd: number,
    tof: number,
    sync1: number,
    sync2: number,
    penalty: number
}

export function createEmptyScore(): Score {
  return {
    execution1: 0,
    execution2: 0,
    execution3: 0,
    execution: 0,
    execution5: 0,
    execution6: 0,
    difficulty: 0,
    hd: 0,
    tof: 0,
    sync1: 0,
    sync2: 0,
    penalty: 0
  };
}

export function createEmptyScoreArray(): Score[] {
  return [createEmptyScore(), createEmptyScore(), createEmptyScore()];
}