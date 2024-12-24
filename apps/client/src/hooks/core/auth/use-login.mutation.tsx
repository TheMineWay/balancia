import { useMutation } from "@tanstack/react-query";

interface Data {
  username: string;
  password: string;
}

export const useLogin = () =>
  useMutation({
    mutationFn: async (data: Data) => {},
  });
