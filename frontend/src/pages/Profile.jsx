import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";

function Profile() {
  const { auth, setAuth } = useContext(AuthContext);
  const { user, token } = auth;

  const [formData, setFormData] = useState({
    salary: "",
    categoryName: "",
    budget: "",
    name: "",
    email: "",
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
    if (user) {
      setFormData({
        ...formData,
        name: user.name,
        email: user.email,
        salary: user.salary,
      });
    }
  }, [user]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/api/categories", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories(response.data);
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitCategory = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "/api/categories",
        {
          name: formData.categoryName,
          budget: formData.budget,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchCategories(); // Refresh the category list
      setFormData({ ...formData, categoryName: "", budget: "" });
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        "/api/users/update-profile",
        {
          salary: formData.salary,
          name: formData.name,
          email: formData.email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchCategories(); // Refresh the category list if needed
      setAuth((prevState) => ({
        ...prevState,
        user: {
          ...prevState.user,
          salary: formData.salary,
          name: formData.name,
          email: formData.email,
        },
      }));
      alert("Profile updated successfully!");
      setShowUserModal(false); // Close the user update modal
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchCategories(); // Refresh the category list
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `/api/categories/${currentCategory._id}`,
        {
          name: formData.categoryName,
          budget: formData.budget,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchCategories(); // Refresh the category list
      setShowCategoryModal(false); // Close the category update modal
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  const handleShowCategoryModal = (category) => {
    setCurrentCategory(category);
    setFormData({ categoryName: category.name, budget: category.budget });
    setShowCategoryModal(true);
  };

  const handleCloseCategoryModal = () => {
    setShowCategoryModal(false);
    setFormData({ categoryName: "", budget: "" });
  };

  const handleShowUserModal = () => {
    setShowUserModal(true);
  };

  const handleCloseUserModal = () => {
    setShowUserModal(false);
  };

  return (
    <div style={{ width: "50%" }}>
      <h2>Profile</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {user && (
        <Card style={{ marginBottom: "20px" }}>
          <Card.Body>
            <Card.Title>{user.name}</Card.Title>
            <Card.Text>Email: {user.email}</Card.Text>
            <Card.Text>Salary: {user.salary}</Card.Text>
          </Card.Body>
        </Card>
      )}

      <Button variant="primary" onClick={handleShowUserModal}>
        Update Profile
      </Button>

      <Form onSubmit={handleSubmitCategory} style={{ marginTop: "20px" }}>
        <Form.Group className="mb-3" controlId="formBasicCategoryName">
          <Form.Label>Category Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter category name"
            name="categoryName"
            value={formData.categoryName}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicBudget">
          <Form.Label>Budget</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Category
        </Button>
      </Form>

      <h3>Categories</h3>
      <ListGroup>
        {categories.map((category) => (
          <ListGroup.Item key={category._id}>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p>Name: {category.name}</p>
                <p>Budget: {category.budget}</p>
              </div>
              <Button
                variant="warning"
                onClick={() => handleShowCategoryModal(category)}
              >
                Update
              </Button>
              <Button
                variant="danger"
                onClick={() => handleDelete(category._id)}
              >
                Delete
              </Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>

      <Modal show={showCategoryModal} onHide={handleCloseCategoryModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdateCategory}>
            <Form.Group className="mb-3" controlId="formBasicCategoryName">
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category name"
                name="categoryName"
                value={formData.categoryName}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicBudget">
              <Form.Label>Budget</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Update
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showUserModal} onHide={handleCloseUserModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdateUser}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicSalary">
              <Form.Label>Salary</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter salary"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Update Profile
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Profile;
