import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

import {
  AiOutlineDashboard,
  AiOutlineAppstoreAdd,
  AiOutlineUnorderedList,
} from "react-icons/ai";

import { CgUserList } from "react-icons/cg";
import { SiBrandfolder } from "react-icons/si";
import { BiCategoryAlt } from "react-icons/bi";
import { MdOutlineColorLens } from "react-icons/md";
import { FaClipboardList, FaMicroblog } from "react-icons/fa";
import { IoCreateOutline, IoNotificationsSharp } from "react-icons/io5";
import { VscRequestChanges } from "react-icons/vsc";
import { Layout, Menu, theme } from "antd";

import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h2 className="text-white fs-5 text-center py-3 mb-0">
            <span className="sm-logo">iTT</span>
            <span className="lg-logo">iThinkTech</span>
          </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[""]}
          onClick={({ key }) => {
            if (key === "signout") {
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: "",
              icon: <AiOutlineDashboard className="fs-4" />,
              label: "Dashboard",
            },
            {
              key: "customers",
              icon: <CgUserList className="fs-4" />,
              label: "Customers",
            },
            {
              key: "catalog",
              icon: <AiOutlineAppstoreAdd className="fs-4" />,
              label: "Catalog",
              children: [
                {
                  key: "product",
                  icon: <AiOutlineAppstoreAdd className="fs-4" />,
                  label: "Add Product",
                },
                {
                  key: "product-list",
                  icon: <AiOutlineUnorderedList className="fs-4" />,
                  label: "Product-list",
                },
                {
                  key: "brand",
                  icon: <SiBrandfolder className="fs-4" />,
                  label: "Brand",
                },
                {
                  key: "brand-list",
                  icon: <AiOutlineUnorderedList className="fs-4" />,
                  label: "Brand List",
                },
                {
                  key: "category",
                  icon: <BiCategoryAlt className="fs-4" />,
                  label: "Category",
                },
                {
                  key: "category-list",
                  icon: <AiOutlineUnorderedList className="fs-4" />,
                  label: "Category List",
                },
                {
                  key: "color",
                  icon: <MdOutlineColorLens className="fs-4" />,
                  label: "Color",
                },
                {
                  key: "color-list",
                  icon: <AiOutlineUnorderedList className="fs-4" />,
                  label: "Color List",
                },
              ],
            },
            {
              key: "orders",
              icon: <FaClipboardList className="fs-4" />,
              label: "Orders",
            },
            {
              key: "blog",
              icon: <FaMicroblog className="fs-4" />,
              label: "Blogs",
              children: [
                {
                  key: "add-blog",
                  icon: <IoCreateOutline className="fs-4" />,
                  label: "Add Blog",
                },
                {
                  key: "blog-list",
                  icon: <AiOutlineUnorderedList className="fs-4" />,
                  label: "Blog List",
                },
                {
                  key: "blog-category",
                  icon: <IoCreateOutline className="fs-4" />,
                  label: "Add Blog Category",
                },
                {
                  key: "blog-category-list",
                  icon: <AiOutlineUnorderedList className="fs-4" />,
                  label: "Blog Category List",
                },
              ],
            },
            {
              key: "enquiries",
              icon: <VscRequestChanges className="fs-4" />,
              label: "Enquiries",
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="d-flex justify-content-between ps-1 pe-5"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <div className="d-flex gap-4 align-items-center">
            <div className="position-relative">
              <IoNotificationsSharp className="fs-4" />
              <span className="badge bg-warning rounded-circle p-1 position-absolute">
                3
              </span>
            </div>

            <div className="d-flex gap-3 align-items-center dropdown">
              <div>
                <img
                  width={32}
                  height={32}
                  src="https://media.licdn.com/dms/image/D5603AQF1oO-LOJxT_w/profile-displayphoto-shrink_200_200/0/1664684206755?e=1683158400&v=beta&t=GEJ0Vifg5CXC-FMk8cvHBCVozNkbHk4jHYdzJuVot9I"
                  alt="adminPic"
                />
              </div>
              <div>
                <h5 className="mb-0">Artur</h5>
                <p className="mb-0">artlil420@gmail.com</p>
              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;