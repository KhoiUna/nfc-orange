-- DATE: 2023-06-02

create table qr_histories (
    id serial primary key,
    user_id int not null,
    scanned_at timestamp without time zone not null,
    foreign key(user_id) references users(id)
);

create table card_tap_histories (
    id serial primary key,
    card_id int not null,
    scanned_at timestamp without time zone not null
);

alter table users add column card_id INT;