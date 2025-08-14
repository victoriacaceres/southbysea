'use client'
import { useMemo, useState, useEffect } from 'react'
import clsx from 'clsx'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { businessDaysBetween } from '@/lib/dates'
import { fmtMoney } from '@/lib/money'

const tabs = [
  { key: 'ai', label: 'Create with AI' },
  { key: 'diy', label: 'Create Yourself' },
  { key: 'designs', label: 'Browse a Design' },
  { key: 'custom', label: 'Submit a Custom Request' },
] as const

const FormSchema = z.object({
  product: z.string().min(1).max(150),
  color: z.string().min(1).max(150),
  frontDesign: z.string().min(1).max(2000),
  backDesign: z.string().min(1).max(2000),
  extraInfo: z.string().min(1).max(2000),
  event: z.string().min(1).max(150),
  organization: z.enum(["Alpha Chi Omega","Zeta Tau Alpha","Other"]),
  organizationOther: z.string().max(150).optional(),
  school: z.enum(["Georgia Southern University","Other"]),
  schoolOther: z.string().max(150).optional(),
  deliveryType: z.enum(["One Group Shipment","Multiple Individual Shipments","Group and Individual Shipments"]),
  budgetPerItem: z.string().regex(/^\d{1,10}(?:\.\d{0,2})?$/, "Enter a valid amount"),
  estQty: z.string().regex(/^\d{1,10}$/, "Numbers only"),
  needBy: z.string(),
  manualAddress: z.boolean().optional(),
  address: z.object({
    line1: z.string().optional(),
    line2: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    zip: z.string().optional(),
  }).optional(),
  firstName: z.string().min(1).max(150),
  lastName: z.string().min(1).max(150),
  email: z.string().email(),
  phone: z.string().regex(/^\d{10}$/, "10 digit number"),
  gradDate: z.string().optional(),
  campusManager: z.string().optional(),
  promoCode: z.string().optional(),
  // ✅ agree can be false by default, but must be true to pass validation
  agree: z.boolean().refine(v => v === true, {
    message: "You must agree to the Terms and Conditions",
  }),
}); // ← make sure this closing `});` is present

type FormData = z.infer<typeof FormSchema>;


