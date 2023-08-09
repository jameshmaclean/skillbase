-- public.roles definition

-- Drop table

-- DROP TABLE public.roles;

CREATE TABLE public.roles (
	rol_cd_id serial4 NOT NULL,
	rol_tx_name varchar(20) NULL,
	CONSTRAINT roles_pkey PRIMARY KEY (rol_cd_id),
	CONSTRAINT roles_rol_tx_name_check CHECK (((rol_tx_name)::text = ANY ((ARRAY['ROLE_USER'::character varying, 'ROLE_MODERATOR'::character varying, 'ROLE_ADMIN'::character varying])::text[])))
);


-- public.skills definition

-- Drop table

-- DROP TABLE public.skills;

CREATE TABLE public.skills (
	ski_tx_url varchar(255) NULL,
	ski_cd_id bigserial NOT NULL,
	ski_tx_descricao varchar(255) NULL,
	ski_tx_nome varchar(255) NULL,
	CONSTRAINT skills_pkey PRIMARY KEY (ski_cd_id)
);


-- public.users definition

-- Drop table

-- DROP TABLE public.users;

CREATE TABLE public.users (
	usr_cd_id serial4 NOT NULL,
	usr_tx_username varchar(20) NULL,
	usr_tx_email varchar(50) NULL,
	usr_tx_password varchar(120) NULL,
	CONSTRAINT ukb244kaj5cls36d7jdf3igfxp6 UNIQUE (usr_tx_email),
	CONSTRAINT ukrvfmtx4eapewnj62lsoy037j7 UNIQUE (usr_tx_username),
	CONSTRAINT users_pkey PRIMARY KEY (usr_cd_id)
);


-- public.fotos definition

-- Drop table

-- DROP TABLE public.fotos;

CREATE TABLE public.fotos (
	fk_ski_cd_id int8 NULL,
	fot_cd_id bigserial NOT NULL,
	fot_tx_nome varchar(255) NULL,
	fot_tx_tipo varchar(255) NULL,
	fot_tx_dados oid NULL,
	CONSTRAINT fotos_fk_ski_cd_id_key UNIQUE (fk_ski_cd_id),
	CONSTRAINT fotos_pkey PRIMARY KEY (fot_cd_id),
	CONSTRAINT fk4bgjyluqr8t9x5ixuhnu2e8ud FOREIGN KEY (fk_ski_cd_id) REFERENCES public.skills(ski_cd_id)
);


-- public.user_roles definition

-- Drop table

-- DROP TABLE public.user_roles;

CREATE TABLE public.user_roles (
	role_id int4 NOT NULL,
	user_id int4 NOT NULL,
	CONSTRAINT user_roles_pkey PRIMARY KEY (role_id, user_id),
	CONSTRAINT fkh8ciramu9cc9q3qcqiv4ue8a6 FOREIGN KEY (role_id) REFERENCES public.roles(rol_cd_id),
	CONSTRAINT fkhfh9dx7w3ubf1co1vdev94g3f FOREIGN KEY (user_id) REFERENCES public.users(usr_cd_id)
);


-- public.user_skill definition

-- Drop table

-- DROP TABLE public.user_skill;

CREATE TABLE public.user_skill (
	fk_usr_cd_id int4 NULL,
	uskill_nm_level int4 NULL,
	fk_ski_cd_id int8 NULL,
	uskil_cd_id bigserial NOT NULL,
	CONSTRAINT user_skill_pkey PRIMARY KEY (uskil_cd_id),
	CONSTRAINT fk5vukfqxxqyph9ov9qg9jbkt9v FOREIGN KEY (fk_ski_cd_id) REFERENCES public.skills(ski_cd_id),
	CONSTRAINT fkmb64otk30wjye8w0klpe3k3fh FOREIGN KEY (fk_usr_cd_id) REFERENCES public.users(usr_cd_id)
);