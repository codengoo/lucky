import { useNavigate } from "react-router-dom"
import Form from "./form"
import Header from "./header"
import Input from "@admin/components/input"
import { useContext, useEffect, useState } from "react"
import { BankQRContext, BankQRContextType } from "@admin/store/bankQR"
import SelectImage from "@admin/components/select_image"
import Button from "@admin/components/button"
import { IoMdArrowForward, IoMdArrowBack } from "react-icons/io"
import Chip from "@admin/components/chip"

export default function Setting2() {
  const navigate = useNavigate();
  const { state, changeWish, changeImage } = useContext(BankQRContext) as BankQRContextType;
  const [imageList, setImageList] = useState<{ name: string, value: string }[]>([]);
  const [wishList, setWishList] = useState<{ name: string, value: string }[]>([]);

  function handleNext(data: any) {
    console.log(data);
    navigate("/create/step3");
  }

  function handleWish(data: string) {
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
      { value: "images/preview_3.png", name: "3" }
    ])
    setWishList([
      { value: "1", name: "1" },
      { value: "2", name: "2" },
      { value: "3", name: "3" },
      { value: "4", name: "4" }
    ]);
  }, [])

  return (
    <>
      <Header
        title="Phong bao"
        subtitle="Tạo mã QR kèm lời chúc cho những người thân yêu"
      />

      <Form
        onSubmit={handleNext}
        input_component={
          <>
            <Input
              title="Lời chúc"
              type="text"
              id="wish"
              placeholder="Chúc mừng bạn"
              required
              value={state.wish}
              onChange={handleWish}
            />

            <Chip value="1" data={wishList} />

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
            <Button onClick={backStep} styleBtn="Alternative" icon_center={<IoMdArrowBack />} />
            <Button title="Tiếp tục" icon={<IoMdArrowForward />} type="submit" />
          </>
        }>
      </Form>
    </>
  )
}