import { ReactNode } from "react"

interface ContentLayoutProps{
    children: ReactNode,
    addClass?: string
}
export default function ContentLayout({children, addClass}:ContentLayoutProps){
    return <div className={`w-full max-w-[1170px] ${addClass}`}>{children}</div>
}