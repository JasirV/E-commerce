import React from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink } from "react-router-dom";

const SaidBar = () => {
  const adminLogout=()=>{
    localStorage.removeItem('admin_Token');
  }
  return (
    <div
      style={{ display: "flex", height: "100vh", overflow: "scroll initial" }}>
      <CDBSidebar textColor="	#FFFFFF" backgroundColor="#c70219">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <NavLink
            to="/adminpage"
            className="text-decoration-none"
            style={{ color: "inherit" }}>
            <h3>Admin</h3>
          </NavLink>
        </CDBSidebarHeader>
        <CDBSidebarContent textColor="#FFFFFF" className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink to="/addminhome" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="th-large">
                Admin Home
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/users" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="users">Users</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/adminOders" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="store">Orders</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/addminprodut" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="list">Product List</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/Edit" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="plus">Add Product</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/" onClick={()=>adminLogout} activeClassName="activeClicked">
              <CDBSidebarMenuItem  icon="home">Home</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>
        <CDBSidebarFooter style={{ textAlign: "center" }}></CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default SaidBar;
