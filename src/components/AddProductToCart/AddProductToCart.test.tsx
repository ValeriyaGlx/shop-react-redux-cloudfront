import { fireEvent, render, screen } from "@testing-library/react";
import AddProductToCart from "./AddProductToCart";
import { useUpsertCart } from "~/queries/cart";
import { vitest } from "vitest";

vitest.mock("~/queries/cart");

const MOCKED_PRODUCT = {
  id: "mock_id",
  title: "title",
  description: "description",
  price: 100,
  count: 0,
};

describe("AddProductToCart", () => {
  beforeEach(() => {
    (useUpsertCart as any).mockReturnValue({
      mutate: vitest.fn(),
      isLoading: false,
      isError: false,
    });
  });

  test("should render without erros", () => {
    render(<AddProductToCart product={MOCKED_PRODUCT} />);
    expect(screen.getByTestId("ShoppingCartIcon")).toBeInTheDocument();
  });

  test("should render add and remove buttons after click on ShoppingCartIcon", () => {
    render(<AddProductToCart product={MOCKED_PRODUCT} />);
    const shoppingCartIcon = screen.getByTestId("ShoppingCartIcon");
    fireEvent.click(shoppingCartIcon);
    screen.debug();
    const addIcon = screen.getByTestId("AddIcon");
    const removeIcon = screen.getByTestId("RemoveIcon");
    expect(addIcon).toBeInTheDocument();
    expect(removeIcon).toBeInTheDocument();
  });
});
