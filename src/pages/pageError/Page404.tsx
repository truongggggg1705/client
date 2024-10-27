import styles from './page404.module.scss'
import { Ghost } from 'lucide-react'
export default function Page404() {
  return (
    <main className={styles.container}>
      <h1>
        4
        <span>
          <i>
            <Ghost size={180} color='#eb4f11'/>
          </i>
        </span>
        4
      </h1>
      <h2>Error: 404 page not found</h2>
      <p>Sorry, the page you're looking for cannot be accessed</p>
    </main>
  )
}
