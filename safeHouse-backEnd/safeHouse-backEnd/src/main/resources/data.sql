INSERT INTO public."role" VALUES('VIST', 'Visitante') ON CONFLICT("id_role")
DO UPDATE SET "name" = excluded."name";
