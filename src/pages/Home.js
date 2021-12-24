import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState([]);
  const [user, setUser] = useState("");
  const [contact, setContact] = useState("");
  const [editUser, setEditUser] = useState("");
  const [editContact, setEditContact] = useState("");
  const [update, setUpdate] = useState([]);
  const [recherche, setRecherche] = useState("");

  useEffect(() => {
    select();
  }, []);

  const select = () => {
    axios.get("http://localhost:8082/").then((res) => {
      setData(res.data);
    });
  };

  const selectOne = (id) => {
    axios.get("http://localhost:8082/update/" + id).then((res) => {
      setEditUser(res.data.user);
      setEditContact(res.data.contact);
    });
  };

  const search = (id) => {
    if (recherche.length > 0) {
      axios.post("http://localhost:8082/", { recherche }).then((res) => {
        setData(res.data);
      });
    } else {
      select();
    }
  };

  const updated = (id) => {
    const data = {
      editUser,
      editContact,
    };

    axios
      .put("http://localhost:8082/" + id, {
        user: editUser,
        contact: editContact,
      })
      .then((res) => {
        console.log(res.data);
        select();
      });
  };

  const supp = (id) => {
    axios.delete("http://localhost:8082/" + id).then(() => {
      select();
    });
  };

  const create = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8082/register", {
        user,
        contact,
      })
      .then((res) => {
        console.log("yes");
        //   setError(false);
        setUser("");
        setContact("");
        select();
      });
  };

  return (
    <div style={{ margin: "100px 20px 20px 20px" }}>
      <div className="row">
        <div className="col-lg-4 col-md-12 col-sm-12">
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop1"
          >
            Ajouter
          </button>

          <div
            className="modal fade"
            id="staticBackdrop1"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="staticBackdropLabel">
                    Ajout
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form method="post" onSubmit={(e) => create(e)}>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputEmail1"
                        className="form-label"
                      >
                        User
                      </label>
                      <input
                        value={user}
                        type="text"
                        name="user"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        onChange={(e) => setUser(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputPassword1"
                        className="form-label"
                      >
                        Contact
                      </label>
                      <input
                        value={contact}
                        name="contact"
                        type="tel"
                        className="form-control"
                        id="exampleInputPassword1"
                        onChange={(e) => setContact(e.target.value)}
                      />
                    </div>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close{" "}
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Ajouter
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-12 col-sm-12"></div>
        <div className="col-lg-4 col-md-12 col-sm-12">
          {/* <form method="post" action="" onSubmit={(e) => search(e)}> */}
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Recipient's username"
              aria-label="Recipient's username"
              aria-describedby="button-addon2"
              onChange={(e) => setRecherche(e.target.value)}
            />
            <button
              className="btn btn-outline-secondary"
              type="submit"
              id="button-addon2"
              onClick={() => {
                search();
              }}
            >
              Button
            </button>
          </div>
          {/* </form> */}
        </div>
      </div>
      <table className="table ">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">USER</th>
            <th scope="col">CONTACT</th>
            <th scope="col">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user._id}>
              <th scope="row">{user._id}</th>
              <td>{user.user}</td>
              <td>{user.contact}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                  onClick={() => {
                    selectOne(user._id);
                  }}
                >
                  Modifier
                </button>

                <div
                  className="modal fade"
                  id="staticBackdrop"
                  data-bs-backdrop="static"
                  data-bs-keyboard="false"
                  tabIndex="-1"
                  aria-labelledby="staticBackdropLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">
                          Modal title
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        {/* <form method="post" onSubmit={(e) => updated(e)}> */}
                        <div className="mb-3">
                          <label
                            htmlFor="exampleInputEmail1"
                            className="form-label"
                          >
                            User
                          </label>
                          <input
                            autoFocus
                            type="text"
                            name="user"
                            defaultValue={editUser}
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            onChange={(e) => setEditUser(e.target.value)}
                          />
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="exampleInputPassword1"
                            className="form-label"
                          >
                            Contact
                          </label>
                          <input
                            autoFocus
                            name="contact"
                            defaultValue={editContact}
                            type="tel"
                            className="form-control"
                            id="exampleInputPassword1"
                            onChange={(e) => setEditContact(e.target.value)}
                          />
                        </div>
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close{" "}
                        </button>
                        <button
                          type="submit"
                          className="btn btn-primary"
                          onClick={() => {
                            updated(user._id);
                          }}
                        >
                          Ajouter
                        </button>
                        {/* </form> */}
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  style={{ marginLeft: "20px" }}
                  type="button"
                  className="btn btn-danger"
                  onClick={() => {
                    if (window.confirm("Voulez-vous supprimer cet article ?")) {
                      supp(user._id);
                    }
                  }}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
