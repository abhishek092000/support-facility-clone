import { useState } from 'react'

// Where the PHP endpoint lives. On a static host the PHP file must be served by
// the same origin, so the default is a root-relative path.
export const FORM_ENDPOINT = '/api/send-mail.php'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function useLeadForm({ formType, redirectTo = '/thank-you' }) {
  const [status, setStatus] = useState('idle') // idle | submitting | error | success
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (status === 'submitting') return

    const form = event.currentTarget
    const formData = new FormData(form)
    const payload = {
      name: String(formData.get('name') || '').trim(),
      email: String(formData.get('email') || '').trim(),
      company: String(formData.get('company') || '').trim(),
      phone: String(formData.get('phone') || '').trim(),
      service: String(formData.get('service') || '').trim(),
      message: String(formData.get('message') || '').trim(),
      form_type: formType,
      page_url: window.location.href,
      _honey: String(formData.get('_honey') || ''),
    }

    // Client-side checks mirror the server so obvious mistakes fail instantly.
    const localErrors = {}
    if (!payload.name) localErrors.name = 'Please enter your name.'
    if (!EMAIL_PATTERN.test(payload.email)) localErrors.email = 'Please enter a valid business email address.'
    if (!payload.company) localErrors.company = 'Please enter your company name.'
    if (!payload.service) localErrors.service = 'Please select a service.'
    if (Object.keys(localErrors).length > 0) {
      setFieldErrors(localErrors)
      setError('Please correct the highlighted fields.')
      setStatus('error')
      return
    }

    setStatus('submitting')
    setError('')
    setFieldErrors({})

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      })

      let result = {}
      try {
        result = await response.json()
      } catch {
        result = {}
      }

      if (!response.ok || !result.ok) {
        setFieldErrors(result.fields || {})
        setError(result.error || 'Your enquiry could not be sent. Please try again.')
        setStatus('error')
        return
      }

      setStatus('success')
      form.reset()
      window.location.assign(result.redirect || redirectTo)
    } catch {
      setError('We could not reach the server. Please check your connection and try again.')
      setStatus('error')
    }
  }

  return { status, error, fieldErrors, handleSubmit }
}
