import { MouseEvent } from "react";
import { IoMdClose } from "react-icons/io";

interface IProps {
    data: {
        value: string
    }[],
    value: string,
    onClick: (data: string) => void,
    onAdd: () => void,
    onRemove: (data: string) => void
}

export default function Chip({ data, value, onClick, onAdd, onRemove }: IProps) {
    function handleClick(data: string) {
        onClick && onClick(data);
    }

    function handleAdd(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        e.stopPropagation();
        onAdd && onAdd();
    }

    function handleRemove(e: MouseEvent<HTMLButtonElement>, data: string) {
        e.preventDefault();
        e.stopPropagation();
        onRemove && onRemove(data);
    }

    return (
        <div className="flex flex-wrap flex-row gap-2 mb-5">
            {data.map((item, index) => (
                <div
                    onClick={() => handleClick(item.value)}
                    key={index.toString()}
                    className={"pl-3 pr-1 py-1 border rounded-full cursor-pointer flex flex-row items-center " +
                        (item.value === value ? "border-blue-600 border-2" : "border-gray-300")} >
                    <span className="">{item.value}</span>

                    <button
                        onClick={(e) => { handleRemove(e, item.value) }}
                        className="hover:bg-slate-50 p-1 rounded-full ml-2">
                        <IoMdClose />
                    </button>
                </div>
            ))}
            {<button
                onClick={handleAdd}
                className={"px-3 py-1 border rounded-full cursor-pointer bg-blue-600 border-blue-600 text-white"}>
                Thêm
            </button>}
        </div>
    )
}