import React, { Component } from "react";
import axios from "../../axios";
import { Redirect } from "react-router-dom";
import { Spinner } from "react-bootstrap";

export default class Register extends Component {
  state = {
    name: null,
    email: null,
    password: null,
    error: null,
    loading: false,
  };

  handleType = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
      error: null,
    });
  };

  handleClick = () => {
    this.setState({ loading: true });
    axios
      .post("users/register", {
        email: this.state.email,
        password: this.state.password,
        name: this.state.name,
        role: "user",
      })
      .then((result) => {
        this.setState({ loading: false });
        // this.props.id(result.data.user._id);
        // console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk", result.data.user);
      })
      .catch((err) =>
        this.setState({
          loading: false,
          error: err.response.data.error.message,
        })
      );
  };

  render() {
    return (
      <div>
        {/* {document.cookie && <Redirect to="/" />} */}
        {this.state.loading && (
          <div
            className="d-flex justify-content-center"
            style={{ marginTop: 20 }}
          >
            Та түр хүлээнэ үү <Spinner animation="border" />
          </div>
        )}
        {/* <UserProfile id={this.state.id} /> */}
        <div class="row" style={{ marginTop: 50 }}>
          <div class="col-md-4"></div>
          <div class="col-md-4 bg-light">
            <div class="login align-items-center py-5">
              <div class="container">
                <div class="row">
                  <div class="col-lg-10 col-xl-10 mx-auto">
                    <h1 class="display-5">Бүртгүүлэх хуудас</h1>
                    <p class="text-muted mb-4"></p>
                    <div class="mb-4">
                      <input
                        type="text"
                        name="name"
                        placeholder="Нэрээ оруулна уу"
                        onChange={this.handleType}
                        class="form-control rounded-pill border-0 shadow-sm px-4"
                      />
                    </div>
                    <div class="mb-4">
                      <input
                        type="text"
                        name="email"
                        placeholder="И-мэйл хаяг"
                        onChange={this.handleType}
                        class="form-control rounded-pill border-0 shadow-sm px-4"
                      />
                    </div>
                    <div class="mb-4">
                      <input
                        type="password"
                        name="password"
                        placeholder="Нууц үг"
                        onChange={this.handleType}
                        class="form-control rounded-pill border-0 shadow-sm px-4 text-primary"
                      />
                    </div>
                    <div class="d-grid gap-2 mt-2">
                      <button
                        type="submit"
                        onClick={this.handleClick}
                        class="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm"
                      >
                        Бүртгүүлэх
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
