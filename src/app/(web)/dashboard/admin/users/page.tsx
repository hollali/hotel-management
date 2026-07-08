import { getAllUsers } from "@/actions/users";
import { updateUserRole } from "@/actions/admin";
import UserRoleSelect from "./UserRoleSelect";

export const dynamic = "force-dynamic";

const AdminUsersPage = async () => {
  const allUsers = await getAllUsers();

  return (
    <div>
      <h2 className="font-heading text-xl font-medium mb-6 text-stellar-blue">User Management</h2>

      <div className="border border-stellar-light-grey overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-beige text-stellar-grey text-xs uppercase tracking-[0.08em]">
              <th className="text-left px-4 py-3 font-medium">Name</th>
              <th className="text-left px-4 py-3 font-medium">Email</th>
              <th className="text-left px-4 py-3 font-medium">Role</th>
              <th className="text-left px-4 py-3 font-medium">Status</th>
              <th className="text-left px-4 py-3 font-medium">Joined</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((user) => (
              <tr key={user.id} className="border-t border-stellar-light-grey hover:bg-beige/30 transition-colors">
                <td className="px-4 py-3 text-stellar-blue font-medium">
                  {user.firstName || user.lastName
                    ? `${user.firstName ?? ""} ${user.lastName ?? ""}`
                    : "—"}
                </td>
                <td className="px-4 py-3 text-stellar-grey">{user.email}</td>
                <td className="px-4 py-3">
                  <UserRoleSelect userId={user.id} currentRole={user.role} />
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`text-xs font-medium uppercase tracking-[0.08em] ${
                      user.isActive ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {user.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-4 py-3 text-stellar-grey text-xs">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {allUsers.length === 0 && (
        <p className="text-center text-stellar-grey py-12">No users found.</p>
      )}
    </div>
  );
};

export default AdminUsersPage;
