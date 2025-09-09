import { JudgeConstellation } from "../enums/judge-constellation"
import { Group } from "./group.type"
import { Participant } from "./participant.type"
import { Score } from "./score.type"

export type Competition = {
    name: string,
    date: string,
    groups: Group[],
    unassignedParticipants: [Participant, Score][]
    id: number,
    judges: JudgeConstellation
}


