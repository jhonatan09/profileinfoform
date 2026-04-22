type Props = {
    children: React.ReactNode
    error?: string
  }
  
  export const FormField = ({ children, error }: Props) => {
    return (
      <div>
        {children}
        {error && (
          <span className="text-red-500 text-xs mt-1 block">
            {error}
          </span>
        )}
      </div>
    )
  }