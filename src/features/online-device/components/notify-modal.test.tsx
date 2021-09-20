import {
  cleanup,
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { Provider } from "react-redux";
import store from "store";
import NotifyModal, {
  State,
} from "features/online-device/components/notify-modal";
import { setupServer } from "msw/node";
import { rest } from "msw";
import userEvent from "@testing-library/user-event";
// import "react-testing-library/cleanup-after-each";

const server = setupServer(
  rest.post(
    `${process.env.REACT_APP_API_URL}/notify`,
    async (req: { body: State }, res, ctx) => {
      if (req?.body.name.trim() && req.body.message.trim()) {
        return res(ctx.status(200), ctx.text("Notification sent successfully"));
      }
      return res(ctx.status(400));
    }
  )
);
beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => {
  console.log("HELLO");
});

jest.mock("jwt-decode", () => () => ({ sender: "test@test.com" }));

test("should contain username, email, repo url and message field", () => {
  render(
    <Provider store={store}>
      <NotifyModal onClose={() => jest.fn()} isOpen={true} />
    </Provider>
  );
  expect(screen.getByLabelText("Username*")).toBeInTheDocument();
  expect(screen.getByLabelText("Email*")).toBeInTheDocument();
  expect(screen.getByLabelText("Repo Url*")).toBeInTheDocument();
  expect(screen.getByLabelText("Message*")).toBeInTheDocument();
});

test("should notify successfully", async () => {
  render(
    <Provider store={store}>
      <NotifyModal onClose={() => jest.fn()} isOpen={true} />
    </Provider>
  );

  userEvent.type(screen.getByLabelText("Username*"), "test");
  userEvent.type(screen.getByLabelText("Email*"), "test@test.com");
  userEvent.type(
    screen.getByLabelText("Repo Url*"),
    "https://github.com/rrifat/front-end"
  );
  userEvent.type(screen.getByLabelText("Message*"), "Done!!");

  userEvent.click(screen.getByRole("button", { name: /submit/i }));
  await waitForElementToBeRemoved(() => screen.getByText(/loading.../i));
  expect(
    screen.getByText(/notification sent successfully/i)
  ).toBeInTheDocument();
});

test("should fail to notify", async () => {
  render(
    <Provider store={store}>
      <NotifyModal onClose={() => jest.fn()} isOpen={true} />
    </Provider>
  );
  userEvent.click(screen.getByRole("button", { name: /submit/i }));
  await waitForElementToBeRemoved(() => screen.getByText(/loading.../i));
  expect(
    screen.getByText(/request failed with status code 400/i)
  ).toBeInTheDocument();
});