export default function GetStartedPage() {
  const [active, setActive] = useState<(typeof tabs)[number]['key']>('ai')

  const { register, watch, handleSubmit, setValue, formState: { errors, isValid, isSubmitted } } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    mode: 'onChange',
    defaultValues: {
      product: 'Comfort Colors Short Sleeve Tee',
      color: 'Chambray',
      frontDesign: 'Put my image on the front left chest',
      backDesign: 'Change to my organization name and make the colors blue and yellow',
      extraInfo: 'Make the banner 5ft x 7ft',
      event: "Parents' Weekend",
      organization: 'Alpha Chi Omega',
      school: 'Georgia Southern University',
      deliveryType: 'One Group Shipment',
      budgetPerItem: '0',
      estQty: '0',
      agree: false,
    }
  })

  const budget = watch('budgetPerItem')
  const qty = watch('estQty')
  const totalBudget = useMemo(() => {
    const b = parseFloat(budget || '0')
    const q = parseInt(qty || '0')
    return fmtMoney((Number.isNaN(b) ? 0 : b) * (Number.isNaN(q) ? 0 : q))
  }, [budget, qty])

  const needBy = watch('needBy')
  const rush = useMemo(() => {
    if (!needBy) return false
    try {
      const days = businessDaysBetween(new Date(), new Date(needBy))
      return days <= 10
    } catch { return false }
  }, [needBy])

  useEffect(()=>{},[isSubmitted,isValid])

  function onSubmit(data: FormData) {
    const confirmation = Math.random().toString(36).slice(2,10).toUpperCase()
    alert(`Thank you! Confirmation #: ${confirmation}`)
  }

  return (
    <div>
      <div className="sticky top-[60px] z-40 bg-brand-bg border-b border-black/5">
        <div className="container flex gap-2 overflow-auto py-3">
          {tabs.map(t => (
            <button key={t.key} onClick={()=>setActive(t.key)}
              className={clsx('px-4 py-2 rounded-full border text-sm whitespace-nowrap',
              active===t.key ? 'bg-brand-primary text-white border-brand-primary' : 'bg-white border-black/10')}
            >{t.label}</button>
          ))}
        </div>
      </div>

      <div className="container py-8">
        {active==='ai' && (
          <div className="aspect-[16/9] w-full card overflow-hidden">
            <iframe className="w-full h-full" src="https://design.southbysea.com/design-southbysea/?_gl=1*161048m*_ga*MTQxMDg4NzI3Ni4xNzU1MTAxODM5*_ga_26MNEMMKLL*czE3NTUxMDE4MzgkbzEkZzEkdDE3NTUxMDI1NjQkajU5JGwwJGgw#%2F" title="Create with AI"/>
          </div>
        )}
        {active==='diy' && (
          <div className="aspect-[16/9] w-full card overflow-hidden">
            <iframe className="w-full h-full" src="https://design.southbysea.com/design-southbysea" title="Create Yourself"/>
          </div>
        )}
        {active==='designs' && (
          <div>
            <p className="mb-4 text-sm text-black/70">Filterable gallery loads from admin (Event, Style/Theme, Organization). Click any design → “Add to Request” → choose Front/Back → the selection is attached to the Custom Request form below.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Array.from({length:8}).map((_,i)=> (
                <div key={i} className="card p-2 flex flex-col">
                  <div className="aspect-square bg-black/5 rounded-md"/>
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span>Design #{1000+i}</span>
                    <button className="btn-outline px-3 py-1 text-xs" onClick={()=>{
                      const where = window.confirm('Add this to FRONT? Click Cancel for BACK.') ? 'frontDesign' : 'backDesign'
                      setActive('custom')
                      setValue(where as any, `Use Design #${1000+i}`)
                    }}>Add to Request</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {active==='custom' && (
          <form className="grid md:grid-cols-2 gap-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="card p-6 space-y-4">
              <h3 className="text-xl font-semibold">Project Details</h3>
              <label className="block">Product/Item
                <input className="mt-1 w-full p-3 border rounded-md" maxLength={150} placeholder="Comfort Colors Short Sleeve Tee" {...register('product')} />
              </label>
              <label className="block">Product/Item Color
                <input className="mt-1 w-full p-3 border rounded-md" maxLength={150} placeholder="Chambray" {...register('color')} />
              </label>
              <label className="block">Front Design
                <textarea className="mt-1 w-full p-3 border rounded-md min-h-[120px]" maxLength={2000} placeholder="Put my image on the front left chest" {...register('frontDesign')} />
              </label>
              <label className="block">Back Design
                <textarea className="mt-1 w-full p-3 border rounded-md min-h-[120px]" maxLength={2000} placeholder="Change to my organization name and make the colors blue and yellow" {...register('backDesign')} />
              </label>
              <label className="block">Extra Info
                <textarea className="mt-1 w-full p-3 border rounded-md min-h-[120px]" maxLength={2000} placeholder="Make the banner 5ft x 7ft" {...register('extraInfo')} />
              </label>
              <div className="grid md:grid-cols-2 gap-4">
                <label className="block">Event
                  <input className="mt-1 w-full p-3 border rounded-md" maxLength={150} placeholder="Parents' Weekend" {...register('event')} />
                </label>
                <label className="block">Organization
                  <select className="mt-1 w-full p-3 border rounded-md" {...register('organization')}>
                    <option>Alpha Chi Omega</option>
                    <option>Zeta Tau Alpha</option>
                    <option>Other</option>
                  </select>
                </label>
              </div>
              <p className="text-xs text-black/60">Not listed or not an organization? Please select "Other".</p>
              <label className="block">School
                <select className="mt-1 w-full p-3 border rounded-md" {...register('school')}>
                  <option>Georgia Southern University</option>
                  <option>Other</option>
                </select>
              </label>
              <p className="text-xs text-black/60">Not listed or not a school? Please select "Other".</p>
            </div>

            <div className="card p-6 space-y-4">
              <h3 className="text-xl font-semibold">Budget & Delivery</h3>
              <div className="grid grid-cols-2 gap-4">
                <label className="block">Budget Per Item
                  <input className="mt-1 w-full p-3 border rounded-md" maxLength={10} placeholder="20.00" {...register('budgetPerItem')} />
                </label>
                <label className="block">Estimated Quantity
                  <input className="mt-1 w-full p-3 border rounded-md" maxLength={10} placeholder="24" {...register('estQty')} />
                </label>
              </div>
              <div className="text-sm">Total Estimated Budget: <strong>{totalBudget}</strong></div>

              <label className="block">Delivery Type
                <select className="mt-1 w-full p-3 border rounded-md" {...register('deliveryType')}>
                  <option>One Group Shipment</option>
                  <option>Multiple Individual Shipments</option>
                  <option>Group and Individual Shipments</option>
                </select>
              </label>

              <label className="block">Need Delivery By
                <input type="date" className="mt-1 w-full p-3 border rounded-md" {...register('needBy')} />
              </label>

              <h3 className="text-xl font-semibold">Contact</h3>
              <div className="grid grid-cols-2 gap-4">
                <label className="block">First Name
                  <input className="mt-1 w-full p-3 border rounded-md" {...register('firstName')} />
                </label>
                <label className="block">Last Name
                  <input className="mt-1 w-full p-3 border rounded-md" {...register('lastName')} />
                </label>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <label className="block">Email
                  <input className="mt-1 w-full p-3 border rounded-md" type="email" {...register('email')} />
                </label>
                <label className="block">Phone Number
                  <input className="mt-1 w-full p-3 border rounded-md" placeholder="1234567890" {...register('phone')} />
                </label>
              </div>

              <h3 className="text-xl font-semibold">Optional</h3>
              <div className="grid grid-cols-3 gap-3">
                <label className="block">Graduation Date (MM/YYYY)
                  <input className="mt-1 w-full p-3 border rounded-md" placeholder="05/2027" {...register('gradDate')} />
                </label>
                <label className="block">My Campus Manager
                  <input className="mt-1 w-full p-3 border rounded-md" placeholder="Alex Smith" {...register('campusManager')} />
                </label>
                <label className="block">Promo Code
                  <input className="mt-1 w-full p-3 border rounded-md" {...register('promoCode')} />
                </label>
              </div>

 <label className="inline-flex items-center gap-2 text-sm">
  <input type="checkbox" {...register("agree")} />
  I agree to the{" "}
  <a className="underline" href="/legal/terms" target="_blank">
    Terms and Conditions
  </a>
</label>


              <button type="submit" disabled={!isValid} className={clsx('btn-primary w-full', !isValid && 'opacity-50 cursor-not-allowed')}>Submit</button>
              {!isValid && (<p className="text-xs text-black/60">All fields are required to submit this form. Click the submit button to highlight which fields are not complete.</p>)}
              {Object.keys(errors).length>0 && (<div className="text-sm text-brand-red">Please complete highlighted fields.</div>)}
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
