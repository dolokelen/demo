import userService, { User } from "./service/user-service";
import { useUsers } from "./service/useUsers";

export const UsersList = () => {
  const { users, setUsers, error, setErrors, isLoading } = useUsers();

  const deleteUser = (user: User) => {
    const originalUsers = [...users];
    setUsers(users.filter((u) => u.id !== user.id));

    userService.delete(user.id).catch((err) => {
      setErrors(err.message);
      setUsers(originalUsers);
    });
  };

  const createUser = () => {
    const originalUsers = [...users];
    const newUser = { id: 0, name: "Dolokelen" };
    setUsers([newUser, ...users]);

    userService
      .create(newUser)
      .then(({ data: saveData }) => setUsers([saveData, ...users]))
      .catch((err) => {
        setErrors(err.message);
        setUsers(originalUsers);
      });
  };

  const updateUser = (user: User) => {
    const originalUsers = [...users];
    const updatedUser = { ...user, name: user.name + "!" };
    setUsers(users.map((u) => (u.id === user.id ? updatedUser : u)));

    userService.update(user).catch((err) => {
      setErrors(err.message);
      setUsers(originalUsers);
    });
  };
  return (
    <>
      {isLoading && <div className="mb-3 spinner-border"></div>}
      {error && <p className="text-danger">{error}</p>}

      <button onClick={createUser} className="btn btn-primary">
        Create
      </button>

      <ul className="list-group">
        {users.map((user: User) => (
          <li
            key={user.id}
            className="list-group-item d-flex justify-content-between"
          >
            {user.name}
            <div>
              <button
                onClick={() => deleteUser(user)}
                className="btn btn-outline-danger mx-3"
              >
                Delete
              </button>

              <button
                onClick={() => updateUser(user)}
                className="btn btn-outline-secondary"
              >
                Update
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};
