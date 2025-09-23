export default function Main({ classname, children }) {

    return (
        <main className={`main ${classname}`}>
            {children}
        </main>
    );
}