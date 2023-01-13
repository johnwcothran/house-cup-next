import styles from "../../styles/Book.module.css";

type Props = {
    children: JSX.Element
}
export const MainLayout: React.FC<Props> = ({children}) => {
    return (
        <main className={styles.main}>
            {children}
        </main>
    )
}