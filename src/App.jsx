import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Layout, Menu, theme } from "antd";
import Home from "./components/Home/Home";
import { GithubOutlined, LinkedinOutlined } from "@ant-design/icons";
import InProgress from "./components/InProgress/InProgress";
import AthleteStats from "./components/Athlete/Athlete";

const { Header, Content, Footer } = Layout;

const navItems = [
  { key: "/", label: "Home" },
  { key: "/resume", label: "Resume" },
  { key: "/athlete", label: "About Me" },
  {
    key: "/github",
    label: "GitHub",
    icon: <GithubOutlined />,
    url: "https://github.com/gabrieloyk",
  },
  {
    key: "/linkedin",
    label: "LinkedIn",
    icon: <LinkedinOutlined />,
    url: "https://www.linkedin.com/in/gabrieloyk/",
  },
];

const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();


  return (
    <Router>
      <Layout>
        <Header
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div className="demo-logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["/"]}
            style={{
              flex: 1,
              minWidth: 15
            }}
          >
            {navItems.map((item) => (
              <Menu.Item key={item.key}>
                {item.url ? (
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    {item.icon}
                    <span style={{ marginLeft: "4px" }}>{item.label}</span>
                  </a>
                ) : (
                  <Link to={item.key}>{item.label}</Link>
                )}
              </Menu.Item>
            ))}
          </Menu>
        </Header>
        <Content >
          <div
          className="content-wrapper"
            style={{
              background: colorBgContainer,
              minHeight: "85vh",
              padding: 24,
              borderRadius: borderRadiusLG,
              justifyContent: "center",
            }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/resume" element={<Resume />} />
              <Route path="/athlete" element={<AthleteStats/>} />
            </Routes>
          </div>
        </Content>
        {/* <Footer style={{ textAlign: "center" }}>
          Email: goyk98@gmail.com
        </Footer> */}
      </Layout>
    </Router>
  );
};

const Resume = () => <InProgress />;
const Projects = () => <InProgress />

export default App;
