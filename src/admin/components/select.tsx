import { ChangeEvent, DetailedHTMLProps, SelectHTMLAttributes } from "react"

type OriginalProps = DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>;

interface IProps extends Omit<OriginalProps, "onChange"> {
  data: Array<{ value: string, name: string }>,
  placeholder: string,
  onChange: (value: string) => void
}

export default function Select({ id, title, data, placeholder, onChange, ...rest }: IProps) {

  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    const data = event.target.value
    onChange && onChange(data);
  }

  return (
    <div className="mb-5">
      <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900">{title}</label>

      <select id={id}
        name={id}
        onChange={handleChange}
        {...rest}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      >
        <option value="0" selected>{placeholder}</option>

        {
          data.map(item =>
            <option value={item.value}>
              {item.name}
            </option>)
        }

      </select >
    </div >
  )
}
