import Header from "./header";
import Form from "./form";
import Select from "@admin/components/select"
import Input from "@admin/components/input"
import Button from "@admin/components/button";

import { IoMdArrowForward } from "react-icons/io"

import { BankAccount, BankQRContextType } from "@admin/store/bankQR";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { BankQRContext } from "@admin/store/bankQR";
import { BankData, getBankBins } from "../utils";

export default function Setting1() {
  const navigate = useNavigate();
  const { state, changeAcc } = useContext(BankQRContext) as BankQRContextType;
  const [bankList, setBankList] = useState<BankData[]>([]);

  useEffect(() => {
    getBankBins().then((data) => {
      setBankList(data);
    })
  }, [])

  function handleNext(data: BankAccount) {
    console.log(data);
    navigate("/create/step2");
  }

  function handleBank(data: string) {
    changeAcc({
      name: state.account.name,
      number: state.account.number,
      bank: data,
      bank_short:
        bankList.filter((item) => item.bin === data)[0].shortName,
    })
  }

  function handleAccNumber(data: string) {
    changeAcc({
      name: state.account.name,
      number: data,
      bank: state.account.bank,
      bank_short: state.account.bank_short,
    })
  }

  function handleAccName(data: string) {
    changeAcc({
      name: data,
      number: state.account.number,
      bank: state.account.bank,
      bank_short: state.account.bank_short,
    });
  }

  return (
    <>
      <Header
        title="Thông tin tài khoản"
        subtitle="Tạo mã QR kèm lời chúc cho những người thân yêu"
      />

      <Form
        onSubmit={handleNext}
        input_component={
          <>
            <Select
              title="Ngân hàng"
              id="bank"
              placeholder="Chọn một ngân hàng"
              data={bankList.map(bank => ({ name: bank.name, value: bank.bin }))}
              value={state.account.bank}
              onChange={handleBank}
            />
            <Input
              title="Số tài khoản"
              type="number"
              id="number"
              placeholder="0123456789"
              required
              value={state.account.number}
              onChange={handleAccNumber}
            />
            <Input
              title="Chủ sở hữu"
              type="text"
              id="acc_name"
              placeholder="Trịnh Văn Mớt"
              required
              value={state.account.name}
              onChange={handleAccName}
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