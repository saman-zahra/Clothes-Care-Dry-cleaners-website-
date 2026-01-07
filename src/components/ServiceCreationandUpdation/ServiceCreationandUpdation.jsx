/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../firebaseConfig";
import { Card, Row, Col, Button, Input, Modal } from "antd";
import {
  collection,
  addDoc,
  getFirestore,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc, // Import updateDoc for editing
} from "firebase/firestore";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const { Meta } = Card;
const { TextArea } = Input;

function ServiceCreationandUpdation() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [services, setServices] = useState([]);
  const [editModalVisible, setEditModalVisible] = useState(false); // State for edit modal visibility
  const [editedName, setEditedName] = useState(""); // State for edited name
  const [editedDescription, setEditedDescription] = useState(""); // State for edited description
  const [editedServiceId, setEditedServiceId] = useState(""); // State for service ID being edited

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "Service"), (snapshot) => {
      const servicesData = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setServices(servicesData);
    });

    // Cleanup function to unsubscribe from the snapshot listener when the component unmounts
    return () => unsubscribe();
  }, []);

  const deleteService = async (serviceId) => {
    try {
      // Delete the service document
      await deleteDoc(doc(db, "Service", serviceId));

      Swal.fire({
        icon: "success",
        title: "Service deleted successfully!",
      });
    } catch (error) {
      console.error("Error deleting service: ", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to delete service. Please try again later.",
      });
    }
  };

  const addServiceToFirebase = async () => {
    // Check if both name and description are not empty
    if (name.trim() === "" || description.trim() === "") {
      Swal.fire({
        icon: "error",
        title: "Both fields are mandatory",
      });
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "Service"), {
        description: description,
        name: name,
      });
      console.log("Document written with ID: ", docRef.id);
      Swal.fire({
        icon: "success",
        title: "Service Added Successfully",
      });
      // Resetting input fields after successful addition
      setName("");
      setDescription("");
      // Disable button after submission
      setButtonDisabled(true);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const handleInputChange = (inputName, value) => {
    if (inputName === "name") {
      setName(value);
    } else if (inputName === "description") {
      setDescription(value);
    }

    if (name && description) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  };

  const handleEditModalOpen = (service) => {
    setEditedName(service.name);
    setEditedDescription(service.description);
    setEditedServiceId(service.id);
    setEditModalVisible(true);
  };

  const handleEditModalCancel = () => {
    setEditModalVisible(false);
  };

  const handleEditSubmit = async () => {
    try {
      await updateDoc(doc(db, "Service", editedServiceId), {
        name: editedName,
        description: editedDescription,
      });
      setEditModalVisible(false);
      Swal.fire({
        icon: "success",
        title: "Service Updated Successfully",
      });
    } catch (error) {
      console.error("Error updating service: ", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to update service. Please try again later.",
      });
    }
  };

  return (
    <div>
      {/* <div className="flex justify-center pb-10">
        <div className="max-w-[400px] px-10  ">
          <div className="flex flex-col justify-center gap-3">
            <h3 className=" font-bold text-center mb-4">Add a New Service</h3>
            <div>
              <label>Service Name</label>
              <Input
                placeholder="Service Name"
                type="text"
                size="large"
                value={name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </div>

            <div>
              <label>Service Description</label>
              <TextArea
                placeholder="Order Details"
                allowClear
                rows={4}
                value={description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
              />
            </div>

            <Button
              size="large"
              className="block px-6  mt-2 rounded-lg bg-gradient-to-r from-sky-600 to-cyan-400 text-center text-white"
              onClick={addServiceToFirebase}
              disabled={buttonDisabled}
            >
              Add Service +
            </Button>
          </div>
        </div>
      </div> */}

      {services.length > 0 ? (
        <div>
          <h3 className=" font-bold text-center mb-10">List of Services</h3>
          <div className="flex items-center px-10 my-10">
            <Row gutter={[8, 16]}>
              {services.map((service, index) => (
                <Col key={index}>
                  <Card className="max-w-[400px]">
                    <Meta
                      className="servicesCards"
                      title={service.name}
                      description={service.description}
                    />

                    <div className="flex gap-4 ">
                      <Button
                        type="primary"
                        className="mt-4 bg-[#0890F3]"
                        onClick={() =>
                          navigate(`/subService/${service.id}/${service.name}`)
                        }
                      >
                        <div className="flex gap-2">
                          <EyeOutlined /> <span>Show Details</span>
                        </div>
                      </Button>
                      {/* <Button
                        type="primary"
                        className="mt-4 bg-[#0890F3]"
                        onClick={() => handleEditModalOpen(service)} // Open edit modal on click
                      >
                        <div className="flex gap-2">
                          <EditOutlined /> <span>Edit</span>
                        </div>
                      </Button>

                      <Button
                        type="primary"
                        className="mt-4 bg-red-600"
                        onClick={() => deleteService(service.id)}
                      >
                        <div className="flex gap-2">
                          <DeleteOutlined />
                          <span>Remove</span>
                        </div>
                      </Button> */}
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      ) : (
        <div className="text-center font-semibold text-red-600 mb-10">
          No services available
        </div>
      )}

      {/* Edit Modal */}
      <Modal
        title="Edit Service"
        visible={editModalVisible}
        footer={[
          <Button
            key="cancel"
            className="bg-red-600 text-white"
            onClick={handleEditModalCancel}
          >
            Cancel
          </Button>,
          <Button
            key="submit"
            className="bg-[#0890F3] text-white"
            onClick={handleEditSubmit}
          >
            Save
          </Button>,
        ]}
      >
        <div>
          <label>Service Name</label>
          <Input
            placeholder="Service Name"
            type="text"
            size="large"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
        </div>
        <div>
          <label>Service Description</label>
          <TextArea
            placeholder="Service Description"
            allowClear
            rows={4}
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          />
        </div>
      </Modal>
    </div>
  );
}

export default ServiceCreationandUpdation;
