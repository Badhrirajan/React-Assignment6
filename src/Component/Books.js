import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";

const initialValues = {
  booktitle: "",
  authorname: "",
  isbn: "",
  date: "",
};

export default function Books() {
  const [Books, setBooks] = useState([]);
  const [editing, setEditing] = useState(null);

  const validate = (values => {
    let errors = {}
          if(!values.booktitle) {
            errors.booktitle = 'Required!!'
          }
          if(!values.authorname){
            errors.authorname = 'Required!!'
          }
          return errors
  })

  const addBook = (book) => {
    setBooks([...Books, book]);
  };

  const editBook = (booktitle) => {
    const bookToEdit = Books.find((book) => book.booktitle === booktitle);
    if (bookToEdit) {
      setEditing(booktitle);
      initialValues.booktitle = bookToEdit.booktitle;
      initialValues.authorname = bookToEdit.authorname;
      initialValues.isbn = bookToEdit.isbn;
      initialValues.date = bookToEdit.date;
    }
  };

  const updateBook = (updatedBook) => {
    setBooks(
      Books.map((book) => (book.booktitle === updatedBook.booktitle ? updatedBook : book))
    );
    setEditing(null);
  };

  const deleteBook = (booktitle) => {
    setBooks(Books.filter((book) => book.booktitle !== booktitle));
  };

  return (
    <div>
      <div className="container mt-3">
        <div className="container-fluid">
          <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={(values, { resetForm }) => {
              if (editing) {
                updateBook(values);
                resetForm()
              } else {
                addBook(values);
              }
              resetForm();
            }}
          >
              <Form>
                <div
                  className="row card text-bg-light mb-3"
                  style={{ width: "100%" }}
                >
                  <div class="card-header">Enter Your Book Details Here</div>
                  <div class="card-body">
                    <div>
                      <label htmlFor="booktitle">Book Title</label>
                      <Field
                        type="text"
                        id="booktitle"
                        name="booktitle"
                        placeholder="Enter Book Title"
                      />
                      <div className="error">
                        <ErrorMessage name="booktitle" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="authorname">Author Name</label>
                      <Field
                        type="text"
                        id="authorname"
                        name="authorname"
                        placeholder="Enter Author Name"
                      />
                      <div className="error">
                        <ErrorMessage name="authorname" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="isbn">ISBN Number</label>
                      <Field
                        type="text"
                        id="isbn"
                        name="isbn"
                        placeholder="Enter ISBN Number"
                      />
                    </div>
                    <div>
                      <label htmlFor="date">PublishedDate</label>
                      <Field type="date" id="date" name="date" />
                    </div>
                    <div class="d-grid gap-2 d-md-block">
                      <button class="btn btn-primary" type="submit">
                      {editing ? "Update Book" : "Add Book"}
                     </button>
                    </div>
                  </div>
                </div>
              </Form>
          </Formik>
        </div>
      </div>
      <div className="container">
        <div className="container-fluid">
        <table className="table table-dark table-hover table-bordered border-primary mt-3">
                <thead>
                    <tr>
                      <th scope="col">Title</th>
                      <th scope="col">Author Name</th>
                      <th scope="col">ISBN</th>
                      <th scope="col">PublishedDate</th>
                      <th scope='col'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    Books.map((d,i) => (
                    <tr key={`Books-list-${i}`}>
                        <td>{d.booktitle}</td>
                        <td>{d.authorname}</td>
                        <td>{d.isbn}</td>
                        <td>{d.date}</td>
                        <td><button className='btn btn-primary' onClick={() => editBook(d.booktitle)}>Edit</button>
                        <button className='btn btn-danger mx-1' onClick={() => deleteBook(d.booktitle)}>Delete</button></td>
                        </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    </div>
    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
      <Link to='/author'>
      <button class="btn btn-primary me-md-2" type="button">Click here to add author details!!</button>
      </Link>
      </div>
  </div>
  );
}
