-- Date: 2023-05-05

alter table links drop CONSTRAINT user_id_unique;

alter table links add link_title varchar(45) NOT NULL DEFAULT 'My Resume';

alter table links drop CONSTRAINT links_pkey;

alter table links add id SERIAL PRIMARY KEY;

alter table links add unique(user_id, link_title);

grant delete on links to khoi;