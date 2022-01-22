--
-- PostgreSQL database dump (Pathfinder)
--
DROP SCHEMA IF EXISTS pathfinder CASCADE;

CREATE SCHEMA pathfinder;

DROP TABLE IF EXISTS pf_users;
DROP TABLE IF EXISTS pf_projects;
DROP TABLE IF EXISTS pf_issue_reports;
DROP TABLE IF EXISTS pf_urls;


--
-- Name: pf_user; Type: TABLE; Schema: pathfinder; Owner: -
--

CREATE TABLE pathfinder.pf_users (
                                uid SERIAL,
                                username character varying(50) NOT NULL,
                                email character varying(50)NOT NULL,
                                password character varying(100) NOT NULL,
                                createdAt timestamp without time zone default current_timestamp NOT NULL,
                                updatedAt timestamp without time zone  default current_timestamp NOT NULL,

);

--
-- Name: pf_urls; Type: TABLE; Schema: pathfinder; Owner: -
--

CREATE TABLE pathfinder.pf_urls (
                                      l_id SERIAL,
                                       url character varying(100) NOT NULL,
                                       uid integer,
                                       createdAt timestamp without time zone default current_timestamp NOT NULL,
                                       updatedAt timestamp without time zone default current_timestamp NOT NULL
);



--
-- Name: pf_issue_reports; Type: TABLE; Schema: pathfinder; Owner: -
--

CREATE TABLE pathfinder.pf_issue_reports (
                                  id SERIAL NOT NULL,
                                  type character varying(50) NOT NULL,
                                  uid integer, 
                                  description character varying(200) NOT NULL,
                                  createdAt timestamp without time zone default current_timestamp NOT NULL,
                                  updatedAt timestamp without time zone default current_timestamp NOT NULL
);


--
-- Name: pf_medreminder; Type: TABLE; Schema: pathfinder; Owner: -
--

CREATE TABLE pathfinder.pf_projects (
                                       p_id SERIAL,
                                       name character varying(100) NOT NULL,
                                       description character varying(200),
                                       public boolean,
                                       width decimal NOT NULL,
                                       length decimal NOT NULL,
                                       uid integer,
                                       createdAt timestamp without time zone default current_timestamp NOT NULL,
                                       updatedAt timestamp without time zone default current_timestamp NOT NULL
);



--
-- Name: pf_urls_pkey; Type: CONSTRAINT; Schema: pathfinder; Owner: -
--

ALTER TABLE ONLY pathfinder.pf_urls
    ADD CONSTRAINT pf_urls_pkey PRIMARY KEY (l_id);


--
-- Name: pf_linked pf_linked_pkey; Type: CONSTRAINT; Schema: pathfinder; Owner: -
--

ALTER TABLE ONLY pathfinder.pf_issue_reports
    ADD CONSTRAINT pf_issues_pkey PRIMARY KEY (id);


--
-- Name: pf_medreminder pf_medreminder_pkey; Type: CONSTRAINT; Schema: pathfinder; Owner: -
--

ALTER TABLE ONLY pathfinder.pf_projects
    ADD CONSTRAINT pf_project_pkey PRIMARY KEY (p_id);


--
-- Name: pf_user pf_user_pkey; Type: CONSTRAINT; Schema: pathfinder; Owner: -
--

ALTER TABLE ONLY pathfinder.pf_users
    ADD CONSTRAINT pf_users_pkey PRIMARY KEY (uid);


--
-- Name: pf_urls fk_urluser; Type: FK CONSTRAINT; Schema: pathfinder; Owner: -
--

ALTER TABLE ONLY pathfinder.pf_urls
    ADD CONSTRAINT fk_urluser FOREIGN KEY (uid) REFERENCES pathfinder.pf_users(uid);

--
-- Name: pf_issue_reports fk_reportedBy; Type: FK CONSTRAINT; Schema: pathfinder; Owner: -
--

ALTER TABLE ONLY pathfinder.pf_issue_reports
    ADD CONSTRAINT fk_reportedBy FOREIGN KEY (uid) REFERENCES pathfinder.pf_users(uid) ON DELETE SET NULL;


--
-- Name: pf_projects fk_projectBy; Type: FK CONSTRAINT; Schema: pathfinder; Owner: -
--

ALTER TABLE ONLY pathfinder.pf_projects
    ADD CONSTRAINT fk_projectBy FOREIGN KEY (uid) REFERENCES pathfinder.pf_users(uid) ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

