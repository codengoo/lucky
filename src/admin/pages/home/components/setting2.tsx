import { useNavigate } from "react-router-dom"
import Form from "./form"
import Header from "./header"
import Input from "@admin/components/input"
import { useContext, useEffect, useState } from "react"
import { BankQRContext, BankQRContextType } from "src/store/bankQR"
import SelectImage from "@admin/components/select_image"
import Button from "@admin/components/button"
import { IoMdArrowForward, IoMdArrowBack } from "react-icons/io"

export default function Setting2() {
  const navigate = useNavigate();
  const { state, changeWish, changeImage } = useContext(BankQRContext) as BankQRContextType;
  const [imageList, setImageList] = useState<{ name: string, value: string }[]>([]);

  function handleNext(data: any) {
    console.log(data);
    navigate("/create/step3");
  }

  function handleWish(data: string) {
    console.log(data);
    changeWish(data);
  }

  function handleImage(data: string) {
    console.log(data);
    changeImage(data);
  }

  function backStep() {
    navigate("/create");
  }

  useEffect(() => {
    setImageList([
      { value: "images/preview.png", name: "1" },
      { value: "images/preview_2.png", name: "2" },
      { value: "images/preview_3.png", name: "3" },
      { value: "images/preview_4.png", name: "4" },
    ])
  })

  return (
    <div>
      <Header
        title="Phong bao"
        subtitle="Tạo mã QR kèm lời chúc cho những người thân yêu"
      />

      <div className="pt-8 h-full">
        <Form
          onSubmit={handleNext}
          input_component={
            <div>
              <Input
                title="Lời chúc"
                type="text"
                id="wish"
                placeholder="Chúc mừng bạn"
                required
                value={state.wish}
                onChange={handleWish}
              />

              <SelectImage
                onChange={handleImage}
                data={imageList}
                value={state.image}
                title="Chọn mẫu"
                id="image"
              />
            </div>
          }

          button_element={
            <div>
              <Button onClick={backStep} styleBtn="Alternative" icon_center={<IoMdArrowBack />} />
              <Button title="Tiếp tục" icon={<IoMdArrowForward />} type="submit" />
            </div>
          }>
        </Form>
      </div>
    </div>
  )
}