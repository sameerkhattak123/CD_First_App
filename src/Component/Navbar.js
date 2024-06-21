import React, { useEffect } from 'react';
import { Layout, Menu, Button, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { useLogout } from '../Hook/useLogout';
import { useAuthContext } from '../Hook/useAuthContext';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLoggedInPermissions } from '.././Redux/Action/loggedInPermissionAction';

const { Header } = Layout;
const { Text } = Typography;

function CustomNavbar() {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const dispatch = useDispatch();
  console.log('navbar')

  const loggedInPermissions = useSelector(state => state.loggedInPermission);
  console.log('lg',loggedInPermissions)
  useEffect(() => {
    if (user) {
      dispatch(fetchLoggedInPermissions(user.token));
    }
  }, [dispatch, user]);

  const handleLogout = () => {
    logout();
  };

  return (
    <Header style={{ position: 'fixed', zIndex: 1, width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} style={{ flex: 1 }}>
        <Menu.Item key="1"><Link to='/'>Home</Link></Menu.Item>
        <Menu.Item key="2"><Link to='/todolist'>To Do List</Link></Menu.Item>
        {user && <Menu.Item key="3"><Link to='/employee'>Employee</Link></Menu.Item>}
        <Menu.Item key="4"><Link to='/amountwithdraw'>Amount withdraw</Link></Menu.Item>
        <Menu.Item key="5"><Link to='/reduxtodolist'>Redux to DO List </Link></Menu.Item>
        {user && <Menu.Item key="6"><Link to='reduxemployee'>Redux Employee</Link></Menu.Item>}
        {user && user.role === 'admin' && (
    <Menu.Item key="7">
        <Link to='admin'>Admin Panel</Link>
    </Menu.Item>
)}

       
      </Menu>
      <div>
        {!user ? (
          <>
            <Link to='/login'>Log In</Link>
            <span style={{ margin: '0 8px' }}>|</span>
            <Link to='/register'>Register</Link>
          </>
        ) : (
          <>
            <Text strong style={{ color: 'white' }}>{user && user.email}</Text>
            <Button type="primary" onClick={handleLogout} style={{ marginLeft: '16px' }}>
              Logout
            </Button>
          </>
        )}
      </div>
    </Header>
  );
}

export default CustomNavbar;
