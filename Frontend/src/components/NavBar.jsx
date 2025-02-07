import Logo from '../assets/LOGO.png'

export default function NavBar() {
  return (
    <header className='bg-white   w-screen h-[4.7rem] sticky'>
      <div className='flex flex-row relative items-center'>

        <div className='bg-gradient-to-r from-[#151980] from-20% via-[#1c21af] to-emerald-500 to-90% rounded-br-full  lg:w-[75%] md:w-[70%] sm:w-[60%] h-[4.7rem] flex items-center'>
          <h2 className='flex w-full justify-center md:text-xl text-lg font-bold   text-white uppercase '>Sistema de Gestión de Backups</h2>
        </div>

        <img className='p-1 justify-end absolute right-10  ' src={Logo} alt="/" />
      </div>
    </header>
  )
}
