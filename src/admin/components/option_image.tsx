import { ChangeEvent, MouseEventHandler } from "react";

interface IProps {
  name: string,
  value: string,
  onChange: (data: string) => void;
  checked: boolean
}

export default function OptionImage({ name, value, onChange, checked }: IProps) {
  function handleClick(e: React.MouseEvent<HTMLElement>) {
    onChange && onChange(value);
  }

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer relative w-fit select-none flex-none">
      <div className="h-36 overflow-hidden rounded-xl w-fit">
        <img src={window.WPLKPath.assets + value} className="h-full" />
      </div>

      <div className="absolute inset-y-2 end-0 pe-2">
        <input
          name={name}
          type="radio"
          value={value}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
          checked={checked}
          onChange={() => { }}
        />
      </div>
    </div>
  )
}