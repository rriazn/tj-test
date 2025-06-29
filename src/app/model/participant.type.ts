import { DateTime } from 'luxon';

export type Participant = {
    firstName: string,
    lastName: string,
    dateOfBirth: DateTime,
}