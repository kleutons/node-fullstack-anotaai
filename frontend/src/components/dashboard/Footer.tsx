import ContactDev from "../ContactDev";

export default function Footer(){
    return (
        <footer className="mt-10" >
            <div className='flex justify-between mx-10 py-8 pb-10 border-t border-slate-900/10'>
              <p>© 2025 <a href='https://kleuton.dev' className="text-blue-700 hover:underline">@Kleuton.dev</a> | Todos os direitos reservados.</p>
              <ContactDev />
            </div>
          </footer>
    )
}