import * as p from '@subsquid/evm-codec'
import { event, fun, viewFun, indexed, ContractBase } from '@subsquid/evm-abi'
import type { EventParams as EParams, FunctionArguments, FunctionReturn } from '@subsquid/evm-abi'

export const events = {
    AnswerAttempt: event("0xe1fc7c66a657ead4c3d3717cd8f74fb75e793a583bdc4105621e53abf02a9b05", "AnswerAttempt(address,bool)", {"user": indexed(p.address), "correct": p.bool}),
    RiddleSet: event("0xc7c868b4cedbfd1ed1d9ab41c080a195ed463c01132c6c4b4b8d7983d1c5c29c", "RiddleSet(string)", {"riddle": p.string}),
    Winner: event("0x745c90b656b4aafe296c8ca35aeacfe56cb96c90e1d320e5da643fff1051b6c0", "Winner(address)", {"user": indexed(p.address)}),
}

export const functions = {
    bot: viewFun("0x10814c37", "bot()", {}, p.address),
    isActive: viewFun("0x22f3e2d4", "isActive()", {}, p.bool),
    riddle: viewFun("0x56049a86", "riddle()", {}, p.string),
    setRiddle: fun("0x1fdf5585", "setRiddle(string,bytes32)", {"_riddle": p.string, "_answerHash": p.bytes32}, ),
    submitAnswer: fun("0xbb3e3159", "submitAnswer(string)", {"_answer": p.string}, ),
    winner: viewFun("0xdfbf53ae", "winner()", {}, p.address),
}

export class Contract extends ContractBase {

    bot() {
        return this.eth_call(functions.bot, {})
    }

    isActive() {
        return this.eth_call(functions.isActive, {})
    }

    riddle() {
        return this.eth_call(functions.riddle, {})
    }

    winner() {
        return this.eth_call(functions.winner, {})
    }
}

/// Event types
export type AnswerAttemptEventArgs = EParams<typeof events.AnswerAttempt>
export type RiddleSetEventArgs = EParams<typeof events.RiddleSet>
export type WinnerEventArgs = EParams<typeof events.Winner>

/// Function types
export type BotParams = FunctionArguments<typeof functions.bot>
export type BotReturn = FunctionReturn<typeof functions.bot>

export type IsActiveParams = FunctionArguments<typeof functions.isActive>
export type IsActiveReturn = FunctionReturn<typeof functions.isActive>

export type RiddleParams = FunctionArguments<typeof functions.riddle>
export type RiddleReturn = FunctionReturn<typeof functions.riddle>

export type SetRiddleParams = FunctionArguments<typeof functions.setRiddle>
export type SetRiddleReturn = FunctionReturn<typeof functions.setRiddle>

export type SubmitAnswerParams = FunctionArguments<typeof functions.submitAnswer>
export type SubmitAnswerReturn = FunctionReturn<typeof functions.submitAnswer>

export type WinnerParams = FunctionArguments<typeof functions.winner>
export type WinnerReturn = FunctionReturn<typeof functions.winner>

