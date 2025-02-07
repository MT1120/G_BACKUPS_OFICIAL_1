
import NavBar from '../components/NavBar'
import FormLogin from '../components/FormLogin'
import IMG from '../assets/bk.jpg'


export default function Login() {
  return (
    <div className='w-[100vw] h-[100vh] overflow-x-hidden relative'>
      <NavBar  />
      <div className='bg-[#f1f1f1] w-[100vw] h-screen flex items-center justify-center'>

        <div className='bg-white h-[90%] w-[80%] flex rounded-xl border-2 border-gray-200 shadow-2xl'>
          <div className='w-full flex items-center justify-center lg:w-1/2 '>
            <FormLogin route="/api/token/" method="login"/>
          </div>

          <div className='hidden lg:flex h-full w-1/2 items-center justify-center bg-gray-200'>
            <div className='flex items-center h-full w-full '>
              <img src={IMG} alt="/" className='rounded-r-xl h-full w-full' />
            </div>
          </div>
        </div>


      </div>
      {/* <form className='flex flex-col'></form> */}


    </div>
  )
}