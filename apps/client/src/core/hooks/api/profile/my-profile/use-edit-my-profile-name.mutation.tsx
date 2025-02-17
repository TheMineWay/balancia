import { UserModel } from "@shared/models";
import { useMutation } from "@tanstack/react-query";

type MutationData = Pick<UserModel, 'name' | 'lastName'>

export const useEditMyProfileNameMutation = () => {
    return useMutation({
        mutationFn: async (data: MutationData) => { }
    })
};