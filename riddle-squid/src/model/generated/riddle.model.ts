import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_, IntColumn as IntColumn_} from "@subsquid/typeorm-store"

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
}
