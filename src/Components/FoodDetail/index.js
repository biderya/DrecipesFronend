import React, { Component } from "react";
import axios from "../../axios";
import MyLayout from "../MyLayout";

import Alert from "react-bootstrap/Alert";
import { HeartIcon, ShoppingBagIcon } from "@heroicons/react/solid";

export default class FoodDetail extends Component {
  state = {
    name: null,
    photo: null,
    author: null,
    rating: null,
    content: null,
    steps: null,
    calorie: null,
    bestseller: false,
    success: null,
    deleted: null,
    loading: false,
    ingredients: null,
  };

  handleType = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
      error: null,
      success: null,
    });
  };

  goBack = () => {
    this.props.history.goBack();
  };

  componentDidMount() {
    this.setState({ loading: true });
    axios
      .get("foods/" + this.props.match.params.id)
      .then((result) =>
        this.setState({ ...result.data.data, error: null, loading: false })
      )
      .catch((err) =>
        this.setState({ error: err.response.error.message, loading: false })
      );
  }

  handleSave = () => {
    // const token = localStorage.getItem("token");
    this.setState({ loading: true, success: null });
    axios
      .put("foods/" + this.props.match.params.id, {
        name: this.state.name,
        photo: this.state.photo,
        author: this.state.author,
        rating: this.state.rating,
        content: this.state.content,
        steps: this.state.steps,
        calorie: this.state.calorie,
      })
      .then((result) => {
        console.log(result);
        this.setState({
          ...result.data.data,
          error: null,
          loading: false,
          success: "Амжилттай хадгалагдлаа",
        });
      })
      .catch((err) => {
        this.setState({
          error: err.response.data.error.message,
          loading: false,
        });
      });
  };

  handleDelete = () => {
    // const token = localStorage.getItem("token");
    this.setState({ loading: true, success: null });
    axios
      .delete("foods/" + this.props.match.params.id)
      .then((result) => {
        this.setState({
          deleted: true,
        });
      })
      .catch((err) => {
        this.setState({
          error: err.response.data.error.message,
          loading: false,
        });
      });
  };
  starsNumber = Math.floor(this.state.rating);
  isHalfStar = !Number.isInteger(this.state.rating);
  emptyStars = 5 - Math.ceil(this.state.rating);

  render() {
    if (this.state.deleted) {
      return <div>Хоол амжилттай устгагдлаа</div>;
    }

    return (
      <MyLayout>
        {this.state.error && <div>{this.state.error}</div>}

        {this.state.success && (
          <div>
            <Alert
              variant="success"
              style={{
                width: "22rem",
              }}
            >
              <Alert.Heading>{this.state.success}</Alert.Heading>
            </Alert>
          </div>
        )}
        <div className="mx-auto px-4 w-full max-w-7xl bg-white text-gray-700">
          <div className="flex flex-col lg:flex-row">
            <div className="py-8 w-full lg:w-1/2 flex flex-col items-center">
              <img
                src={`http://localhost:8000/upload/${this.state.photo}`}
                className="w-full h-full"
              />
              <span className="self-start ml-10">
                <button className="text-gray-300 hover:text-red-500">
                  <HeartIcon className="w-10 h-10" />
                </button>
              </span>
            </div>

            {/* :PRODUCT DETAILS */}
            <div className="lg:py-8 w-full lg:w-1/2 flex flex-col lg:border-l-2 border-gray-200">
              {/* ::Description Container */}
              <div className="order-3 lg:order-1 pb-5 sm:px-6 lg:border-b-2 border-gray-200">
                {/* :::Name */}
                <h1 className="hidden lg:block text-4xl text-gray-700 font-light tracking-wide">
                  {this.state.name}
                </h1>
                {/* :::Description */}
                <p className="mt-10 text-base text-gray-500">
                  {this.state.content}
                </p>
                <ul className="my-5 flex flex-col space-y-2">
                  <li className="inline-flex items-center space-x-2 text-gray-500">
                    <span className="text-sm font-semibold">
                      {this.state.ingredients}
                    </span>
                  </li>
                </ul>
              </div>

              {/* ::Customization Container */}
              <div className="order-1 lg:order-2 py-8 sm:px-6 border-b-2 border-gray-200">
                {/* :::Name */}
                <h1 className="mb-5 block lg:hidden text-3xl sm:text-4xl text-gray-700 font-light tracking-wide">
                  {this.state.name}
                </h1>
                <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                  {/* :::Quantity */}
                </div>
              </div>

              {/* ::Actions Container */}
              <div className="order-2 lg:order-3 pt-8 sm:px-6 flex flex-wrap lg:flex-nowrap justify-around items-center border-b-2 lg:border-none border-gray-200">
                {/* :::Price */}
                <span className="m-0.5 text-3xl text-gray-500 font-extrabold">
                  {this.state.time}
                  <span className="font-normal">минут</span>
                </span>
                {/* :::Add to cart button */}
                <button
                  type="button"
                  className="m-2.5 py-1.5 px-5 inline-flex items-center rounded-md bg-[#4e4e6b] text-base text-white font-semibold uppercase whitespace-nowrap hover:bg-blue-200"
                >
                  <ShoppingBagIcon className="mr-3 w-6 h-6" />
                  Сагсанд хийх
                </button>
                {/* :::Reviews */}
                <div className="m-2.5 flex items-center">
                  {/* ::::rating stars */}
                  <div className="flex items-center space-x-1">
                    {/* full stars */}
                    {[...Array(this.starsNumber)].map((rating, index) => (
                      <span key={index} className="flex-shrink-0">
                        <svg
                          className="w-4 h-4 text-yellow-500 fill-current"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
                        </svg>
                      </span>
                    ))}
                    {/* half star */}
                    {this.isHalfStar && (
                      <span className="flex-shrink-0">
                        <svg
                          className="w-4 h-4 text-yellow-500 fill-current"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 5.173l2.335 4.817 5.305.732-3.861 3.71.942 5.27-4.721-2.524v-12.005zm0-4.586l-3.668 7.568-8.332 1.151 6.064 5.828-1.48 8.279 7.416-3.967 7.416 3.966-1.48-8.279 6.064-5.827-8.332-1.15-3.668-7.569z" />
                        </svg>
                      </span>
                    )}
                    {/* empty stars */}
                    {[...Array(this.emptyStars)].map((rating, index) => (
                      <span key={index} className="flex-shrink-0">
                        <svg
                          className="w-4 h-4 text-yellow-500 fill-current"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 5.173l2.335 4.817 5.305.732-3.861 3.71.942 5.27-4.721-2.524-4.721 2.525.942-5.27-3.861-3.71 5.305-.733 2.335-4.817zm0-4.586l-3.668 7.568-8.332 1.151 6.064 5.828-1.48 8.279 7.416-3.967 7.416 3.966-1.48-8.279 6.064-5.827-8.332-1.15-3.668-7.569z" />
                        </svg>
                      </span>
                    ))}
                  </div>
                  {/* ::::all reviews */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <iframe
          width="100%"
          height="500px"
          src={`${this.state.video}`}
          frameBorder="0"
          className="my-10"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
        />
        <div className="bg-[#4e4e6b] my-10 rounded-lg py-10">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="lg:w-2/5 md:w-3/5 w-4/5">
              <label className="mt-6 font-bold">Нэр</label>
              <input
                className="mt-1 p-4 w-full rounded-xl border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50 "
                name="name"
                value={this.state.name}
                onChange={this.handleType}
              />
            </div>
            <div className="lg:w-2/5 md:w-3/5 w-4/5">
              <label className="mt-6 font-bold">Тайлбар</label>
              <textarea
                className="mt-1 p-4 w-full rounded-xl border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50 "
                style={{ height: "10em" }}
                name="content"
                value={this.state.content}
                onChange={this.handleType}
              />
            </div>

            <div className="lg:w-2/5 md:w-3/5 w-4/5">
              <label className="mt-6 font-bold">rating</label>
              <input
                className="mt-1 p-4 w-full rounded-xl border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50 "
                name="rating"
                value={this.state.rating}
                onChange={this.handleType}
              />
            </div>
            <div className="lg:w-2/5 md:w-3/5 w-4/5">
              <label className="mt-6 font-bold">Хугацаа</label>
              <input
                className="mt-1 p-4 w-full rounded-xl border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50 "
                name="time"
                value={this.state.time}
                onChange={this.handleType}
              />
            </div>

            <div className="lg:w-2/5 md:w-3/5 w-4/5">
              <label className="mt-6 font-bold">Орц</label>
              <textarea
                className="mt-1 p-4 w-full rounded-xl border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50 "
                style={{ height: "10em" }}
                name="ingredients"
                value={this.state.ingredients}
                onChange={this.handleType}
              />
            </div>

            <div>
              <button
                className="bg-white mt-6 border rounded-xl border-gray-300 p-2 hover:bg-purple-500 hover:text-white"
                onClick={this.handleSave}
              >
                Хадгалах
              </button>
              &nbsp;
              <button
                className="bg-white mt-6 border rounded-xl border-gray-300 p-2 hover:bg-purple-500 hover:text-white"
                onClick={this.goBack}
              >
                Буцах
              </button>
              &nbsp;
              <button
                className="bg-white mt-6 border rounded-xl border-gray-300 p-2 hover:bg-purple-500 hover:text-white"
                onClick={this.handleDelete}
              >
                Устгах
              </button>
            </div>
          </div>
        </div>
      </MyLayout>
    );
  }
}
