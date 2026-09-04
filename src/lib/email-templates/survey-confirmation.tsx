import * as React from 'react'
import { Body, Container, Head, Heading, Html, Preview, Text } from '@react-email/components'
import type { TemplateEntry } from './registry'

interface Props {
  name?: string
}

const SurveyConfirmation = ({ name }: Props) => (
  <Html lang="ar" dir="rtl">
    <Head />
    <Preview>وصلتنا إجاباتك بنجاح ✨</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>شكراً لكِ {name ? `يا ${name}` : ''} ✨</Heading>
        <Text style={p}>
          وصلتنا إجاباتك بنجاح، وسنقوم بمراجعتها بعناية والتواصل معكِ قريباً.
        </Text>
        <Text style={p}>
          إذا كان لديكِ أي سؤال، يمكنكِ الرد على هذه الرسالة مباشرة.
        </Text>
        <Text style={sign}>ملاك أرنوس</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: SurveyConfirmation,
  subject: 'وصلتنا إجاباتك ✨ | ملاك أرنوس',
  displayName: 'تأكيد استلام الاستبيان',
  previewData: { name: 'سارة' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Tahoma, Arial, sans-serif' }
const container = { padding: '24px 24px', maxWidth: '600px' }
const h1 = { fontSize: '20px', fontWeight: 600, color: '#2f3b30', margin: '0 0 16px' }
const p = { fontSize: '15px', color: '#3a3a3a', lineHeight: '1.9', margin: '0 0 12px' }
const sign = { fontSize: '14px', color: '#7d7566', margin: '20px 0 0' }
