import { FormEvent, ReactNode, useRef } from "react"


interface IProps {
  onSubmit: (data: any) => void,
  input_component: ReactNode,
  button_element: ReactNode
}

export default function Form({ onSubmit, input_component, button_element }: IProps) {
  const form_feed = useRef<HTMLFormElement>(null)

  function getFormData() {
    const formData = new FormData(form_feed.current as HTMLFormElement);
    let data = Object.fromEntries(formData.entries()) as Object;

    return data;
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();
    
    onSubmit && onSubmit(getFormData());
  }

  return (
    <form
      className="flex flex-col justify-between h-full pt-8 overflow-hidden"
      ref={form_feed}
      onSubmit={handleSubmit}
    >
      <div className="h-full flex flex-col overflow-scroll px-1">
        {input_component}
      </div>

      <div className="flex justify-end gap-2 flex-none">
        {button_element}
      </div>
    </form >
  )
}
