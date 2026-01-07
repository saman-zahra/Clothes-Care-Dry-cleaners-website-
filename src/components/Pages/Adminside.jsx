import React, { useEffect, useState } from "react";
import { Table, Dropdown, Menu } from "antd";
import { initializeApp } from "firebase/app";
import { useNavigate } from "react-router-dom";

import {
  getFirestore,
  collection,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { firebaseConfig } from "../../firebaseConfig";
import { DownOutlined } from "@ant-design/icons";
import ServiceCreationandUpdation from "../ServiceCreationandUpdation/ServiceCreationandUpdation";
import AdminSideNav from "../AdminSideNav/AdminSideNav";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function Adminside() {
  const [dataSource, setDataSource] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/Login");
    } else {
      const fetchData = async () => {
        const querySnapshot = await getDocs(collection(db, "Orders"));
        setDataSource(
          querySnapshot.docs.map((doc) => ({ ...doc.data(), key: doc.id }))
        );
      };
      fetchData();
    }
  }, [navigate]);

  const handleStatusChange = async (key, newStatus) => {
    try {
      if (["Pending", "Cancelled", "Fulfilled"].includes(newStatus)) {
        await updateDoc(doc(db, "Orders", key), { Status: newStatus });
        const updatedDataSource = dataSource.map((data) =>
          data.key === key ? { ...data, Status: newStatus } : data
        );
        setDataSource(updatedDataSource);
      } else {
        console.error("Invalid status:", newStatus);
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };
  const columns = [
    {
      title: "Order ID",
      dataIndex: "key",
      key: "orderId",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Contact Number",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Services Ordered",
      key: "servicesOrdered",
      render: (text, record) => (
        <>
          {record.serviceNames || record.totalPrice ? (
            <>
              {record.serviceNames && (
                <p>
                  <span className="font-bold">Service Names:</span>{" "}
                  {record.serviceNames}
                </p>
              )}
              <br />
              {record.totalPrice && (
                <p>
                  <span className="font-bold">Price:</span> {record.totalPrice}£
                </p>
              )}
            </>
          ) : (
            <p>Details provided in the order</p>
          )}
        </>
      ),
    },
    {
      title: "Order Placed At",
      dataIndex: "submittedAt",
      key: "submittedAt",
      render: (submittedAt) => {
        const date = new Date(submittedAt.seconds * 1000);
        return date.toLocaleString();
      },
    },
    {
      title: "Status",
      dataIndex: "Status",
      key: "Status",
      width: "120px",
      render: (Status, record) => {
        const menu = (
          <Menu>
            <Menu.Item
              key="0"
              onClick={() => handleStatusChange(record.key, "Pending")}
            >
              Pending
            </Menu.Item>
            <Menu.Item
              key="1"
              onClick={() => handleStatusChange(record.key, "Fulfilled")}
            >
              Fulfilled
            </Menu.Item>
            <Menu.Item
              key="2"
              onClick={() => handleStatusChange(record.key, "Cancelled")}
            >
              Cancelled
            </Menu.Item>
          </Menu>
        );

        return (
          <Dropdown overlay={menu} trigger={["click"]}>
          <button className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            {Status} <DownOutlined />
          </button>
        </Dropdown>
        );
      },
    },
    {
      title: "Order Details",
      dataIndex: "orderDetails",
      key: "orderDetails",
    },
  ];

  return (
    <div>
      <AdminSideNav />

      <div className="mt-32">
        <h2 className="text-xl font-bold text-center mb-4  bg-[#0890F3] text-white py-3">
          Order Table
        </h2>
        <div className="px-10">
          <Table dataSource={dataSource} columns={columns} />
        </div>
      </div>

      <h2 className="text-xl font-bold text-center mb-4 bg-[#0890F3] text-white py-3">
        Services Section
      </h2>

      <ServiceCreationandUpdation />
    </div>
  );
}

export default Adminside;
