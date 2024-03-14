interface IProps {
    id: string;
    wish: string;
    name: string;
    bank: string;
    selected?: boolean;
    onClick: (data: string) => void;
}

export default function ListItem({ id, wish, name, bank, selected, onClick }: IProps) {
    function handleClick() {
        onClick && onClick(id);
    }

    return (
        <div
            onClick={handleClick}
            className={
                "px-4 rounded-xl bg-white border p-1 cursor-pointer select-none hover:bg-slate-100 " +
                (selected ? 'border-blue-600' : 'border-gray-300')}>
            <h1 className="font-lato text-lg font-semibold">{wish}</h1>
            <h3 className="font-lato">{name}</h3>
            <h4 className="font-lato">{bank}</h4>
        </div>
    )
}