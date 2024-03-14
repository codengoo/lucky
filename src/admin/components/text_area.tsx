import { ChangeEvent, DetailedHTMLProps, TextareaHTMLAttributes } from "react";

type OriginalProps = DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>
interface IProps extends Omit<OriginalProps, "onChange"> {
    onChange: (data: string) => void;
    value: string;
}

export default function TextArea({ id, title, value, onChange, ...rest }: IProps) {
    function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
        e.preventDefault();
        e.stopPropagation();

        onChange && onChange(e.target.value);
    }

    return (
        <div className="mb-5">
            <label
                htmlFor={id}
                className="block mb-2 text-sm font-medium text-gray-900">
                {title}
            </label>

            <textarea
                {...rest}
                id={id}
                rows={4}
                placeholder="Con yêu mẹ"
                onChange={handleChange}
                value={value}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500">
            </textarea>
        </div>
    )
}