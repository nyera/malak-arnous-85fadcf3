ALTER TABLE public.modules ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'published';

CREATE TABLE public.lesson_resources (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lesson_id uuid NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
  title text NOT NULL,
  file_path text NOT NULL,
  file_name text NOT NULL,
  file_type text,
  file_size bigint,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.lesson_resources TO authenticated;
GRANT ALL ON public.lesson_resources TO service_role;

ALTER TABLE public.lesson_resources ENABLE ROW LEVEL SECURITY;

CREATE POLICY "resources_admin_all" ON public.lesson_resources FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "resources_select_entitled" ON public.lesson_resources FOR SELECT TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.lessons l
  WHERE l.id = lesson_resources.lesson_id
    AND l.is_published
    AND public.has_program_access(auth.uid(), l.program_id)
));

CREATE TRIGGER trg_lesson_resources_updated BEFORE UPDATE ON public.lesson_resources
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX idx_lesson_resources_lesson ON public.lesson_resources(lesson_id, sort_order);

INSERT INTO public.modules (program_id, title, description, sort_order, status)
VALUES ('b0c2c53a-1869-472a-9410-fd846639047d', 'Test Module', 'وحدة تجريبية للاختبار', 1, 'published');

INSERT INTO public.lessons (module_id, program_id, slug, title, description, duration_minutes, video_type, is_published, sort_order)
SELECT m.id, m.program_id, 'test-session', 'Test Session', 'جلسة تجريبية للاختبار', 60, 'zoom', true, 1
FROM public.modules m
WHERE m.program_id = 'b0c2c53a-1869-472a-9410-fd846639047d' AND m.title = 'Test Module';