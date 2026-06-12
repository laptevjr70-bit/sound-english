import { z } from 'zod'

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'Введите имя (минимум 2 символа)')
    .max(60, 'Слишком длинное имя'),
  contact: z
    .string()
    .min(5, 'Введите телефон или ник в мессенджере')
    .max(80, 'Слишком длинное значение'),
  age: z.enum(['3-6', '7-10', '11-14'] as const).refine(
    (v) => ['3-6', '7-10', '11-14'].includes(v),
    { message: 'Выберите возраст ребёнка' }
  ),
  comment: z.string().max(500, 'Не более 500 символов').optional(),
  pdConsent: z.literal(true, {
    message: 'Необходимо дать согласие на обработку данных',
  }),
})

export type ContactFormValues = z.infer<typeof contactSchema>
