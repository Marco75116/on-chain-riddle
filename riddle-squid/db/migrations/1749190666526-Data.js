module.exports = class Data1749190666526 {
    name = 'Data1749190666526'

    async up(db) {
        await db.query(`CREATE TABLE "wallet" ("id" character varying NOT NULL, CONSTRAINT "PK_bec464dd8d54c39c54fd32e2334" PRIMARY KEY ("id"))`)
        await db.query(`CREATE TABLE "riddle" ("id" character varying NOT NULL, "riddle" text NOT NULL, "answer" text, "win_at" numeric, "created_at" numeric NOT NULL, "total_attempts" integer NOT NULL, "number_riddle" integer NOT NULL, "winner_id" character varying, CONSTRAINT "PK_7f1ee0a12a48be043ef842e6f90" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_536d87b6fbbd6827eb269b53b3" ON "riddle" ("winner_id") `)
        await db.query(`CREATE TABLE "global_stats" ("id" character varying NOT NULL, "total_riddles" integer NOT NULL, CONSTRAINT "PK_7a107cf03d781091d521d8ed21b" PRIMARY KEY ("id"))`)
        await db.query(`ALTER TABLE "riddle" ADD CONSTRAINT "FK_536d87b6fbbd6827eb269b53b36" FOREIGN KEY ("winner_id") REFERENCES "wallet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    }

    async down(db) {
        await db.query(`DROP TABLE "wallet"`)
        await db.query(`DROP TABLE "riddle"`)
        await db.query(`DROP INDEX "public"."IDX_536d87b6fbbd6827eb269b53b3"`)
        await db.query(`DROP TABLE "global_stats"`)
        await db.query(`ALTER TABLE "riddle" DROP CONSTRAINT "FK_536d87b6fbbd6827eb269b53b36"`)
    }
}
