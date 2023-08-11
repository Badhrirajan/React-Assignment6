import React,{useState} from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";

const initialValues = {
  authorname: "",
  authorbio: "",
  date: "",
};

export default function Authors() {
    const [Authors, setAuthors] = useState([]);
    const [editing, setEditing] = useState(null);

    const validate = (values => {
        let errors = {}
              if(!values.authorname) {
                errors.authorname = 'Required!!'
              }
              if(!values.authorbio){
                errors.authorbio = 'Required!!'
              }
              return errors
      })

      const addauthor = (author) => {
        setAuthors([...Authors, author]);
      };
    
      const editauthor = (authorname) => {
        const authorToEdit = Authors.find((author) => author.authorname === authorname);
        if (authorToEdit) {
          setEditing(authorname);
          initialValues.authorname = authorToEdit.authorname;
          initialValues.authorbio = authorToEdit.authorbio;
          initialValues.date = authorToEdit.date;
        }
      };
    
      const updateauthor = (updatedauthor) => {
        setAuthors(
          Authors.map((author) => (author.authorname === updatedauthor.authorname ? updatedauthor : author))
        );
        setEditing(null);
        
      };
    
      const deleteauthor = (authorname) => {
        setAuthors(Authors.filter((author) => author.authorname !== authorname));
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
                updateauthor(values);
              } else {
                addauthor(values);
              }
              resetForm();
            }}
          >
              <Form>
                <div
                  className="row card text-bg-light mb-3"
                  style={{ width: "100%" }}
                >
                  <div class="card-header">Enter Your author Details Here</div>
                  <div class="card-body">
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
                      <label htmlFor="authorbio">Author Bio</label>
                      <Field
                        type="text"
                        id="authorbio"
                        name="authorbio"
                        placeholder="Enter Author Bio"
                      />
                      <div className="error">
                        <ErrorMessage name="authorbio" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="date">DateOfBirth</label>
                      <Field type="date" id="date" name="date" />
                    </div>
                    <div class="d-grid gap-2 d-md-block">
                      <button class="btn btn-primary" type="submit">
                      {editing ? "Update author" : "Add author"}
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
                      <th scope="col">Author Name</th>
                      <th scope="col">Author Bio</th>
                      <th scope="col">DateOfBirth</th>
                      <th scope='col'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    Authors.map((d,i) => (
                    <tr key={`Authors-list-${i}`}>
                        <td>{d.authorname}</td>
                        <td>{d.authorbio}</td>
                        <td>{d.date}</td>
                        <td><button className='btn btn-primary' onClick={() => editauthor(d.authorname)}>Edit</button>
                        <button className='btn btn-danger mx-1' onClick={() => deleteauthor(d.authorname)}>Delete</button></td>
                        </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    </div>
    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
      <Link to='/'>
      <button class="btn btn-success me-md-2" type="button">Click here to add book details!!</button>
      </Link>
      </div>
  </div>
  );
}
