module.exports = class Data1749190015207 {
    name = 'Data1749190015207'

    async up(db) {
        await db.query(`CREATE TABLE "riddle" ("id" character varying NOT NULL, "riddle" text NOT NULL, "answer" text, "win_at" numeric, "created_at" numeric NOT NULL, "total_attempts" integer NOT NULL, "number_riddle" integer NOT NULL, CONSTRAINT "PK_7f1ee0a12a48be043ef842e6f90" PRIMARY KEY ("id"))`)
        await db.query(`CREATE TABLE "global_stats" ("id" character varying NOT NULL, "total_riddles" integer NOT NULL, CONSTRAINT "PK_7a107cf03d781091d521d8ed21b" PRIMARY KEY ("id"))`)
    }

    async down(db) {
        await db.query(`DROP TABLE "riddle"`)
        await db.query(`DROP TABLE "global_stats"`)
    }
}
