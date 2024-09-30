import { useRouter } from "next/navigation";
import { MdError } from "react-icons/md";

export const ErrorModal = ({ message, onClose }) => {
    const router=useRouter()
    const handleGoBack = () => {
        onClose();
        router.push("/")
    };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md mx-4 sm:mx-8 lg:max-w-lg lg:mx-16">
        <h2 className="text-lg font-semibold mb-4 text-center">An Error Occurred</h2>
        <p className="mb-6 text-center flex gap-2 justify-center items-center italic w-full"><MdError className='text-3xl text-red-400'/>{message}</p>
        <div className="flex flex-col sm:flex-row justify-center gap-2">
          <button
            onClick={handleGoBack}
            className="bg-gray-300 px-4 py-2 rounded-md w-full sm:w-auto"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};