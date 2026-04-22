import { useFormField } from './useFormField'

type Props = {
  name: string
  options: string[]
  placeholder: string
}

export const FormSelect = ({ name, options, placeholder }: Props) => {
  const { register, error } = useFormField(name)

  return (
    <div>
      <select
        {...register}
        className={`
          w-full px-3 py-2 rounded-lg border
          ${error ? 'border-red-500' : 'border-gray-300'}
          focus:outline-none focus:ring-2 focus:ring-blue-500
          bg-white
        `}
      >
        <option value="">{placeholder}</option>

        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>

      {error && (
        <span className="text-red-500 text-xs mt-1 block">
          {error}
        </span>
      )}
    </div>
  )
}