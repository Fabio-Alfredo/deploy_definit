INSERT INTO public.role (id_role, name)VALUES ('ADMN', 'Administrador')
    ON CONFLICT (id_role) DO UPDATE SET name = excluded.name;

INSERT INTO public.role (id_role, name) VALUES ('EMPL', 'Empleado')
    ON CONFLICT (id_role) DO UPDATE SET name = excluded.name;

INSERT INTO public.role (id_role, name) VALUES ('RESD', 'Residente')
    ON CONFLICT (id_role) DO UPDATE SET name = excluded.name;

INSERT INTO public.role (id_role, name) VALUES ('RSAD', 'Residente Administrador')
    ON CONFLICT (id_role) DO UPDATE SET name = excluded.name;

INSERT INTO public.role (id_role, name) VALUES ('VIST', 'Visitante')
    ON CONFLICT (id_role) DO UPDATE SET name = excluded.name;