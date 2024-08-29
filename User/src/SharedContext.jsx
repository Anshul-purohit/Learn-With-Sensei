import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const SharedContext = createContext();

export const SharedProvider = ({ children }) => {
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState(null);
  const [fullname, setFullname] = useState(null);
  const [email, setEmail] = useState(null);
  const [userid, setUserid] = useState(null);

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = Cookies.get('isDarkMode');
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  const apiBaseUrl = 'http://localhost:8000/api/v1'; 

  const handleToggleOpen = () => {
    setIsToggleOpen(!isToggleOpen);
  };

  const toggleTheme = () => {
    setIsDarkMode(prevMode => {
      const newMode = !prevMode;
      Cookies.set('isDarkMode', newMode, { expires: 365 }); 
      return newMode;
    });
  };

  const login = (uname, fname, mail, id) => {
    setIsAuthenticated(true);
    setUsername(uname);
    setFullname(fname);
    setEmail(mail);
    setUserid(id);

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
    setUserid(null);

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
      setFullname,
      apiBaseUrl, 
      isDarkMode,  
      toggleTheme  
    }}>
      {children}
    </SharedContext.Provider>
  );
};

export const useShared = () => useContext(SharedContext);

export default SharedProvider;
