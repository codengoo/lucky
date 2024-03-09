import OptionImage from "./option_image";

interface IProps {
  data: Array<{
    name: string,
    value: string
  }>,
  value: string,
  title: string,
  id: string,
  onChange: (data: string) => void
}

export default function SelectImage({ data, value, onChange, id, title }: IProps) {
  function handleChange(data: any) {
    onChange && onChange(data);
  }

  return (
    <div>
      <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900">{title}</label>

      <div className="flex flex-row flex-wrap gap-4 py-5" id={id}>
        {data.map((item, index) => (
          <OptionImage
            name={id}
            key={index.toString()}
            onChange={handleChange}
            value={item.value}
            checked={value === item.value}
          />
        ))}
      </div>
    </div>

  )
}
