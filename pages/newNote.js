import Link from "next/link"
import fetch from "isomorphic-unfetch"
import styles from "../styles/style.module.css"
import { Button, Form, Loader } from "semantic-ui-react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const NewNote = () => {
    const [form, setForm] = useState({ title: '', description: '' })
    const [isSubmitting, setIssubmitting] = useState(false)
    const [errors, setErrors] = useState({})
    const router = useRouter()

    useEffect(() => {
        if (isSubmitting) {
            if (Object.keys(errors).length === 0) {
                createNote();
                // alert("Success")
            }
            else {
                setIssubmitting(false);
            }
        }
    }, [errors])

    const createNote = async () => {
        try {
            const req = await fetch("http://localhost:3000/api/notes",{
                method: "POST",
                headers: {
                    "Accept" : "application/json",
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(form)
            })
            const res = await req.json()
            console.log(res)
            router.push("/");
        } catch (error) {
            console.log(error)
        }
    }

    const handelSubmit = (event) => {
        event.preventDefault();
        let errs = validate()
        setErrors(errs)
        setIssubmitting(true)
    }

    const handelChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    const validate = () => {
        let err = {}

        if (!form.title) {
            err.title = "Title is required";
            /*
            err[title] = "Title is required";
            we can write this as well , works the same way as above
            */
        }

        if (!form.description) {
            err.description = "Description is required";
        }

        return err;
    }

    return (
        <div className={styles.formContainer}>
            <h1 className={styles.h1}>Create Note</h1>
            <div>
                {isSubmitting ?
                    <Loader active inline="centered" />
                    : <Form onSubmit={handelSubmit}>
                        <Form.Input
                            fluid
                            // error={errors.title ? {
                            //     content:
                            //         "Please Enter a Titile",
                            //     pointing:
                            //         "below"
                            // } : null}
                            required
                            label="Title"
                            placeholder="Title"
                            name="title"
                            onChange={handelChange}
                        />
                        <Form.TextArea
                            fluid
                            // error={errors.description ? {
                            //     content:
                            //         "Please Enter a Description",
                            //     pointing:
                            //         "below"
                            // } : null}
                            required
                            label="Description"
                            placeholder="Description"
                            name="description"
                            onChange={handelChange}
                        />
                        <Button type="submit">Create</Button>
                    </Form>}
            </div>
        </div >
    )
}

export default NewNote;