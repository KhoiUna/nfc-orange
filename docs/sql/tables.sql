-- PostgreSQL

-- Create uuid extension for Postgres
CREATE extension IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS "users" (
  "id" SERIAL,
  "first_name" VARCHAR(45),
  "middle_name" VARCHAR(45),
  "last_name" VARCHAR(45),
  "email" TEXT NOT NULL,
  "password" TEXT NOT NULL,
  "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP ,
  "card_id" INT NOT NULL,
  PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "cards" (
  "id" SERIAL,
  "uuid" UUID DEFAULT uuid_generate_v4(),
  "serial_number" CHAR(21),
  "password" TEXT NOT NULL,
  "created_at" VARCHAR(45),
  "updated_at" TIMESTAMP ,
  PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "links" (
  "user_id" INT NOT NULL,
  "url" TEXT NOT NULL,
  "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP ,
  PRIMARY KEY ("url")
);

CREATE INDEX "PK FK" ON  "links" ("user_id");

CREATE TABLE IF NOT EXISTS "scan_history" (
  "id" SERIAL,
  "card_id" INT NOT NULL,
  "scanned_at" TIMESTAMP NOT NULL,
  PRIMARY KEY ("id"),
  CONSTRAINT "FK_scan_history.card_id"
    FOREIGN KEY ("card_id")
      REFERENCES "cards"("id")
);

CREATE TABLE IF NOT EXISTS "companies" (
  "id" SERIAL,
  "name" VARCHAR(255) NOT NULL,
  PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "recruiters" (
  "id" SERIAL,
  "first_name" VARCHAR(45),
  "middle_name" VARCHAR(45),
  "last_name" VARCHAR(45),
  "email" VARCHAR(255) NOT NULL,
  "password" TEXT NOT NULL,
  "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP,
  "company_id" INT NOT NULL,
  PRIMARY KEY ("id"),
  CONSTRAINT "FK_recruiters.company_id"
    FOREIGN KEY ("company_id")
      REFERENCES "companies"("id")
);

CREATE TABLE IF NOT EXISTS "reader_history" (
  "id" SERIAL,
  "recruiter_id" INT NOT NULL,
  "serial_number" CHAR(21),
  "read_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ("id"),
  CONSTRAINT "FK_reader_history.recruiter_id"
    FOREIGN KEY ("recruiter_id")
      REFERENCES "recruiters"("id")
);

CREATE TABLE IF NOT EXISTS "universities" (
  "id" SERIAL,
  "name" VARCHAR(255),
  PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "readers" (
  "id" SERIAL,
  "secret_key" TEXT,
  "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP ,
  "university_id" INT NOT NULL,
  PRIMARY KEY ("id"),
  CONSTRAINT "FK_readers.university_id"
    FOREIGN KEY ("university_id")
      REFERENCES "universities"("id")
);

