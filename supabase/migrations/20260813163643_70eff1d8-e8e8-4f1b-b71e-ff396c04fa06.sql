REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.set_updated_at() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.has_program_access(uuid, uuid) FROM PUBLIC, anon, authenticated;

CREATE POLICY "course_files_admin_select" ON storage.objects FOR SELECT TO authenticated
USING (bucket_id IN ('course-resources','program-resources') AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "course_files_admin_insert" ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id IN ('course-resources','program-resources') AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "course_files_admin_update" ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id IN ('course-resources','program-resources') AND public.has_role(auth.uid(), 'admin'))
WITH CHECK (bucket_id IN ('course-resources','program-resources') AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "course_files_admin_delete" ON storage.objects FOR DELETE TO authenticated
USING (bucket_id IN ('course-resources','program-resources') AND public.has_role(auth.uid(), 'admin'));