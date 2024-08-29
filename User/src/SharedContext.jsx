import React, { createContext, useContext, useState } from 'react';
import Cookies from 'js-cookie';
import { useEffect } from 'react';

const SharedContext = createContext();

export const SharedProvider = ({ children }) => {
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState(null);
  const [fullname,setFullname] = useState(null);
  const [email,setEmail] = useState(null);
  const [userid,setUserid] = useState(null)

  const handleToggleOpen = () => {
    setIsToggleOpen(!isToggleOpen);
  };

  const login = (uname,fname,mail,id) => {
    setIsAuthenticated(true);
    setUsername(uname);
    setFullname(fname);
    setEmail(mail);
    setUserid(id)
    // console.log(uname)

    Cookies.set('username', uname, { expires: 1 });
    Cookies.set('fullname', fname, { expires: 1 });
    Cookies.set('email', mail, { expires: 1 });
    Cookies.set('userid', id, { expires: 1 });
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUsername(null);
    setFullname(null);
    setEmail(null);
    setUserid(null)

    Cookies.remove('username');
    Cookies.remove('fullname');
    Cookies.remove('email');
    Cookies.remove('userid');
    Cookies.remove('access_token');
  };

  useEffect(() => {
    const username = Cookies.get('username');
    const fullname = Cookies.get('fullname');
    const email = Cookies.get('email');
    const userid = Cookies.get('userid');

    // console.log("zzz : ",Cookies.get())

    if (username && fullname && email && userid) {
      setIsAuthenticated(true);
      setUsername(username);
      setFullname(fullname);
      setEmail(email);
      setUserid(userid);
    }
  }, []);

  return (
    <SharedContext.Provider value={{ 
      isToggleOpen, 
      handleToggleOpen, 
      isAuthenticated, 
      username,
      fullname,
      userid,
      email, 
      login, 
      logout,
      setUsername,
      setFullname
    }}>
      {children}
    </SharedContext.Provider>
  );
};

export const useShared = () => useContext(SharedContext);

export default SharedProvider;

