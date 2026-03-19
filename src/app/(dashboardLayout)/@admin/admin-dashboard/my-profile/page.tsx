import MyProfile from "@/components/modules/MyProfile";
import { userService } from '@/services/user.service';


export default async function CustomerProfile() {
    const response = await userService.getMyProfile();

    if (response?.error) return <h1>{response.error.message}</h1>;
    const user = response?.data;

    if (!user) {
        return <h1>User data not found!</h1>;
    }

    return (
        <>
            <MyProfile user={user} />
        </>
    );
}