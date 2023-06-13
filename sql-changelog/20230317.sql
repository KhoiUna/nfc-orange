-- 
DROP VIEW recruiter_dashboard;
CREATE VIEW recruiter_dashboard AS (
  SELECT recruiters.email AS recruiter_email,
    users.id AS student_id,
    users.first_name,
    users.middle_name,
    users.last_name,
    users.major,
    users.avatar_url,
    universities.name AS university_name,
    universities.id AS university_id,
    cards.uuid
   FROM reader_histories
     JOIN users ON reader_histories.card_id = users.card_id
     JOIN universities ON universities.id = users.university_id
     JOIN cards ON users.card_id = cards.id
     JOIN recruiters ON recruiters.id = reader_histories.recruiter_id
);