import { useAuthenticatedRequest } from '@core/hooks/utils/api/use-authenticated-request.util';
import { UpdateMyProfileNameDTO } from '@shared/dtos';
import { useMutation } from "@tanstack/react-query";

export const useEditMyProfileNameMutation = () => {
    const { request } = useAuthenticatedRequest();

    return useMutation({
        mutationFn: async (data: UpdateMyProfileNameDTO) => (await request({ data, url: get })).data,
    })
};