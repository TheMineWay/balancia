import { ENV } from '@core/constants/env/env.constant';
import { useAuthenticatedRequest } from '@core/hooks/utils/api/use-authenticated-request.util';
import { CONTROLLERS, getEndpointRequest } from '@shared/api-definition';
import { UpdateMyProfileNameDTO } from '@shared/dtos';
import { useMutation } from "@tanstack/react-query";

export const useEditMyProfileNameMutation = () => {
    const { request } = useAuthenticatedRequest();

    return useMutation({
        mutationFn: async (data: UpdateMyProfileNameDTO) => (await request({ data, ...getEndpointRequest(ENV.api.host, CONTROLLERS.userProfile, 'update') })).data,
    })
};