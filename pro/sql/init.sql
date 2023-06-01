--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3 (Ubuntu 15.3-1.pgdg22.04+1)
-- Dumped by pg_dump version 15.3 (Ubuntu 15.3-1.pgdg22.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: links; Type: TABLE; Schema: public; Owner: khoi
--

CREATE TABLE public.links (
    user_id integer NOT NULL,
    url text NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone,
    link_title character varying(45) DEFAULT 'My Resume'::character varying NOT NULL,
    id integer NOT NULL
);


ALTER TABLE public.links OWNER TO khoi;

--
-- Name: links_id_seq; Type: SEQUENCE; Schema: public; Owner: khoi
--

CREATE SEQUENCE public.links_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.links_id_seq OWNER TO khoi;

--
-- Name: links_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: khoi
--

ALTER SEQUENCE public.links_id_seq OWNED BY public.links.id;


--
-- Name: profile_view_histories; Type: TABLE; Schema: public; Owner: khoi
--

CREATE TABLE public.profile_view_histories (
    id integer NOT NULL,
    user_id integer NOT NULL,
    scanned_at timestamp without time zone
);


ALTER TABLE public.profile_view_histories OWNER TO khoi;

--
-- Name: profile_view_histories_id_seq; Type: SEQUENCE; Schema: public; Owner: khoi
--

CREATE SEQUENCE public.profile_view_histories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.profile_view_histories_id_seq OWNER TO khoi;

--
-- Name: profile_view_histories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: khoi
--

ALTER SEQUENCE public.profile_view_histories_id_seq OWNED BY public.profile_view_histories.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: khoi
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying(255) NOT NULL,
    password text NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone,
    card_id integer,
    first_name character varying(45) NOT NULL,
    middle_name character varying(45),
    last_name character varying(45) NOT NULL,
    university_id integer DEFAULT 1,
    avatar_url text,
    last_logged_in timestamp without time zone,
    major character varying(60) NOT NULL,
    expected_grad_date date,
    bio text,
    graduated boolean DEFAULT false,
    username character varying(45) NOT NULL
);


ALTER TABLE public.users OWNER TO khoi;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: khoi
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO khoi;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: khoi
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: links id; Type: DEFAULT; Schema: public; Owner: khoi
--

ALTER TABLE ONLY public.links ALTER COLUMN id SET DEFAULT nextval('public.links_id_seq'::regclass);


--
-- Name: profile_view_histories id; Type: DEFAULT; Schema: public; Owner: khoi
--

ALTER TABLE ONLY public.profile_view_histories ALTER COLUMN id SET DEFAULT nextval('public.profile_view_histories_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: khoi
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: links links_pkey; Type: CONSTRAINT; Schema: public; Owner: khoi
--

ALTER TABLE ONLY public.links
    ADD CONSTRAINT links_pkey PRIMARY KEY (id);


--
-- Name: links links_user_id_link_title_key; Type: CONSTRAINT; Schema: public; Owner: khoi
--

ALTER TABLE ONLY public.links
    ADD CONSTRAINT links_user_id_link_title_key UNIQUE (user_id, link_title);


--
-- Name: profile_view_histories profile_view_histories_pkey; Type: CONSTRAINT; Schema: public; Owner: khoi
--

ALTER TABLE ONLY public.profile_view_histories
    ADD CONSTRAINT profile_view_histories_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: khoi
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: khoi
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: profile_view_histories profile_view_histories_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: khoi
--

ALTER TABLE ONLY public.profile_view_histories
    ADD CONSTRAINT profile_view_histories_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: links user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: khoi
--

ALTER TABLE ONLY public.links
    ADD CONSTRAINT user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) NOT VALID;


--
-- Name: TABLE links; Type: ACL; Schema: public; Owner: khoi
--

REVOKE ALL ON TABLE public.links FROM khoi;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.links TO khoi;


--
-- Name: TABLE users; Type: ACL; Schema: public; Owner: khoi
--

REVOKE ALL ON TABLE public.users FROM khoi;
GRANT SELECT,INSERT,REFERENCES,UPDATE ON TABLE public.users TO khoi;


--
-- PostgreSQL database dump complete
--

