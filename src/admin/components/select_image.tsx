import { IoMdAddCircleOutline } from "react-icons/io";
import OptionImage from "./option_image";
import { ChangeEvent } from "react";

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

  function handleAddLocal(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length >= 1) {
      const imageURL = URL.createObjectURL(e.target.files[0])
      onChange && onChange(imageURL);
    }
  }

  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 flex-none">{title}</label>

      <div className="flex flex-row flex-wrap gap-4 py-5 overflow-y-scroll" id={id}>
        <div
          className="cursor-pointer relative flex justify-center items-center h-32 w-20 bg-slate-200 rounded-xl">
          <IoMdAddCircleOutline size="30px" />
          <input
            multiple={false}
            type="file"
            name="image_file"
            accept="image/png, image/jpeg"
            className="absolute top-0 left-0 w-full h-full opacity-0"
            onChange={handleAddLocal} />
        </div>

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
