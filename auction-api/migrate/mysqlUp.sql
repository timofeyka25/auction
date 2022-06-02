create database `auction-api-debug`;

use `auction-api-debug`;

create table role
(
    id          int auto_increment,
    name        varchar(255) unique not null,
    description varchar(255)        null,
    constraint roles_pk
        primary key (id)
)
    comment 'Table for save user roles.';

create table user
(
    id            int auto_increment,
    first_name    varchar(255)         not null,
    last_name     varchar(255)         null,
    username      varchar(255) unique  not null,
    password_hash varchar(255)         not null,
    role_id       int                  not null,
    is_active     tinyint(1) default 1 not null,
    constraint users_pk
        primary key (id),
    constraint users_roles_id_fk
        foreign key (role_id) references role (id)
)
    comment 'Table for save users info';

insert into role (name, description)
values ('client', 'person who can bidding');
insert into role (name, description)
values ('staff', 'person who can managing auctions');
insert into role (name, description)
values ('admin', 'person who can managing users');

create table product_category
(
    id       int auto_increment,
    category varchar(255) unique not null,
    constraint product_category_pk
        primary key (id)
);

create table product
(
    id               int auto_increment,
    title            varchar(255)                                            not null,
    description      varchar(255)                                            null,
    category_id      int                                                     not null,
    last_bid_user_id int,
    current_price    decimal(17, 2)                                          not null,
    min_bid_value    decimal(17, 2)                                          not null,
    start_datetime   datetime                                                not null,
    end_datetime     datetime                                                not null,
    status           enum ('ongoing', 'sold', 'cancelled') default 'ongoing' null,
    constraint product_pk
        primary key (id),
    constraint product_product_category_id_fk
        foreign key (category_id) references product_category (id),
    constraint product_users_id_fk
        foreign key (last_bid_user_id) references user (id)
);

create table bid
(
    id           int auto_increment,
    product_id   int            not null,
    user_id      int            not null,
    price        decimal(17, 2) not null,
    bid_datetime datetime       not null,
    constraint bid_pk
        primary key (id),
    constraint bid_product_id_fk
        foreign key (product_id) references product (id),
    constraint bid_user_id_fk
        foreign key (user_id) references user (id)
);
