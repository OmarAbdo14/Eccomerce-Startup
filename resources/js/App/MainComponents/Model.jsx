import React, { useState } from 'react'

const Model = () => {
  const [open, setOpen] = useState(false)
  return (
    <Transition.Root show={open} as={Fragment}>
    <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={setOpen}>
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        {/* This element is to trick the browser into centering the modal contents. */}
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enterTo="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 translate-y-0 sm:scale-100"
          leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div className="inline-block align-middle bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:flex-col sm:items-start">
                <div className="mx-auto flex-shrink-0 flex w-full items-center justify-center  border border-blue-dark rounded-full hover:bg-blue-dark sm:mx-0">
                  <Link className="p-3 btn-outline text-blue-dark text-lg w-full text-center" to="">Show All Notifications</Link>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-4 sm:text-left">
                  <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                    Notifications
                  </Dialog.Title>

                  <div className="mt-6 flex flex-col-reverse gap-y-3">
                    <div className="notification-item flex flex-row items-center">
                      <UserCircleIcon className="h-20 w-1/4 text-gray-400 mr-2"/>
                      <div className="w-3/4">
                        <p className="text-gray-600">Omar Abdo Shared</p>
                        <span className="text-blue-300">from a day</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Transition.Child>
      </div>
    </Dialog>
  </Transition.Root>
  )
}

export default Model
