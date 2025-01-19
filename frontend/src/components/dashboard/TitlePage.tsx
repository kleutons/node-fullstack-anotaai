interface TitlePageProps{
    text: string
}
export default function TitlePage({text}:TitlePageProps){
    return <h1 className="mb-6 inline-block text-3xl md:text-4xl font-extrabold text-sky-950 tracking-tight">
                {text}
            </h1>
}