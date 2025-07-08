import { DateTime } from 'luxon';

export type Participant = {
    Vorname: string,
    Nachname: string,
    Geburtsdatum: DateTime,
    Verein: string,
    Uebung: string
}