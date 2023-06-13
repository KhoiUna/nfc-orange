-- DATE: 2023-06-13

BEGIN;

DROP TABLE reader_histories;

CREATE VIEW recruiter_dashboard AS (
  SELECT 
    users.id AS student_id,
    users.first_name,
    users.middle_name,
    users.last_name,
    users.major,
    users.username,
    users.avatar_url,
    universities.name AS university_name,
    universities.id AS university_id
   FROM users
     JOIN universities ON universities.id = users.university_id
);