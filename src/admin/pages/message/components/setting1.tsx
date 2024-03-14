import Button from "@admin/components/button";
import Form from "@admin/components/form";
import Header from "@admin/components/header";
import Input from "@admin/components/input";
import TextArea from "@admin/components/text_area";
import { MessageContext, MessageContextType } from "@admin/store/message";
import { useContext } from "react";
import { IoMdArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export default function Setting1() {
    const navigate = useNavigate();
    const { state, changeFrom, changeTo, changeMessage } = useContext(MessageContext) as MessageContextType;

    function handleNext() {
        navigate("/message/create/step2");
    }

    function handleChangeFrom(data: string) {
        changeFrom(data);
    }

    function handleChangeTo(data: string) {
        changeTo(data);
    }

    function handleChangeMessage(data: string) {
        changeMessage(data);
    }

    return (
        <>
            <Header
                title="Thông tin chung"
                subtitle="Lời nói lan tỏa yêu thương"
            />

            <Form
                onSubmit={handleNext}
                input_component={
                    <>
                        <Input
                            title="Người gửi"
                            type="text"
                            id="from"
                            placeholder="Trịnh Văn Mớt"
                            required
                            value={state.from}
                            onChange={handleChangeFrom}
                        />

                        <Input
                            title="Người nhận"
                            type="text"
                            id="from"
                            placeholder="Hà Thị Long"
                            required
                            value={state.to}
                            onChange={handleChangeTo}
                        />

                        <TextArea
                            title="Lời nhắn"
                            id="message"
                            placeholder="Con yêu mẹ"
                            required
                            value={state.message}
                            onChange={handleChangeMessage}
                        />
                    </>
                }

                button_element={
                    <>
                        <Button title="Tiếp tục" icon={<IoMdArrowForward />} type="submit" />
                    </>
                }
            >
            </Form>
        </>
    )
}