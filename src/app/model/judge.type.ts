import { JudgeFunction } from "../enums/judge-functions"

export type Judge = {
    name: string,
    function: JudgeFunction,
    id: number
}