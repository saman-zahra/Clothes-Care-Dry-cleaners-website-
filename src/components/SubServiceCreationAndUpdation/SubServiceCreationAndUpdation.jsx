import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AdminSideNav from "../AdminSideNav/AdminSideNav";
import { Card, Row, Col, Button, Input, Modal } from "antd";
import Swal from "sweetalert2";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../firebaseConfig";
import {
  collection,
  addDoc,
  getFirestore,
  query,
  where,
  deleteDoc,
  onSnapshot,
  doc,
  updateDoc,
} from "firebase/firestore";


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function SubServiceCreationAndUpdation() {
  const { id } = useParams();
  const { servname } = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const [subServices, setSubServices] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editId, setEditId] = useState("");

  useEffect(() => {
    const fetchSubServices = () => {
      const q = query(
        collection(db, "SubServices"),
        where("serviceId", "==", id)
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const subServicesData = [];
        querySnapshot.forEach((doc) => {
          subServicesData.push({ ...doc.data(), id: doc.id });
        });
        setSubServices(subServicesData);
      });
      return unsubscribe;
    };

    const unsubscribe = fetchSubServices();
    return () => unsubscribe();
  }, [id]);

  const handleInputChange = (inputName, value) => {
    if (inputName === "name") {
      setName(value);
    } else if (inputName === "price") {
      setPrice(Number(value));
    }
  };
  const addSubServiceToFirebase = async () => {
    if (!name.trim() || !price) {
      Swal.fire({
        icon: "error",
        title: "Both Name and Price are required!",
      });
      return;
    }
  
    try {
      await addDoc(collection(db, "SubServices"), {
        name: name,
        price: price,
        serviceId: id,
      });
      Swal.fire({
        icon: "success",
        title: "Sub-service Added Successfully!",
      });
      setName("");
      setPrice("");
    } catch (error) {
      console.error("Error adding sub-service: ", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to add sub-service. Please try again later.",
      });
    }
  };

  const deleteSubService = async (subServiceId) => {
    try {
      await deleteDoc(doc(db, "SubServices", subServiceId));
      Swal.fire({
        icon: "success",
        title: "Sub-service Deleted Successfully!",
      });
    } catch (error) {
      console.error("Error deleting sub-service: ", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to delete sub-service. Please try again later.",
      });
    }
  };

  const showModal = (subService) => {
    setEditName(subService.name);
    setEditPrice(subService.price);
    setEditId(subService.id);
    setIsModalVisible(true);
  };

  const handleEdit = async () => {
    try {
      await updateDoc(doc(db, "SubServices", editId), {
        name: editName,
        price: Number(editPrice),
      });
      setIsModalVisible(false);
      Swal.fire({
        icon: "success",
        title: "Sub-service Updated Successfully!",
      });
    } catch (error) {
      console.error("Error updating sub-service: ", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to update sub-service. Please try again later.",
      });
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <AdminSideNav />
      <div className="flex justify-center pb-10 pt-4">
        <div className="max-w-[400px] px-10">
          <div className="flex flex-col justify-center gap-3">
            <h3 className="font-bold text-center mb-4">
              Add Sub-Service to
              <span className="text-[red]"> {servname}</span>{" "}
            </h3>
            <div>
              <label>Sub Service Name</label>
              <Input
                placeholder="Sub Service Name"
                type="text"
                size="large"
                value={name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </div>

            <div>
              <label>Price</label>
              <Input
                placeholder="Sub Service Price"
                type="number"
                size="large"
                value={price}
                onChange={(e) => handleInputChange("price", e.target.value)}
              />
            </div>

            <Button
              size="large"
              className="block px-6 mt-2 rounded-lg bg-gradient-to-r from-sky-600 to-cyan-400 text-center text-white"
              onClick={addSubServiceToFirebase}
              
            >
              Add Service +
            </Button>
          </div>
        </div>
      </div>

      {subServices.length > 0 ? (
        <div>
          <h3 className="font-bold text-center mb-10">List of Sub Services</h3>
          <div className="flex items-center px-10 my-10">
            <Row gutter={[8, 16]}>
              {subServices.map((subService, index) => (
                <Col key={index}>
                  <Card>
                    <h3 className="text-lg text_lato font-bold">
                      <span className="text-[red]">Name:</span>{" "}
                      {subService.name}
                    </h3>
                    <p className="text-lg text_lato font-bold mt-2">
                      <span className="text-[red]">Per Item Price:</span>{" "}
                      {`${subService.price}£`}
                    </p>

                    <div className="flex gap-4">
                      <Button
                        type="primary"
                        className="mt-4 bg-[#0890F3]"
                        onClick={() => showModal(subService)}
                      >
                        <div className="flex gap-2">
                          <EditOutlined /> <span>Edit</span>
                        </div>
                      </Button>

                      <Button
                        type="primary"
                        className="mt-4 bg-red-600"
                        onClick={() => deleteSubService(subService.id)}
                      >
                        <div className="flex gap-2">
                          <DeleteOutlined />
                          <span>Remove</span>
                        </div>
                      </Button>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      ) : (
        <div className="text-center font-semibold text-red-600">No sub services available</div>
      )}

      <Modal
        title="Edit Sub Service"
        visible={isModalVisible}
        footer={[
          <Button key="cancel" className="bg-red-600 text-white" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" className="bg-[#0890F3] text-white" onClick={handleEdit}>
            Save
          </Button>,
        ]}
      >
        <div>
          <label>Sub Service Name</label>
          <Input
            placeholder="Sub Service Name"
            type="text"
            size="large"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />
        </div>

        <div>
          <label>Price</label>
          <Input
            placeholder="Sub Service Price"
            type="number"
            size="large"
            value={editPrice}
            onChange={(e) => setEditPrice(e.target.value)}
          />
        </div>
      </Modal>
    </div>
  );
}

export default SubServiceCreationAndUpdation;
