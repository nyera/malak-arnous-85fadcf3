import * as React from 'react'
import { Body, Container, Head, Heading, Html, Preview, Section, Text } from '@react-email/components'
import type { TemplateEntry } from './registry'

interface Props {
  name?: string
  email?: string
  country?: string
  age?: string
  answers?: string
}

const SurveyNotification = ({ name, email, country, age, answers }: Props) => (
  <Html lang="ar" dir="rtl">
    <Head />
    <Preview>{`استبيان جديد من ${name || 'زائرة'}`}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>استبيان جديد من الموقع</Heading>
        <Section style={card}>
          <Text style={meta}><strong>الاسم:</strong> {name || '—'}</Text>
          <Text style={meta}><strong>البريد الإلكتروني:</strong> {email || '—'}</Text>
          <Text style={meta}><strong>البلد:</strong> {country || '—'}</Text>
          <Text style={meta}><strong>العمر:</strong> {age || '—'}</Text>
        </Section>
        <Text style={pre}>{answers || '—'}</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: SurveyNotification,
  subject: (data: Record<string, any>) => `استبيان جديد من ${data?.name || 'زائرة'}`,
  displayName: 'إشعار استبيان جديد',
  to: 'hello@malakarnoushealing369.com',
  previewData: {
    name: 'سارة',
    email: 'sara@example.com',
    country: 'السعودية',
    age: '32',
    answers: '• سؤال\n  جواب',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Tahoma, Arial, sans-serif' }
const container = { padding: '24px 24px', maxWidth: '640px' }
const h1 = { fontSize: '20px', fontWeight: 600, color: '#2f3b30', margin: '0 0 16px' }
const card = { backgroundColor: '#f5f3ee', borderRadius: '8px', padding: '14px 18px', margin: '0 0 20px' }
const meta = { fontSize: '14px', color: '#3a3a3a', margin: '4px 0' }
const pre = {
  fontSize: '14px',
  color: '#3a3a3a',
  lineHeight: '1.8',
  whiteSpace: 'pre-wrap' as const,
}
