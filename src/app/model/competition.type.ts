import { DateTime } from "luxon"
import { Group } from "./group.type"
import { Participant } from "./participant.type"


export type Competition = {
    name: string,
    date: DateTime,
    groups: Group[],
    unassignedParticipants: Participant[]
    id: number;
}