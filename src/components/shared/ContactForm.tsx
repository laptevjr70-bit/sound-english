'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'motion/react'
import { toast } from 'sonner'
import Link from 'next/link'
import { contactSchema, type ContactFormValues } from '@/lib/schemas/contact'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isValid, submitCount },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', contact: '', comment: '', pdConsent: undefined },
    mode: 'onBlur',
  })

  const pdConsent = watch('pdConsent')
  const eagerValidation = submitCount > 0

  const onSubmit = async (_data: ContactFormValues) => {
    setIsSubmitting(true)
    try {
      // TODO: подключить реальную отправку (Formspree / Telegram-бот / Next.js API-роут)
      // При реальном подключении добавить в payload: consentGivenAt: new Date().toISOString()
      // для лога согласий (требование 152-ФЗ)
      await new Promise((r) => setTimeout(r, 1000)) // имитация запроса
      toast.success('Заявка отправлена! Мы скоро свяжемся 🦊')
      reset()
    } catch {
      toast.error('Ошибка отправки. Позвоните нам напрямую.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const FieldError = ({ msg }: { msg?: string }) => (
    <AnimatePresence>
      {msg && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="text-sm text-red-500 mt-1"
          role="alert"
        >
          {msg}
        </motion.p>
      )}
    </AnimatePresence>
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {/* Имя */}
      <div>
        <Label htmlFor="name" className="block mb-1.5">Имя родителя *</Label>
        <Input
          id="name"
          placeholder="Ваше имя"
          autoComplete="name"
          aria-required="true"
          aria-describedby={errors.name ? 'name-error' : undefined}
          {...register('name')}
        />
        <FieldError msg={eagerValidation ? errors.name?.message : undefined} />
      </div>

      {/* Контакт */}
      <div>
        <Label htmlFor="contact" className="block mb-1.5">Телефон или ник в мессенджере *</Label>
        <Input
          id="contact"
          placeholder="+7 (920) 000-00-00 или @username"
          inputMode="text"
          autoComplete="tel"
          aria-required="true"
          {...register('contact')}
        />
        <FieldError msg={eagerValidation ? errors.contact?.message : undefined} />
      </div>

      {/* Возраст */}
      <div>
        <Label htmlFor="age" className="block mb-1.5">Возраст ребёнка *</Label>
        <Select
          onValueChange={(val) => setValue('age', val as '3-6' | '7-10' | '11-14', { shouldValidate: eagerValidation })}
        >
          <SelectTrigger id="age" aria-required="true">
            <SelectValue placeholder="Выберите возраст" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="3-6">3–6 лет (дошкольники)</SelectItem>
            <SelectItem value="7-10">7–10 лет (младшая школа)</SelectItem>
            <SelectItem value="11-14">11–14 лет (подростки)</SelectItem>
          </SelectContent>
        </Select>
        <FieldError msg={eagerValidation ? errors.age?.message : undefined} />
      </div>

      {/* Комментарий */}
      <div>
        <Label htmlFor="comment" className="block mb-1.5">Комментарий</Label>
        <Textarea
          id="comment"
          placeholder="Расскажите о ребёнке или задайте вопрос (необязательно)"
          {...register('comment')}
        />
        <FieldError msg={eagerValidation ? errors.comment?.message : undefined} />
      </div>

      {/* Согласие на ПДн — отдельный элемент по ст. 9 152-ФЗ (ред. от 01.09.2025) */}
      <div className="flex items-start gap-3 pt-2">
        <Checkbox
          id="pdConsent"
          checked={pdConsent === true}
          onCheckedChange={(v) =>
            setValue('pdConsent', v === true ? true : (undefined as unknown as true), { shouldValidate: true })
          }
          aria-required="true"
          className="mt-0.5 shrink-0"
        />
        <label htmlFor="pdConsent" className="text-sm text-[--muted] leading-snug cursor-pointer">
          Я даю согласие на обработку моих персональных данных в соответствии с{' '}
          <Link
            href="/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-[--brand-navy] hover:opacity-75"
          >
            Политикой конфиденциальности
          </Link>
          , согласно требованиям Федерального закона № 152-ФЗ.
        </label>
      </div>
      {eagerValidation && errors.pdConsent && (
        <p className="text-sm text-red-500 -mt-3" role="alert">{errors.pdConsent.message}</p>
      )}

      <Button
        type="submit"
        disabled={!pdConsent || isSubmitting}
        className="w-full bg-[--brand-red] hover:bg-red-700 text-white mt-2"
        size="lg"
      >
        {isSubmitting ? 'Отправляем...' : 'Отправить заявку'}
      </Button>

      <p className="text-xs text-[--muted]">
        Нажимая кнопку, вы подтверждаете, что ознакомились с Политикой конфиденциальности и даёте согласие на обработку персональных данных.
      </p>
    </form>
  )
}
