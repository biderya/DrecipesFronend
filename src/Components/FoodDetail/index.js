import React, { Component } from "react";
import { useState } from "react";
import axios from "../../axios";
import MyLayout from "../MyLayout";
import food from "../../assets/food.jpg";

import Alert from "react-bootstrap/Alert";
import { HeartIcon, ShoppingBagIcon } from "@heroicons/react/solid";

export default class FoodDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      mainPicture: 0
    };
  }
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
    ingredients: [
      {
        name: null,
        quantity: null,
        type: null,
      },
    ],
    pictures: [
      {
        src: null,
        alt: null,
      },
    ],
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
    console.log(
      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      this.props.match.params.id
    );
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
            {/* :PICTURES CONTAINER */}
            <div className="py-8 w-full lg:w-1/2 flex flex-col items-center">
              {/* ::Like Button */}
              <span className="self-start ml-10">
                <button className="text-gray-300 hover:text-red-500">
                  <HeartIcon className="w-10 h-10" />
                </button>
              </span>
              {/* ::Main Picture */}
              <div className="w-auto h-56 sm:h-72 lg:h-full max-h-96 overflow-hidden">
                <img
                  src={this.state.pictures[this.state.mainPicture].src}
                  alt={this.state.pictures[this.state.mainPicture].alt}
                  className="object-contain w-full h-full"
                />
              </div>
              {/* ::Gallery */}
              <div className="mt-6 mx-auto">
                <ul className="grid grid-flow-col auto-cols-fr gap-4">
                  {this.state.pictures
                    .slice(0, 4) // Here you can manage the number of pictures displayed
                    .map((picture, index) => (
                      <li
                        key={picture.alt}
                        className={`col-span-1 p-1 w-16 rounded border-2 ${
                          index === this.state.mainPicture
                            ? "border-yellow-600"
                            : "border-transparent"
                        }`}
                      >
                        <button
                          type="button"
                          className="block h-full rounded overflow-hidden"
                          onClick={() => this.setState({index: this.state.mainPicture})}
                        >
                          <img
                            src={picture.src}
                            alt={picture.alt}
                            className="object-contain"
                          />
                        </button>
                      </li>
                    ))}
                </ul>
              </div>
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
                  {this.state.name}
                </p>
                {/* :::Features */}
                <ul className="my-5 flex flex-col space-y-2">
                  {this.state.ingredients.map((ingredient) => (
                    <li
                      key={ingredient.name}
                      className="inline-flex items-center space-x-2 text-gray-500"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-600" />
                      <span className="text-sm font-semibold">
                        {ingredient.name}:
                      </span>
                      <span className="text-sm font-normal">
                        {ingredient.quantity}
                      </span>
                    </li>
                  ))}
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
                  className="m-2.5 py-1.5 px-5 inline-flex items-center rounded-md bg-yellow-500 text-base text-white font-semibold uppercase whitespace-nowrap hover:bg-yellow-600"
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
        <div>
          <div>
            <div>
              <label>Нэр</label>
              <input
                name="name"
                value={this.state.name}
                onChange={this.handleType}
              />
            </div>
            <div>
              <label>Тайлбар</label>
              <textarea
                style={{ height: "20em" }}
                name="content"
                value={this.state.content}
                onChange={this.handleType}
              />
            </div>

            <div>
              <label>rating</label>
              <input
                name="rating"
                value={this.state.rating}
                onChange={this.handleType}
              />
            </div>

            <div>
              <button onClick={this.goBack}>Буцах</button>
              &nbsp;
              <button onClick={this.handleSave}>Хадгалах</button>
              &nbsp;
              <button onClick={this.handleDelete}>Устгах</button>
            </div>
          </div>
        </div>
      </MyLayout>
    );
  }
}
