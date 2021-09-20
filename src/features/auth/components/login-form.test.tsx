import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { Provider } from "react-redux";
import store from "store";
import LoginForm from "features/auth/components/login-form";
import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import userEvent from "@testing-library/user-event";

const server = setupServer(
  rest.post(
    `${process.env.REACT_APP_API_URL}/login`,
    async (req: { body: { email: string; password: string } }, res, ctx) => {
      if (
        req?.body.password !== "meld123" ||
        req.body.email !== "test@test.com"
      ) {
        return res(ctx.status(401));
      }
      return res(ctx.json({ data: "string" }));
    }
  )
);

beforeAll(() => server.listen());
afterAll(() => server.close());

test("should display login form", () => {
  render(
    <Provider store={store}>
      <LoginForm />
    </Provider>
  );
  const emailInput = screen.getByLabelText("Email*");
  const passwordInput = screen.getByLabelText("Password*");

  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
});

test("should display login button", () => {
  render(
    <Provider store={store}>
      <LoginForm />
    </Provider>
  );
  const loginBtn = screen.getByRole("button", { name: /login/i });
  expect(loginBtn).toBeInTheDocument();
});

test("should login successfully", async () => {
  render(
    <Provider store={store}>
      <LoginForm />
    </Provider>
  );
  userEvent.type(screen.getByLabelText("Email*"), "test@test.com");
  userEvent.type(screen.getByLabelText("Password*"), "meld123");
  fireEvent.submit(screen.getByRole("button", { name: /login/i }));
  await waitForElementToBeRemoved(() => screen.getByText(/loading.../i));
  expect(screen.getByText(/login successfully/i)).toBeInTheDocument();
});

test("should fail to login", async () => {
  render(
    <Provider store={store}>
      <LoginForm />
    </Provider>
  );
  userEvent.type(screen.getByLabelText("Email*"), "test@test.com");
  userEvent.type(screen.getByLabelText("Password*"), "meld");
  fireEvent.submit(screen.getByRole("button", { name: /login/i }));
  await waitForElementToBeRemoved(() => screen.getByText(/loading.../i));
  expect(
    screen.getByText(/request failed with status code 401/i)
  ).toBeInTheDocument();
});
