import Link from "next/link"
import fetch from "isomorphic-unfetch"
import { Button, Card } from "semantic-ui-react"
import styles from "../styles/style.module.css"

const Index = ({ notes }) => {
  return (
    <div className={styles.notesContainer}>
      <h1 className={styles.h1}>Notes</h1>
      <div className={`${styles.wrapper} ${styles.grid}`}>
        {/* {console.log(notes)} */}
        {notes.length <= 0
          ? <h2 className={styles.h2}><u>No Notes to Display!</u></h2>
          : notes.map((note) => {
        return (
        <div key={note._id}>
          <Card>
            <Card.Content>
              <Card.Header>
                <Link href={`/${note._id}`}>
                  <a>{note.title}</a>
                </Link>
              </Card.Header>
            </Card.Content>
            <Card.Content extra>
              <Link href={`/${note._id}`}>
                <Button primary>View</Button>
              </Link>
              <Link href={`/${note._id}/edit`}>
                <Button primary>Edit</Button>
              </Link>
            </Card.Content>
          </Card>
        </div>
        )
      })}
      </div>
    </div>
  )
}

Index.getInitialProps = async () => {
  const res = await fetch("http://localhost:3000/api/notes", {
    method: "GET"
  });
  const { data } = await res.json();

  return { notes: data };
}

export default Index;