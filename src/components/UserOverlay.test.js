import React from "react";
import ReactDOM from "react-dom";
import { UserOverlay } from "./UserOverlay";

const testUser = {
  email: "isaac.soler@example.com",
  location: {
    city: "Bilbao",
    country: "Spain",
    postcode: 39963,
    state: "Andalucía",
    street: {
      name: "Avenida de Salamanca",
      number: 8039,
    },
  },
  login: {
    uuid: "8e8c2205-0951-4742-9f4c-2e6925f32e8e",
    username: "brownrabbit255",
  },
  name: {
    title: "Mr",
    first: "Isaac",
    last: "Soler",
  },
  picture: {
    large: "https://randomuser.me/api/portraits/men/56.jpg",
    medium: "https://randomuser.me/api/portraits/med/men/56.jpg",
    thumbnail: "https://randomuser.me/api/portraits/thumb/men/56.jpg",
  },
  phone: "913-921-958",
  cell: "686-235-580",
};

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<UserOverlay user={testUser} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("contains the container element", () => {
  const div = document.createElement("div");
  ReactDOM.render(<UserOverlay user={testUser} />, div);
  const overlayContainer = div.getElementsByClassName("user-overlay-container");
  expect(overlayContainer).toBeDefined();
  ReactDOM.unmountComponentAtNode(div);
});

it("contains the portrait image", () => {
  const div = document.createElement("div");
  ReactDOM.render(<UserOverlay user={testUser} />, div);
  // get the image element
  const portrait = div.getElementsByClassName("card-img-top");
  // verify that there is exactly one image
  expect(portrait).toBeDefined();
  expect(portrait.length).toBe(1);
  // verify the image source
  const src = portrait[0].getAttribute("src");
  expect(src).toBe(testUser.picture.large);
  // unmount
  ReactDOM.unmountComponentAtNode(div);
});

it("contains the name of the user", () => {
  const div = document.createElement("div");
  ReactDOM.render(<UserOverlay user={testUser} />, div);
  // get the name element
  const name = div.getElementsByClassName("user-property-name");
  // verify that there is exactly one name element
  expect(name).toBeDefined();
  expect(name.length).toBe(1);
  // verify it contains the name
  const innerHtml = name[0].innerHTML;
  expect(innerHtml).toContain(testUser.name.first);
  expect(innerHtml).toContain(testUser.name.last);
  // unmount
  ReactDOM.unmountComponentAtNode(div);
});

it("contains the username", () => {
  const div = document.createElement("div");
  ReactDOM.render(<UserOverlay user={testUser} />, div);
  // get the name element
  const name = div.getElementsByClassName("user-property-username");
  // verify that there is exactly one element
  expect(name).toBeDefined();
  expect(name.length).toBe(1);
  // verify it contains the expected value
  const innerHtml = name[0].innerHTML;
  expect(innerHtml).toContain(testUser.login.username);
  // unmount
  ReactDOM.unmountComponentAtNode(div);
});

it("contains the email", () => {
  const div = document.createElement("div");
  ReactDOM.render(<UserOverlay user={testUser} />, div);
  // get the name element
  const name = div.getElementsByClassName("user-property-email");
  // verify that there is exactly one element
  expect(name).toBeDefined();
  expect(name.length).toBe(1);
  // verify it contains the expected value
  const innerHtml = name[0].innerHTML;
  expect(innerHtml).toContain(testUser.email);
  // unmount
  ReactDOM.unmountComponentAtNode(div);
});

it("contains the street", () => {
  const div = document.createElement("div");
  ReactDOM.render(<UserOverlay user={testUser} />, div);
  // get the name element
  const name = div.getElementsByClassName("user-property-street");
  // verify that there is exactly one element
  expect(name).toBeDefined();
  expect(name.length).toBe(1);
  // verify it contains the expected values
  const innerHtml = name[0].innerHTML;
  expect(innerHtml).toContain(testUser.location.street.number);
  expect(innerHtml).toContain(testUser.location.street.name);
  // unmount
  ReactDOM.unmountComponentAtNode(div);
});

it("contains the city", () => {
  const div = document.createElement("div");
  ReactDOM.render(<UserOverlay user={testUser} />, div);
  // get the name element
  const name = div.getElementsByClassName("user-property-city");
  // verify that there is exactly one element
  expect(name).toBeDefined();
  expect(name.length).toBe(1);
  // verify it contains the expected value
  const innerHtml = name[0].innerHTML;
  expect(innerHtml).toContain(testUser.location.city);
  // unmount
  ReactDOM.unmountComponentAtNode(div);
});

it("contains the state", () => {
  const div = document.createElement("div");
  ReactDOM.render(<UserOverlay user={testUser} />, div);
  // get the name element
  const name = div.getElementsByClassName("user-property-state");
  // verify that there is exactly one element
  expect(name).toBeDefined();
  expect(name.length).toBe(1);
  // verify it contains the expected value
  const innerHtml = name[0].innerHTML;
  expect(innerHtml).toContain(testUser.location.state);
  // unmount
  ReactDOM.unmountComponentAtNode(div);
});

it("contains the postcode", () => {
  const div = document.createElement("div");
  ReactDOM.render(<UserOverlay user={testUser} />, div);
  // get the name element
  const name = div.getElementsByClassName("user-property-postcode");
  // verify that there is exactly one element
  expect(name).toBeDefined();
  expect(name.length).toBe(1);
  // verify it contains the expected value
  const innerHtml = name[0].innerHTML;
  expect(innerHtml).toContain(testUser.location.postcode);
  // unmount
  ReactDOM.unmountComponentAtNode(div);
});

it("contains the phone", () => {
  const div = document.createElement("div");
  ReactDOM.render(<UserOverlay user={testUser} />, div);
  // get the name element
  const name = div.getElementsByClassName("user-property-phone");
  // verify that there is exactly one element
  expect(name).toBeDefined();
  expect(name.length).toBe(1);
  // verify it contains the expected value
  const innerHtml = name[0].innerHTML;
  expect(innerHtml).toContain(testUser.phone);
  // unmount
  ReactDOM.unmountComponentAtNode(div);
});

it("contains the cellphone", () => {
  const div = document.createElement("div");
  ReactDOM.render(<UserOverlay user={testUser} />, div);
  // get the name element
  const name = div.getElementsByClassName("user-property-cellphone");
  // verify that there is exactly one element
  expect(name).toBeDefined();
  expect(name.length).toBe(1);
  // verify it contains the expected value
  const innerHtml = name[0].innerHTML;
  expect(innerHtml).toContain(testUser.cell);
  // unmount
  ReactDOM.unmountComponentAtNode(div);
});
