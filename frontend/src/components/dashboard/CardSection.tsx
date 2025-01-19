import { ReactNode } from "react";

interface CardSectionProps{
    children:ReactNode,
    title?: string
}
export default function CardSection({children, title}:CardSectionProps) {
    return (
        <section className="p-4 rounded-md bg-white shadow-md">
            {title && (
                <h3 className="text-2xl mb-6 font-semibold text-sky-900">{title}</h3>
            )}
           {children}
        </section>
    );
}
