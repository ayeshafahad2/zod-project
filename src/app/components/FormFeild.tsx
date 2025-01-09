import { FormFieldProps } from "../../../types";


const FormField: React.FC<FormFieldProps> = ({
  type,
  placeholder,
  name,
  register,
  error,
  valueAsNumber,
}) => (
  <>
    <input
      type={type}
      placeholder={placeholder}
      {...register(name, { valueAsNumber })}
        className="
    w-full 
    sm:w-3/4 
    lg:w-1/2 
    px-4 
    py-2 
    rounded-md 
    border 
    border-amber-900 
    bg-amber-100 
    text-amber-900 
    focus:outline-none 
    focus:ring-2 
    focus:ring-amber-500 
    transition 
    duration-200 
    ease-in-out
  "
/>
{error && <span className="error-message text-lg font-semibold">{error.message}</span>}
  </>
);
export default FormField;