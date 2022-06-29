import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { useFormik } from 'formik';
import { postProducersAPI } from '../APIS/API';
import { getProducers } from '../action/producers';
import { useDispatch } from "react-redux";


export default function ProdusersPopup() {
  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }


  const dispatch = useDispatch()

  const ProdusersPopup = useFormik({
    initialValues: {
      name: '',
      gender: '',
      dob: '',
      bio: '',
    },
    onSubmit: async values => {
      try {
        const respon = await postProducersAPI(values)
        console.log(respon)
        dispatch(getProducers())
      } catch (error) {
        console.log(error)
      }
    },
  });
  
  


  return (
    <>
      <div className="inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className=" text-[#fff] font-medium bg-[#ffffff3b] py-[12px] rounded-[5px] px-[50px] hover:bg-[#fff] hover:text-[#000]">
          Add New Producers
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full  items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-[60%]   transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="w-[80%]">
                <h1 className="text-[#000] text-[30px] font-medium">Add new Producers</h1>
                <p className="text-[#000] text-[20px] opacity-[0.50]">This week's top TV and movies</p>
                </div>


            <form onSubmit={ProdusersPopup.handleSubmit} > 


            <div className='grid grid-cols-1'>
            <label className="font-medium text-[15px] my-[15px]">Full Name</label>
            <input
              name="name"
              id="name"
              placeholder="Enter Name"
              onChange={ProdusersPopup.handleChange}
              value={ProdusersPopup.values.name}
              className="font-medium text-[15px] h-[50px] py-[10px] px-[20px] rounded-[5px]
            bg-[#ffffff1f] border-[#0000002e] text-[#000] border-2 focus:border-[#000] focus:outline-none"
            />
          </div>

          <div className='grid grid-cols-1 pt-[1em]'>
            <p className="font-medium text-[15px] mt-[15px] mb-[5px]">Gander</p>
            <div className='flex items-center gap-[4px] '>
                <input 
                name='gender'
                id='gender'
                type='radio'
                // value='male'
                onChange={(event)=>ProdusersPopup.setFieldValue('gender','Male')}
                value={ProdusersPopup.values.gender}
                className=" mx-[7px]" 
                />
                <label className="font-medium text-[15px] my-[8px] mr-[10px]">
                  Male
                </label>
                
                <input 
                name='gender'
                id='gender'
                type='radio'
                // value='Female'
                onChange={(event)=> ProdusersPopup.setFieldValue('gender','Female')}
                value={ProdusersPopup.values.gender} 
                className=" mx-[7px]" 
                />
                <label className="font-medium text-[15px] my-[8px]">Female</label>
            </div>
            </div>


          <div className='grid grid-cols-1'>
            <label className="font-medium text-[15px] my-[15px]">Date Of Birth</label>
            <input
              name="dob"
              id="dob"
              type="date"
              placeholder="Enter Date of Birth"
              onChange={ProdusersPopup.handleChange}
              value={ProdusersPopup.values.dob}
              className="font-medium text-[15px] h-[50px] py-[10px] px-[20px] rounded-[5px]
            bg-[#ffffff1f] border-[#0000002e] text-[#000] border-2 focus:border-[#000] focus:outline-none"
            />
          </div>


          <div className='grid grid-cols-1'>
            <label className="font-medium text-[15px] my-[15px]">Bio</label>
            <textarea
              name="bio"
              id="bio"
              placeholder="Enter Your bio"
              onChange={ProdusersPopup.handleChange}
              value={ProdusersPopup.values.bio}
              rows="6" 
              className="font-medium text-[15px] py-[10px] px-[20px] rounded-[5px]
            bg-[#ffffff1f] border-[#0000002e] text-[#000] border-2 focus:border-[#000] focus:outline-none"
            />
          </div>

         


          <div className='grid grid-cols-1 w-[50%] mt-[3em] text-center'>
            <button
              type="submit" 
             onClick={closeModal}  
             className="text-[#fff] font-medium bg-[#000] py-[12px] rounded-[5px] px-[50px] hover:opacity-[0.85]"
             >Submit</button>
          </div>


          </form> 

                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
