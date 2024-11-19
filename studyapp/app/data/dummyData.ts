interface User {
    email: string;
    password: string;
  }
  // have 2 users for now, can consider putting in more
  const users: User[] = [
    { email: 'U1', password: 'p' },
    { email: 'u2', password: 'p' },
  ];

  export const findUser = (email: string, password: string): boolean => {
    return users.some(user => user.email === email && user.password === password);
  };
  // mostly for sign up
  export const addUser = (email: string, password: string): boolean => {
    const userExists = users.some(user => user.email === email);
    if (userExists) {
      return false;
    }
    users.push({ email, password });
    return true;
  };
