import UsersManagement from "@/components/modules/admin/users";
import { userService } from "@/services/user.service";

export default async function AdminUsersPage() {
    const { data: users, error } = await userService.getAllUsers();

    if (error) {
        return <div className="p-6 text-red-500">Error loading users: {error.message}</div>;
    }

    return <UsersManagement initialUsers={users || []} />;
}