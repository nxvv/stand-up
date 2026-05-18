export default function ModalContent({closeModal}) {


  return (
    <div className="fixed inset-0 bg-blue-50 flex justify-center items-center">
        <div className="relative bg-white font-medium p-10 rounded-md">
            Here is the content
            <button 
            onClick={closeModal}
            className="absolute top-2 text-white tracking-normal bg-blue-900 rounded-full border-none cursor-pointer px-2">
              x
            </button>
        </div>
    </div>
  )
}