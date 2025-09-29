import { DateTime } from 'luxon';
import { Score } from './score.type';

export type Participant = {
    firstName: string,
    lastName: string,
    birthDate: string,
    affiliation: string,
    setRoutine: string,
    scores: Score[]
}