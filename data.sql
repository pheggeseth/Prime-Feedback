-- Create the database either with this command,
-- or manually in a program like Postico
CREATE DATABASE "prime_feedback";

-- Create the table to store feedback
CREATE TABLE "feedback" (
  "id" serial primary key,
  "feeling" INT not null,
  "understanding" INT not null,
  "support" INT not null,
  "comments" text,
  "flagged" boolean default false,
  -- a timestamp called date is automatically generated
  -- when we save a new feedback entry in the database
  -- we can see this date in the "/admin" view
  "date" timestamp not null default CURRENT_TIMESTAMP
); 

-- Sample feedback item
INSERT INTO "feedback" ("feeling", "understanding", "support", "comments")
VALUES (4, 4, 5, 'Doing Great!');

-- Check to see the feedback in the database, if you want.
SELECT * FROM "feedback";
