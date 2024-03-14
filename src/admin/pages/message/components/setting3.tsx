import { AssetApi, MessageApi } from "@admin/apis";
import Button from "@admin/components/button";
import Form from "@admin/components/form";
import Header from "@admin/components/header";
import Input from "@admin/components/input";
import { MessageContext, MessageContextType } from "@admin/store/message";
import { useContext } from "react";
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export default function Setting3() {
    const navigate = useNavigate();
    const { state, changePassword, changeLink, changeStore } = useContext(MessageContext) as MessageContextType;

    async function handleSave() {
        var canvas = document.getElementById("canvas") as HTMLCanvasElement || null;

        if (canvas) {
            const data = canvas.toDataURL();
            const response = await AssetApi.uploadCanvas(data);
            return response
        }
    }

    async function handleNext() {
        console.log(state);
        const im = await handleSave();
        console.log(im);
        
        if (im) {
            changeStore(im);
            const link = await MessageApi.add({
                ...state,
                store: im
            });
            if (link) {
                changeLink(link);
                navigate("/message/create/step4");
            }
        }
    }

    function handleBack() {
        navigate("/message/create/step2");
    }

    function handlePassword(data: string) {
        changePassword(data);
    }

    return (
        <>
            <Header
                title="Chọn chủ đề"
                subtitle="Chọn một chủ đề bắt mắt"
            />

            <Form
                onSubmit={handleNext}
                input_component={
                    <>
                        <Input
                            title="Mật khẩu"
                            type="password"
                            id="password"
                            placeholder="****"
                            required
                            value={state.password}
                            onChange={handlePassword}
                        />
                    </>
                }

                button_element={
                    <>
                        <Button onClick={handleBack} styleBtn="Alternative" icon_center={<IoMdArrowBack />} />
                        <Button title="Tạo thôi" icon={<IoMdArrowForward />} type="submit" />
                    </>
                }
            >
            </Form>
        </>
    )
}