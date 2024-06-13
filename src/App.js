import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Layout } from 'antd';
import './App.css';
import Increment from "./Component/Increment";
import Navbar from "./Component/Navbar";
import { useAutoRefreshToken } from "./Hook/useAutoRefreshToken";
const { Content } = Layout;


const App=()=>{
    useAutoRefreshToken();
  return (
    <Layout>
    <Navbar />
    <Content style={{ marginTop: '64px', padding: '0 50px' }}> {/* Adjust padding for content area */}
      <div className="site-layout-content">
        <Outlet /> {/* Render content based on routes */}
      </div>
    </Content>
  </Layout>

  );
}

export default App;
