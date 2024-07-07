"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const CARS = [{
  id: "1",
  brand: "LandRover",
  name: "Discovery",
  imageIndex: "0",
  image: [{
    URL: "./car-pictures/discovery-fronty.jpg"
  }, {
    URL: "./car-pictures/discovery-front.jpg"
  }, {
    URL: "./car-pictures/discovery3.jpg"
  }, {
    URL: "./car-pictures/discovery4.jpg"
  }, {
    URL: "./car-pictures/discovery5.jpg"
  }, {
    URL: "./car-pictures/discovery6.jpg"
  }, {
    URL: "./car-pictures/discovery7.jpg"
  }, {
    URL: "./car-pictures/discovery8.jpg"
  }, {
    URL: "./car-pictures/discovery9.jpg"
  }, {
    URL: "./car-pictures/discovery10.jpg"
  }],
  price: "ksh 5,000,000",
  availability: "available",
  location: "Nairobi"
}, {
  id: "2",
  brand: "Toyota",
  name: "Crown",
  imageIndex: "0",
  image: [{
    URL: "./car-pictures/crown2.jpg"
  }, {
    URL: "./car-pictures/Toyota-Crown.jpg"
  }, {
    URL: "./car-pictures/crown3.jpg"
  }, {
    URL: "./car-pictures/crown4.jpg"
  }, {
    URL: "./car-pictures/crown5.jpg"
  }, {
    URL: "./car-pictures/crown6.jpg"
  }, {
    URL: "./car-pictures/crown7.jpg"
  }, {
    URL: "./car-pictures/crown8.jpg"
  }, {
    URL: "./car-pictures/crown9.jpg"
  }, {
    URL: "./car-pictures/crown10.jpg"
  }],
  price: "ksh 1,999,999",
  availability: "available",
  location: "Nairobi"
}, {
  id: "3",
  brand: "Audi",
  name: "Q7",
  imageIndex: "0",
  image: [{
    URL: "./car-pictures/audi9.jpeg"
  }, {
    URL: "./car-pictures/q7-image.jpeg"
  }, {
    URL: "./car-pictures/audi2.jpeg"
  }, {
    URL: "./car-pictures/audi3.jpeg"
  }, {
    URL: "./car-pictures/audi4.jpeg"
  }, {
    URL: "./car-pictures/audi5.jpeg"
  }, {
    URL: "./car-pictures/audi6.jpeg"
  }, {
    URL: "./car-pictures/audi7.jpeg"
  }, {
    URL: "./car-pictures/audi8.jpeg"
  }, {
    URL: "./car-pictures/audi10.jpeg"
  }],
  price: "ksh 5,449,000",
  availability: "available",
  location: "Nairobi"
}, {
  id: "4",
  brand: "LandCruiser",
  name: "Prado",
  imageIndex: "0",
  image: [{
    URL: "./car-pictures/prado-image.jpg"
  }, {
    URL: "./car-pictures/prado2.jpg"
  }, {
    URL: "./car-pictures/prado3.jpg"
  }, {
    URL: "./car-pictures/prado4.jpg"
  }, {
    URL: "./car-pictures/prado5.jpg"
  }, {
    URL: "./car-pictures/prado6.jpg"
  }, {
    URL: "./car-pictures/prado7.jpg"
  }, {
    URL: "./car-pictures/prado8.jpg"
  }, {
    URL: "./car-pictures/prado9.jpg"
  }, {
    URL: "./car-pictures/prado10.jpg"
  }],
  price: "ksh 1,999,000",
  availability: "available",
  location: "Nairobi"
}, {
  id: "5",
  brand: "Lexus",
  name: "RX 450h",
  imageIndex: "0",
  image: [{
    URL: "./car-pictures/RX2.jpeg"
  }, {
    URL: "./car-pictures/rx-image.jpeg"
  }, {
    URL: "./car-pictures/RX3.jpeg"
  }, {
    URL: "./car-pictures/RX4.jpeg"
  }, {
    URL: "./car-pictures/RX5.jpeg"
  }, {
    URL: "./car-pictures/RX6.jpeg"
  }, {
    URL: "./car-pictures/RX7.jpeg"
  }, {
    URL: "./car-pictures/RX8.jpeg"
  }, {
    URL: "./car-pictures/RX9.jpeg"
  }, {
    URL: "./car-pictures/RX10.jpeg"
  }],
  price: "ksh 2,300,000",
  availability: "available",
  location: "Nairobi"
}, {
  id: "6",
  brand: "Range Rover",
  name: "Evoque",
  imageIndex: "0",
  image: [{
    URL: "./car-pictures/evoque2.jpg"
  }, {
    URL: "./car-pictures/evoque-image.jpg"
  }, {
    URL: "./car-pictures/evoque3.jpg"
  }, {
    URL: "./car-pictures/evoque4.jpg"
  }, {
    URL: "./car-pictures/evoque5.jpg"
  }, {
    URL: "./car-pictures/evoque6.jpg"
  }, {
    URL: "./car-pictures/evoque7.jpg"
  }, {
    URL: "./car-pictures/evoque8.jpg"
  }, {
    URL: "./car-pictures/evoque9.jpg"
  }, {
    URL: "./car-pictures/evoque10.jpg"
  }],
  price: "ksh 3,450,000",
  availability: "available",
  location: "Nairobi"
}, {
  id: "7",
  brand: "Mercedes",
  name: "E 350",
  imageIndex: "0",
  image: [{
    URL: "./car-pictures/e3502.jpg"
  }, {
    URL: "./car-pictures/e350-image.jpg"
  }, {
    URL: "./car-pictures/e3503.jpg"
  }, {
    URL: "./car-pictures/e3504.jpg"
  }, {
    URL: "./car-pictures/e3505.jpg"
  }, {
    URL: "./car-pictures/e3506.jpg"
  }, {
    URL: "./car-pictures/e3507.jpg"
  }, {
    URL: "./car-pictures/e3508.jpg"
  }, {
    URL: "./car-pictures/e3509.jpg"
  }, {
    URL: "./car-pictures/e35010.jpg"
  }],
  price: "ksh 3,500,000",
  availability: "available",
  location: "Nairobi"
}, {
  id: "8",
  brand: "Mazda",
  name: "Axela",
  imageIndex: "0",
  image: [{
    URL: "./car-pictures/axela2.jpg"
  }, {
    URL: "./car-pictures/axela-image.jpg"
  }, {
    URL: "./car-pictures/axela3.jpg"
  }, {
    URL: "./car-pictures/axela4.jpg"
  }, {
    URL: "./car-pictures/axela5.jpg"
  }, {
    URL: "./car-pictures/axela6.jpg"
  }, {
    URL: "./car-pictures/axela7.jpg"
  }, {
    URL: "./car-pictures/axela8.jpg"
  }, {
    URL: "./car-pictures/axela9.jpg"
  }, {
    URL: "./car-pictures/axela10.jpg"
  }],
  price: "ksh 1,800,000",
  availability: "available",
  location: "Nairobi"
}, {
  id: "9",
  brand: "Subaru",
  name: "Forester",
  imageIndex: "0",
  image: [{
    URL: "./car-pictures/forester2.jpg"
  }, {
    URL: "./car-pictures/forester.jpg"
  }, {
    URL: "./car-pictures/forester3.jpg"
  }, {
    URL: "./car-pictures/forester4.jpg"
  }, {
    URL: "./car-pictures/forester5.jpg"
  }, {
    URL: "./car-pictures/forester6.jpg"
  }, {
    URL: "./car-pictures/forester7.jpg"
  }, {
    URL: "./car-pictures/forester8.jpg"
  }, {
    URL: "./car-pictures/forester9.jpg"
  }, {
    URL: "./car-pictures/forester10.jpg"
  }],
  price: "ksh 1,999,999",
  availability: "available",
  location: "Nairobi"
}];
var _default = exports.default = CARS;