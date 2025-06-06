module.exports = class Data1749193837749 {
    name = 'Data1749193837749'

    async up(db) {
        await db.query(`CREATE TABLE "answer_attempt" ("id" character varying NOT NULL, "riddle_id" character varying, "user_id" character varying NOT NULL, "answer" text NOT NULL, "number_attempt" integer, "correct" boolean NOT NULL, "created_at" numeric NOT NULL, CONSTRAINT "PK_19d1fa780999ce88def2f8ab8df" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_057e203b68684a5a57c80ad4e3" ON "answer_attempt" ("riddle_id") `)
        await db.query(`CREATE INDEX "IDX_bb1294b25ca8beed26ce0e4e12" ON "answer_attempt" ("user_id") `)
        await db.query(`CREATE TABLE "wallet" ("id" character varying NOT NULL, CONSTRAINT "PK_bec464dd8d54c39c54fd32e2334" PRIMARY KEY ("id"))`)
        await db.query(`CREATE TABLE "riddle" ("id" character varying NOT NULL, "riddle" text NOT NULL, "answer" text, "win_at" numeric, "created_at" numeric NOT NULL, "total_attempts" integer NOT NULL, "number_riddle" integer NOT NULL, "winner_id" character varying, CONSTRAINT "PK_7f1ee0a12a48be043ef842e6f90" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_536d87b6fbbd6827eb269b53b3" ON "riddle" ("winner_id") `)
        await db.query(`CREATE TABLE "global_stats" ("id" character varying NOT NULL, "total_riddles" integer NOT NULL, CONSTRAINT "PK_7a107cf03d781091d521d8ed21b" PRIMARY KEY ("id"))`)
        await db.query(`ALTER TABLE "answer_attempt" ADD CONSTRAINT "FK_057e203b68684a5a57c80ad4e32" FOREIGN KEY ("riddle_id") REFERENCES "riddle"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "answer_attempt" ADD CONSTRAINT "FK_bb1294b25ca8beed26ce0e4e12a" FOREIGN KEY ("user_id") REFERENCES "wallet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "riddle" ADD CONSTRAINT "FK_536d87b6fbbd6827eb269b53b36" FOREIGN KEY ("winner_id") REFERENCES "wallet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    }

    async down(db) {
        await db.query(`DROP TABLE "answer_attempt"`)
        await db.query(`DROP INDEX "public"."IDX_057e203b68684a5a57c80ad4e3"`)
        await db.query(`DROP INDEX "public"."IDX_bb1294b25ca8beed26ce0e4e12"`)
        await db.query(`DROP TABLE "wallet"`)
        await db.query(`DROP TABLE "riddle"`)
        await db.query(`DROP INDEX "public"."IDX_536d87b6fbbd6827eb269b53b3"`)
        await db.query(`DROP TABLE "global_stats"`)
        await db.query(`ALTER TABLE "answer_attempt" DROP CONSTRAINT "FK_057e203b68684a5a57c80ad4e32"`)
        await db.query(`ALTER TABLE "answer_attempt" DROP CONSTRAINT "FK_bb1294b25ca8beed26ce0e4e12a"`)
        await db.query(`ALTER TABLE "riddle" DROP CONSTRAINT "FK_536d87b6fbbd6827eb269b53b36"`)
    }
}
