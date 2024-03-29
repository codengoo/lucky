import { useNavigate } from "react-router-dom"
import Form from "@admin/components/form"
import Header from "@admin/components/header"
import { useContext } from "react"
import Input from "@admin/components/input"
import Button from "@admin/components/button"
import { IoMdArrowForward, IoMdCopy, IoMdDownload, IoMdOpen, IoMdSave } from "react-icons/io"
import { AssetApi } from "@admin/apis"
import { MessageContext, MessageContextType } from "@admin/store/message"

export default function Setting4() {
    const navigate = useNavigate();
    const { state, reset } = useContext(MessageContext) as MessageContextType;

    function handleNext() {
        reset();
        navigate("/message/create");
    }

    function handleOpen() {
        window.open(state.link);
    }

    function handleCopy() {
        window.navigator.clipboard.writeText(state.link);
    }

    async function handleSave() {
        var canvas = document.getElementById("canvas") as HTMLCanvasElement || null;

        if (canvas) {
            const data = canvas.toDataURL();
            const response = await AssetApi.uploadCanvas(data);
            console.log(response);
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

    return (
        <div>
            <Header
                title="Xong rùi!"
                subtitle="Đây là link đến lời chúc của bạn"
            />

            <div className="pt-8 h-full">
                <Form
                    onSubmit={handleNext}
                    input_component={
                        <>
                            <Input
                                title="Link của bạn đây"
                                type="text"
                                id="link"
                                value={state.link}
                                disabled
                            />

                            <div className="mb-5 flex gap-2">
                                <Button onClick={handleOpen} icon_center={<IoMdOpen />} styleBtn="Alternative" type="button" />
                                <Button onClick={handleCopy} icon_center={<IoMdCopy />} styleBtn="Alternative" type="button" />
                                <Button onClick={handleSave} icon_center={<IoMdSave />} styleBtn="Alternative" type="button" />
                                <Button onClick={handleDownload} icon_center={<IoMdDownload />} type="button" />
                            </div>
                        </>
                    }

                    button_element={
                        <div>
                            <Button title="Hoàn thành" onClick={handleNext} icon={<IoMdArrowForward />} />
                        </div>
                    }>
                </Form>
            </div>
        </div>
    )

}