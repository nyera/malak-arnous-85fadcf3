DROP POLICY "programs_select_published" ON public.programs;
CREATE POLICY "programs_select_public" ON public.programs FOR SELECT TO anon USING (is_published);
CREATE POLICY "programs_select_auth" ON public.programs FOR SELECT TO authenticated USING (is_published OR public.has_role(auth.uid(),'admin'));

REVOKE ALL ON FUNCTION public.has_role(UUID, public.app_role) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.has_program_access(UUID, UUID) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.set_updated_at() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.has_program_access(UUID, UUID) TO service_role;
