import { useEditMyProfileNameMutation } from "@core/hooks/api/profile/my-profile/use-edit-my-profile-name.mutation";
import { zodResolver } from "@hookform/resolvers/zod";
import { USER_SCHEMA, UserModel } from "@shared/models";
import { Button, Input } from "antd";
import { Controller, useForm } from "react-hook-form";
import { AiOutlineSave } from "react-icons/ai";
import z from "zod";

const SCHEMA = USER_SCHEMA.pick({
    name: true,
    lastName: true
});

type FormData = z.infer<typeof SCHEMA>;

type Props = { user: UserModel }

export default function ProfileInformationEditName({ user }: Readonly<Props>) {
    const { control, handleSubmit } = useForm<FormData>({ defaultValues: user, resolver: zodResolver(SCHEMA), });
    const { mutateAsync, isPending } = useEditMyProfileNameMutation();

    return <form onSubmit={handleSubmit((data) => mutateAsync(data))} className="flex flex-col md:flex-row gap-2">
        <Controller name="name" control={control} render={({ field: { value, onChange } }) => <Input value={value} onChange={onChange} />} />
        <Controller name="lastName" control={control} render={({ field: { value, onChange } }) => <Input value={value} onChange={onChange} />} />
        <Button loading={isPending} htmlType="submit" icon={<AiOutlineSave />} type="primary" block>Save</Button>
    </form>;
};
