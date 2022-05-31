import React from "react";
import "./style.css";

const Footer = () => {
  return (
    <div className="footer-2 bg-[#4e4e6b] pt-6 md:pt-12">
      <div className="container px-4 mx-auto">
        <div className="md:flex md:flex-wrap md:-mx-4 py-6 md:pb-12">
          <div className="footer-info lg:w-1/3 md:px-4">
            <h4 className="text-white text-2xl mb-4">
              Хоолны жорын нэгдсэн сан
            </h4>
            <p className="text-white">
              Бид вэб сайт аа хүн болгонд нээлттэйгээр хийсэн
            </p>
            <div className="mt-4">
              <button className="bg-facebook py-2 px-4 text-white rounded mt-2 transition-colors duration-300">
                <span className="fab fa-facebook-f mr-2" /> Facebook
              </button>
              <button className="bg-twitter py-2 px-4 text-white rounded ml-2 mt-2 transition-colors duration-300">
                <span className="fab fa-twitter mr-2" /> Twitter
              </button>
            </div>
          </div>
          <div className="md:w-2/3 lg:w-1/3 md:px-4 xl:pl-16 mt-12 lg:mt-0">
            <div className="sm:flex">
              <div className="sm:flex-1">
                <h6 className="text-base font-medium text-white uppercase mb-2">
                  тухай
                </h6>
                <div>
                  <a href="#" className="text-white py-1 block hover:underline">
                    Байгуулага
                  </a>
                  <a href="#" className="text-white py-1 block hover:underline">
                    Зорилго
                  </a>
                  <a href="#" className="text-white py-1 block hover:underline">

                    Хамт олон
                  </a>
                </div>
              </div>
              <div className="sm:flex-1 sm:mt-0">
                <h6 className="text-base font-medium text-white uppercase mb-2">
                  Санал болгох
                </h6>
                <div>
                <a href="#" className="text-white py-1 block hover:underline">
                    Нүүр
                  </a>
                  <a href="#" className="text-white py-1 block hover:underline">
                    Категори
                  </a>
                  <a href="#" className="text-white py-1 block hover:underline">

                    Бүх хоол
                  </a>
                  
                  
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-1/3 md:px-4 md:text-center mt-12 lg:mt-0">
            <h5 className="text-lg text-white font-medium mb-4">
              Манай сайтыг сонирхоорой
            </h5>
            <button className="bg-indigo-600 text-white hover:bg-indigo-700 rounded py-2 px-6 md:px-12 transition-colors duration-300">
              Судлах
            </button>
          </div>
        </div>
      </div>
      <div className="border-t border-solid border-gray-900 mt-4 py-4">
        <div className="container px-4 mx-auto">
          <div className="md:flex md:-mx-4 md:items-center">
            <div className="md:flex-1 md:px-4 text-center md:text-left">
              <p className="text-white">
                © <strong>ХСҮС</strong>
              </p>
            </div>
            <div className="md:flex-1 md:px-4 text-center md:text-right">
              <a
                href="#"
                className="py-2 px-4 text-white inline-block hover:underline"
              >
                Үйлчилгээний нөхцөл
              </a>
              <a
                href="#"
                className="py-2 px-4 text-white inline-block hover:underline"
              >
                Нууцлалын бодлого
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
