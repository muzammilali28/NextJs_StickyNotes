import Link from "next/link";
import styles from "../styles/style.module.css"

const Navbar = () => (
    <nav className={styles.navbar}>
        <Link href="/">
            <a className={styles.navbarBrand}>Note App</a>
        </Link>
        <Link href="/newNote">
            <a className={styles.create}>Create Note</a>
        </Link>
    </nav>
)

export default Navbar