import { useEffect, useState } from 'react'
import userService, { User } from './user-service';

export const useUsers = () => {
  const [error, setErrors] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const { request, cancel } = userService.getAll<User>();
    request
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setErrors(err.message);
      });
    () => cancel();
  }, []);

  return {error, users, setErrors, setUsers, isLoading};

}
