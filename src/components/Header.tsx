import Link from 'next/link';
import { useRouter } from 'next/router';
import { isAuthenticated, removeAuthToken } from '@/utils/authHelper';
import styles from '@/styles/Header.module.css';

export default function Header() {
  const router = useRouter();
  const authenticated = isAuthenticated();

  const handleLogout = () => {
    removeAuthToken();
    router.push('/login');
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.container}>
          <div className="flex items-center">
            <Link href="/" className={styles.logo}>
              Warhammer Community
            </Link>
          </div>
          
          <div className={styles.menu}>
            {authenticated ? (
              <>
                <Link href="/admin" className={styles.link}>
                  Admin
                </Link>
                <button
                  onClick={handleLogout}
                  className={styles.button}
                >
                  Logout
                </button>
              </>
            ) : (
              <Link href="/login" className={styles.link}>
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}