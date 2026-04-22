import { useFormField } from './useFormField'

type Props = {
  name: string
  placeholder: string
}

export const FormInput = ({ name, placeholder }: Props) => {
  const { register, error } = useFormField(name)

  return (
    <div>
      <input
        {...register}
        placeholder={placeholder}
        className={`
          w-full px-3 py-2 rounded-lg border
          ${error ? 'border-red-500' : 'border-gray-300'}
          focus:outline-none focus:ring-2 focus:ring-blue-500
        `}
      />

      {error && (
        <span className="text-red-500 text-xs mt-1 block">
          {error}
        </span>
      )}
    </div>
  )
}