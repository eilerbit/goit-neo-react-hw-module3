import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { nanoid } from 'nanoid';
import styles from './ContactForm.module.css';

const initialValues = {
  name: "",
  number: ""
};

const validationSchema = Yup.object({
    name: Yup.string().min(3).max(50).required('Name is required'),
    number: Yup.string()
      .matches(/^\+?[0-9\s()-]+$/, 'Invalid phone number format')
      .required('Telephone number is required'),
  });

const ContactForm = ({ onAdd }) => {

  const handleSubmit = (values, { resetForm }) => {
    const newContact = { id: nanoid(), ...values };
    onAdd(newContact);
    resetForm();
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        <Form className={styles.form}>
	    <label>
          Name
          <Field name="name" type="text" />
          <ErrorMessage name="name" component="div" className={styles.error} />
        </label>
        <label>
          Number
          <Field name="number" type="tel" />
          <ErrorMessage name="number" component="div" className={styles.error} />
        </label>
            <button className={styles.addButton} type="submit">Add contact</button>
        </Form>
    </Formik>
  );
};

export default ContactForm;