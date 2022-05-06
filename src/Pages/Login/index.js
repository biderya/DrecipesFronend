import React, { Component } from "react";
import axios from "../../axios";
import { Redirect } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import Cooking from "../../assets/cooking.jpg";

export default class Login extends Component {
  state = {
    email: null,
    password: null,
    error: null,
    loading: false,
    isLoggedIn: false,
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
      .post("users/login", {
        email: this.state.email,
        password: this.state.password,
      })
      .then((result) => {
        this.setState({ loading: false });
        this.props.onLogin(result.data.token, result.data.user._id);
        this.setState({ isLoggedIn: true });
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
        {this.state.isLoggedIn && <Redirect to="/" />}
        {this.state.loading && (
          <div
            className="d-flex justify-content-center"
            style={{ marginTop: 20 }}
          >
            Та түр хүлээнэ үү <Spinner animation="border" />
          </div>
        )}
        {/* <UserProfile id={this.state.id} /> */}
        {/* <div class="row" style={{ marginTop: 50 }}>
          <div class="col-md-4"></div>
          <div class="col-md-4 bg-light">
            <div class="login align-items-center py-5">
              <div class="container">
                <div class="row">
                  <div class="col-lg-10 col-xl-10 mx-auto">
                    <h1 class="display-5">Нэвтрэх хуудас</h1>
                    <p class="text-muted mb-4"></p>
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
                        Нэвтрэх
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        <section className="relative pt-8 md:py-16 bg-white">
          <div className="container">
            <div className="w-full md:w-3/5 lg:w-1/2">
              <div className="max-w-sm mx-auto">
                <div className="mb-6 text-center">
                  <h3 className="mb-4 text-2xl md:text-3xl font-bold">
                    Нэвтрэх хуудас
                  </h3>
                  <p className="text-lg text-coolGray-500 font-medium">
                    Та и-мэйл хаяг болон нууц үгээ оруулна уу
                  </p>
                </div>
                <div className="mb-6">
                  <label
                    className="block mb-2 text-coolGray-800 font-medium"
                    htmlFor=""
                  >
                    И-Мэйл хаяг
                  </label>
                  <input
                    className="appearance-none block w-full p-3 leading-5 text-coolGray-900 border border-coolGray-200 rounded-lg shadow-md placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    type="text"
                    name="email"
                    placeholder="И-мэйл хаяг"
                    onChange={this.handleType}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block mb-2 text-coolGray-800 font-medium"
                    htmlFor=""
                  >
                    Нууц үг
                  </label>
                  <input
                    className="appearance-none block w-full p-3 leading-5 text-coolGray-900 border border-coolGray-200 rounded-lg shadow-md placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    type="password"
                    name="password"
                    placeholder="Нууц үг"
                    onChange={this.handleType}
                  />
                </div>
                <div className="flex flex-wrap items-center justify-between mb-6">
                  {/* <div className="w-full md:w-1/2">
                      <label className="relative inline-flex items-center">
                        <input
                          className="form-checkbox appearance-none"
                          type="checkbox"
                        />
                        <img
                          className="absolute top-1/2 transform -translate-y-1/2 left-0"
                          src="flex-ui-assets/elements/sign-up/checkbox-icon.svg"
                          alt=""
                        />
                        <span className="ml-7 text-xs text-coolGray-800 font-medium">
                          Remember me
                        </span>
                      </label>
                    </div> */}
                  {/* <div className="w-full md:w-auto mt-1">
                      <a
                        className="inline-block text-xs font-medium text-blue-500 hover:text-blue-600"
                        href="#"
                      >
                        Forgot your password?
                      </a>
                    </div> */}
                </div>
                <button
                  type="submit"
                  onClick={this.handleClick}
                  className="inline-block py-3 px-7 mb-6 w-full text-base text-blue-50 font-medium text-center leading-6 bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md shadow-sm"
                >
                  Нэвтрэх
                </button>

                <p className="text-center">
                  <span className="text-xs font-medium">
                    Та бүртгэлгүй бол?{" "}
                  </span>
                  <a
                    className="inline-block text-xs font-medium text-blue-500 hover:text-blue-600 hover:underline"
                    href="#"
                  >
                    Бүртгүүлэх
                  </a>
                </p>
              </div>
            </div>
          </div>
          <img
            className="md:absolute md:top-10 md:right-10 mx-auto md:h-3/4 md:w-2/4 lg:w-2/4 md:object-cover"
            src={Cooking}
            alt=""
          />
        </section>
      </div>
    );
  }
}
