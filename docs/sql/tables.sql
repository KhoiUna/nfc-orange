-- PostgreSQL

-- Create uuid extension for Postgres
CREATE extension IF NOT EXISTS "uuid-ossp";

CREATE TABLE "users" (
  "id" SERIAL,
  "email" VARCHAR(255) NOT NULL,
  "password" TEXT NOT NULL,
  "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP NOT NULL,
  "card_id" INT NOT NULL,
  PRIMARY KEY ("id"),
  FOREIGN KEY("card_id") REFERENCES cards(id)
);

CREATE TABLE "cards" (
  "id" SERIAL,
  "uuid" UUID DEFAULT uuid_generate_v4(),
  "password" TEXT NOT NULL,
  "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP NOT NULL,
  PRIMARY KEY ("id")
);

CREATE TABLE "links" (
  "user_id" INT,
  "url" TEXT,
  "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP NOT NULL,
  PRIMARY KEY ("user_id")
);

CREATE TABLE "scan_history" (
  "id" SERIAL,
  "card_id" INT NOT NULL,
  "scanned_at" TIMESTAMP NOT NULL,
  PRIMARY KEY ("id"),
  CONSTRAINT "FK_scan_history.card_id"
    FOREIGN KEY ("card_id")
      REFERENCES "cards"("id")
);