-- Date: 2023-06-02

BEGIN;

alter table users add column is_premium BOOLEAN DEFAULT false;

alter table users add column banner_image_url TEXT;

update users set is_premium =true where id=15;

alter table scan_histories rename to card_tap_histories;

create table qr_histories (
    id serial primary key,
    user_id int not null,
    scanned_at timestamp without time zone not null,
    foreign key(user_id) references users(id)
);