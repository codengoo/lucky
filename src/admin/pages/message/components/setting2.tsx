import Button from "@admin/components/button";
import Form from "@admin/components/form";
import Header from "@admin/components/header";
import SelectImage from "@admin/components/select_image";
import { MessageContext, MessageContextType } from "@admin/store/message";
import { useContext, useEffect, useState } from "react";
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export default function Setting2() {
    const navigate = useNavigate();
    const { state, changeImage, changeLink } = useContext(MessageContext) as MessageContextType;
    const [imageList, setImageList] = useState<{ name: string, value: string }[]>([]);

    function handleNext() {
        navigate("/message/create/step3");
    }

    function handleBack() {
        navigate("/message/create");
    }

    function handleImage(data: string) {
        changeImage(data);
    }

    useEffect(() => {
        setImageList([
            { value: "images/preview.png", name: "1" },
            { value: "images/preview_2.png", name: "2" },
        ])
    }, [])

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
                        <SelectImage
                            onChange={handleImage}
                            data={imageList}
                            value={state.image}
                            title="Chọn mẫu"
                            id="image"
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