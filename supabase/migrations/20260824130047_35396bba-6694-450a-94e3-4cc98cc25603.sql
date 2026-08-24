DROP POLICY IF EXISTS "course_resources_no_client_select" ON storage.objects;
DROP POLICY IF EXISTS "course_resources_no_client_write" ON storage.objects;

CREATE POLICY "course_resources_no_client_select"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (false);

CREATE POLICY "course_resources_no_client_write"
ON storage.objects FOR ALL
TO anon, authenticated
USING (false)
WITH CHECK (false);