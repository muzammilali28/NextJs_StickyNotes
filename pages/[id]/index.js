import fetch from "isomorphic-unfetch"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Confirm, Button, Loader } from "semantic-ui-react"
import styles from "../../styles/style.module.css"

const Note = ({ note }) => {

    const [confirm, setConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (isDeleting) {
            deleteNote();
        }
    }, [isDeleting])

    /* Key -> Takeaway
    const {id} = router.query
    this can also gives us the dynamic route ID as the folder names is [ID]
    */
    const open = () => setConfirm(true)

    const close = () => setConfirm(false)

    const handelDelete = () => {
        setIsDeleting(true)
        close();
    }

    const deleteNote = async () => {
        const noteID = router.query.id;
        try {
            const deletedNote = await fetch(`http://localhost:3000/api/notes/${noteID}`, {
                method: "DELETE"
            });
            const res = await deletedNote.json();
            console.log(res);
            router.push("/")    //ForceFully redirect to Home Page after deletion
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={styles.notesContainer}>
            {isDeleting
                ? <Loader active />
                :
                <>
                    <h1 className={styles.h1}>{note.title}</h1>
                    <br/>
                    <p>{note.description}</p>
                    <Button color="red" onClick={open}>Delete</Button>
                </>
            }
            <Confirm
                open={confirm}
                onCancel={close}
                onConfirm={handelDelete}
            />
        </div>
    )
}

Note.getInitialProps = async (context) => {
    const { query: { id } } = context
    const res = await fetch(`http://localhost:3000/api/notes/${id}`)
    const { data } = await res.json();

    // console.log(id) // This will print the dynamic route's ID in the URL like LH:300/2 where 2 is the ID

    return { note: data }
}

export default Note;