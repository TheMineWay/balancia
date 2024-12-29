import { CONTROLLERS, getEndpointRequest } from "@shared/api-definition";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface Data {
  username: string;
  password: string;
}

export const useLogin = () =>
  useMutation({
    mutationFn: async (data: Data) =>
      await axios.request<null>(
        getEndpointRequest("http://localhost:3000", CONTROLLERS.auth, "login", {
          config: { data },
        })
      ),
  });
