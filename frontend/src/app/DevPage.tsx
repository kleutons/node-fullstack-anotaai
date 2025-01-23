import ContactDev from "../components/ContactDev";
import CardSection from "../components/dashboard/CardSection";
import TitlePage from "../components/dashboard/TitlePage";


export default function DevPage(){
    console.log('teste');
    return (
        <>
            <TitlePage text="Desenvolvedor" />
            <CardSection title="Sobre:">
                <p className="mb-4">
                    Olá! Eu me chamo Cleuton Novais, também conhecido como Kleuton. Sou programador e entusiasta de tecnologia, sempre em busca de aprimorar minhas habilidades e compartilhar conhecimentos.
                </p>
                <h2 className="text-2xl font-bold mb-2">Projeto FullStack para o Desafio do AnotaAI</h2>
                <p className="mb-4">
                    Este site foi desenvolvido como parte do desafio proposto pelo AnotaAI. Ressalto que ele não possui nenhuma afiliação com o AnotaAI ou o iFood. O objetivo principal é melhorar minhas habilidades em programação web.
                </p>
                <h3 className="text-xl font-semibold mb-2">Tecnologias Utilizadas:</h3>
                <ul className="list-disc list-inside mb-4">
                    <li><strong>FrontEnd:</strong> React, JavaScript com TypeScript e TailwindCSS</li>
                    <li><strong>BackEnd:</strong> Node.js com TypeScript, Express</li>
                    <li><strong>Banco de Dados:</strong> MongoDB</li>
                </ul>
                <h3 className="text-xl font-semibold mb-2">Contato / Links:</h3>

                <ContactDev />
                
            </CardSection>
        </>
    )
}
