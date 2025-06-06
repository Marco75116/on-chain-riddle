import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, OneToMany as OneToMany_} from "@subsquid/typeorm-store"
import {Riddle} from "./riddle.model"
import {AnswerAttempt} from "./answerAttempt.model"

@Entity_()
export class Wallet {
    constructor(props?: Partial<Wallet>) {
        Object.assign(this, props)
    }

    /**
     * User address
     */
    @PrimaryColumn_()
    id!: string

    @OneToMany_(() => Riddle, e => e.winner)
    winRiddles!: Riddle[]

    @OneToMany_(() => AnswerAttempt, e => e.user)
    answerAttempts!: AnswerAttempt[]
}
