-- Date: 2023-09-05

alter table users add column bio TEXT;
update users set first_name=trim(first_name), middle_name=trim(middle_name), last_name=trim(last_name);
update users set first_name='Pahul',middle_name='Singh' where id=22;
update users set middle_name='Le',last_name='Nohaic' where id=40;
UPDATE users SET username=CONCAT(LOWER(first_name), LOWER(middle_name), LOWER(last_name));
update users set username='yutraminoo' where id=42;