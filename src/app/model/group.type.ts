import { GroupStage } from "../enums/group-stage";
import { Participant } from "./participant.type";
import { Score } from "./score.type";


export type Group = {
    title: string,
    participants: Participant[],
    stage: GroupStage
}