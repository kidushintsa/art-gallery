import useSWR from "swr";
import axios from "axios";

export function useCart() {
  const { data, error, isLoading, mutate } = useSWR("/api/cart", async () => {
    const res = await axios.get("/api/cart");
    return res.data.cartItems as { artworkId: string }[];
  });

  const isInCart = (artworkId: string) =>
    !!data?.find((item) => item.artworkId === artworkId);

  return {
    cartItems: data,
    isInCart,
    isLoading,
    mutate,
    error,
  };
}
