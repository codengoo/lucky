import Header from "@admin/components/header";
import ListItem from "./list_item";
import { useContext, useEffect, useState } from "react";
import { MyDBCard } from "@admin/apis/handler/card";
import { CardApi } from "@admin/apis";
import { BankQRContext, BankQRContextType } from "@admin/store/bankQR";
import Button from "@admin/components/button";
import { IoMdClose, IoMdDownload } from "react-icons/io";

export default function History() {
    const [historyList, setHistory] = useState<MyDBCard[]>([])
    const [currentID, setCurrentID] = useState<string>();
    const { changeAll } = useContext(BankQRContext) as BankQRContextType;

    useEffect(() => {
        CardApi.getAllCards()
            .then(data => {
                setHistory(data);
            })
    }, [])

    function handleClick(id: string) {
        const tmp = historyList.filter(item => item.id === id);

        if (tmp.length > 0) {
            setCurrentID(id);
            changeAll({
                account: {
                    bank: tmp[0].acc_bank,
                    bank_short: tmp[0].acc_bank_short,
                    name: tmp[0].acc_name,
                    number: tmp[0].acc_num,
                },
                image: tmp[0].image,
                wish: tmp[0].wish,
                link: ""
            });
        }
    }

    function handleDownload() {
        var link = document.createElement("a");
        var canvas = document.getElementById("canvas") as HTMLCanvasElement || null;

        if (canvas && link) {
            link.setAttribute('download', 'card.png');
            link.setAttribute('href', canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
            link.click();
        }
    }

    function handleDelete() {
        if (currentID) {
            CardApi.deleteCard(currentID).then(() => {
                const tmp = historyList.filter(item => item.id !== currentID);
                setHistory(tmp);
            })
        }
    }

    return (
        <>
            <Header
                title="Lịch sử tạo QR"
                subtitle="Tra cứu lịc sử"
            />

            <div className="flex gap-2 mt-5">
                <Button onClick={handleDownload} icon_center={<IoMdDownload />} type="button" />
                <Button onClick={handleDelete} icon_center={<IoMdClose />} type="button" styleBtn="Alternative" />
            </div>

            <div className="mt-5 flex flex-col gap-2 w-80 h-full overflow-scroll">
                {historyList.map(item => (
                    <ListItem
                        id={item.id}
                        key={item.id}
                        bank={item.acc_bank_short}
                        name={item.acc_name}
                        wish={item.wish}
                        selected={item.id == currentID}
                        onClick={handleClick} />
                ))}
            </div>

        </>
    )
}