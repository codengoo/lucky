import Header from "@admin/components/header";
import ListItem from "./list_item";
import { useContext, useEffect, useState } from "react";
import { MyDBCard } from "@admin/apis/handler/card";
import { CardApi } from "@admin/apis";
import { BankQRContext, BankQRContextType } from "@admin/store/bankQR";

export default function History() {
    const [historyList, setHistory] = useState<MyDBCard[]>([])
    const [current, setCurrent] = useState<string>();
    const { changeAcc, changeImage, changeWish } = useContext(BankQRContext) as BankQRContextType;

    useEffect(() => {
        CardApi.getAllCards()
            .then(data => {
                setHistory(data);
            })
    }, [])

    function handleClick(id: string) {
        const tmp = historyList.filter(item => item.id === id);
        if (tmp.length > 0) {
            setCurrent(id);
            changeAcc({
                bank: tmp[0].acc_bank,
                bank_short: tmp[0].acc_bank_short,
                name: tmp[0].acc_name,
                number: tmp[0].acc_num,
            })
            changeImage(tmp[0].image);
            changeWish(tmp[0].wish);
        }
    }

    return (
        <>
            <Header
                title="Lịch sử tạo QR"
                subtitle="Tra cứu lịc sử"
            />

            <div className="mt-5 flex flex-col gap-2 w-80 h-full overflow-scroll">
                {historyList.map(item => (
                    <ListItem
                        id={item.id}
                        key={item.id}
                        bank={item.acc_bank_short}
                        name={item.acc_name}
                        wish={item.wish}
                        selected={item.id == current}
                        onClick={handleClick} />
                ))}
            </div>

        </>
    )
}