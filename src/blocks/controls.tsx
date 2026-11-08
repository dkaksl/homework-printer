import { useId } from 'react'
import { useT } from '../i18n/useT'

interface CheckboxGroupProps<T extends string> {
  label: string
  options: { value: T; label: string }[]
  selected: T[]
  onChange: (selected: T[]) => void
}

export const CheckboxGroup = <T extends string>({
  label,
  options,
  selected,
  onChange
}: CheckboxGroupProps<T>) => (
  <fieldset className="field checkbox-group">
    <legend>{label}</legend>
    {options.map((option) => (
      <label key={option.value} className="checkbox">
        <input
          type="checkbox"
          checked={selected.includes(option.value)}
          onChange={(e) =>
            onChange(
              e.target.checked
                ? options.map((o) => o.value).filter((v) => v === option.value || selected.includes(v))
                : selected.filter((v) => v !== option.value)
            )
          }
        />
        {option.label}
      </label>
    ))}
  </fieldset>
)

interface NumberFieldProps {
  label: string
  min: number
  max: number
  value: number
  onChange: (value: number) => void
}

export const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value))

export const NumberField = ({ label, min, max, value, onChange }: NumberFieldProps) => {
  const id = useId()
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={(e) => {
          const parsed = parseInt(e.target.value, 10)
          if (!Number.isNaN(parsed)) onChange(clamp(parsed, min, max))
        }}
      />
    </div>
  )
}

interface SelectFieldProps<T extends string> {
  label: string
  options: { value: T; label: string }[]
  value: T
  onChange: (value: T) => void
}

export const SelectField = <T extends string>({
  label,
  options,
  value,
  onChange
}: SelectFieldProps<T>) => {
  const id = useId()
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value as T)}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export interface NoteConfig {
  withNote: boolean
  note: string
}

export const NoteFields = <C extends NoteConfig>({
  config,
  onChange
}: {
  config: C
  onChange: (config: C) => void
}) => {
  const { t } = useT()
  return (
    <div className="field">
      <label className="checkbox">
        <input
          type="checkbox"
          checked={config.withNote}
          onChange={(e) => onChange({ ...config, withNote: e.target.checked })}
        />
        {t('Note')}
      </label>
      {config.withNote && (
        <textarea
          aria-label={t('Note')}
          rows={4}
          value={config.note}
          onChange={(e) => onChange({ ...config, note: e.target.value })}
        />
      )}
    </div>
  )
}
