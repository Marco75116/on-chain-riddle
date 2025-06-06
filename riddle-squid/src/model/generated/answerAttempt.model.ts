import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, StringColumn as StringColumn_, ManyToOne as ManyToOne_, Index as Index_, IntColumn as IntColumn_, BooleanColumn as BooleanColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"
import {Riddle} from "./riddle.model"
import {Wallet} from "./wallet.model"

@Entity_()
export class AnswerAttempt {
    constructor(props?: Partial<AnswerAttempt>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @StringColumn_({nullable: true})
    riddleId!: string | undefined | null

    @Index_()
    @ManyToOne_(() => Riddle, {nullable: true})
    riddle!: Riddle | undefined | null

    @StringColumn_({nullable: false})
    userId!: string

    @Index_()
    @ManyToOne_(() => Wallet, {nullable: true})
    user!: Wallet

    @StringColumn_({nullable: false})
    answer!: string

    @IntColumn_({nullable: true})
    numberAttempt!: number | undefined | null

    @BooleanColumn_({nullable: false})
    correct!: boolean

    @BigIntColumn_({nullable: false})
    createdAt!: bigint
}
