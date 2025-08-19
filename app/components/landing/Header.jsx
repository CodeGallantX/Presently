// import Link from "next/navigation"

const Header = () => {
  return (
    <header className="flex flex-row items-center justify-between mx-auto max-w-[80%] rounded-full py-3 px-3 mt-3 border border-gray-300 bg-white/30 backdrop-blur-md">
      <h1 className="font-bold text-xl">Presently</h1>
      <nav className="flex items-center justify-center hidden md:block">
        <ul className="flex flex-row space-x-6">
            <li><a href="#features">Features</a></li>
            <li><a href="#testimonials">Testimonials</a></li>
            <li><a href="#pricing">Pricing</a></li>
        </ul>
        </nav>
        <button className="px-4 py-3 rounded-full bg-black text-white cursor-pointer">
            Get free trial
            </button>
    </header>
  )
}

export default Header
