-- DATE: 2023-05-22

begin;

alter table users add column username varchar(45) unique;

update users set first_name=trim(first_name), middle_name=trim(middle_name), last_name=trim(last_name);

update users set first_name='Pahul',middle_name='Singh' where id=22;

update users set middle_name='Le',last_name='Nohaic' where id=40;

UPDATE users SET username=CONCAT(LOWER(first_name), LOWER(middle_name), LOWER(last_name));

update users set username='yutraminoo' where id=42;

GRANT REFERENCES ON users TO khoi;

create table profile_view_histories (
    id SERIAL NOT NULL PRIMARY KEY,
    user_id INT NOT NULL,
    scanned_at timestamp without time zone,
    FOREIGN KEY(user_id) REFERENCES users(id)
);