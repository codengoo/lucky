interface IProps {
  title: string;
  subtitle: string;
}

export default function Header({ title, subtitle }: IProps) {
  return (
    <div>
      <div>
        <h1 className="text-3xl text-gray-950 font-monte font-bold">{title}</h1>
        <h3 className="text=lg text-gray-500 font-monte">{subtitle}</h3>
      </div>
    </div>
  )
}