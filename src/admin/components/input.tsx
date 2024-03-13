import { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, useRef } from "react"

type OriginalProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

interface IProps extends Omit<OriginalProps, "onChange"> {
  onChange?: (value: string) => void;
}
export default function Input({ id, onChange, title, ...rest }: IProps) {
  const input_form = useRef<HTMLInputElement>(null);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const data = event.target.value
    onChange && onChange(data);
  }

  function handleClear() {
    input_form.current!.value = "";
  }

  return (
    <div className="mb-5">
      <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900">{title}</label>

      <div className="relative">
        <input
          id={id}
          name={id}
          ref={input_form}
          onChange={handleChange}
          {...rest}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 hidden-input-btn"
        />

        <div className="absolute inset-y-0 end-0 pe-2.5 flex items-center cursor-pointer" >
          <button onClick={handleClear}>
            <svg
              className="w-6 h-6 text-gray-800 hover:text-blue-600"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm7.7-3.7a1 1 0 0 0-1.4 1.4l2.3 2.3-2.3 2.3a1 1 0 1 0 1.4 1.4l2.3-2.3 2.3 2.3a1 1 0 0 0 1.4-1.4L13.4 12l2.3-2.3a1 1 0 0 0-1.4-1.4L12 10.6 9.7 8.3Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div >
    </div >
  )
}