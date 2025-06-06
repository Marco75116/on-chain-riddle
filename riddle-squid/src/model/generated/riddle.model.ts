import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_, IntColumn as IntColumn_, ManyToOne as ManyToOne_, Index as Index_} from "@subsquid/typeorm-store"
import {Wallet} from "./wallet.model"

@Entity_()
export class Riddle {
    constructor(props?: Partial<Riddle>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @StringColumn_({nullable: false})
    riddle!: string

    @StringColumn_({nullable: true})
    answer!: string | undefined | null

    @BigIntColumn_({nullable: true})
    winAt!: bigint | undefined | null

    @BigIntColumn_({nullable: false})
    createdAt!: bigint

    @IntColumn_({nullable: false})
    totalAttempts!: number

    @IntColumn_({nullable: false})
    numberRiddle!: number

    @StringColumn_({nullable: true})
    winnerId!: string | undefined | null

    @Index_()
    @ManyToOne_(() => Wallet, {nullable: true})
    winner!: Wallet | undefined | null
}
