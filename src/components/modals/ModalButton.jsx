import { useState } from "react"
import { createPortal } from "react-dom"
import ModalContent from "./ModalContent"

export default function ModalButton() {
    const [showModal, setShowModal] = useState(false)

  return (
    <>
        <button 
        onClick={() => setShowModal(true)} 
        className="block mx-auto bg-blue-900 font-medium text-blue-100 px-5 py-3 rounded-3xl border-none cursor-pointer"
        >
            Commencer
        </button>
        {showModal && createPortal(<ModalContent  />, document.body)}
    </>
  )
}