interface IProps {
    data: {
        name: string,
        value: string
    }[],
    value: string
}

export default function Chip({ data, value }: IProps) {
    return (
        <div className="flex flex-wrap flex-row">
            {data.map((item, index) => (
                <div
                    key={index.toString()}
                    className={"px-3 py-2 border rounded-full " +
                        (item.value === value ? "border-blue-600" : "border-gray-300")} >
                    {item.name}
                </div>
            ))}
        </div>
    )
}