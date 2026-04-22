import { Controller, useFormContext } from 'react-hook-form'
import { IMaskInput } from 'react-imask'

type Props = {
  name: string
  mask: any
  placeholder: string
  blocks?: any
  onAccept?: (value: string) => void
}

export const FormMaskedInput = ({
  name,
  mask,
  placeholder,
  blocks,
}: Props) => {
  const {
    control,
    formState: { errors },
  } = useFormContext()

  return (
    <div>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <IMaskInput
            mask={mask}
            blocks={blocks}
            value={field.value || ''}
            onAccept={(val) => field.onChange(val)}
            placeholder={placeholder}
            className={`
              w-full px-3 py-2 rounded-lg border
              ${errors[name] ? 'border-red-500' : 'border-gray-300'}
              focus:outline-none focus:ring-2 focus:ring-blue-500
            `}
          />
        )}
      />

      {errors[name] && (
        <span className="text-red-500 text-xs mt-1 block">
          {errors[name]?.message as string}
        </span>
      )}
    </div>
  )
}