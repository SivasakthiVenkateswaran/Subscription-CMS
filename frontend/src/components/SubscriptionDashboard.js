import React, { useState, useEffect } from "react";
import SubscriptionTable from "./SubscriptionTable";
import './SubscriptionDashboard.css';

const API_URL = "http://localhost:5000/api/subscriptions";

export default function SubscriptionDashboard() {
  const [formData, setFormData] = useState({
    platform: "",
    plan: "",
    price: "",
    startDate: "",
    expiryDate: "",
    autoRenewal: false,
  });

  const [subscriptions, setSubscriptions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Redirect to login if token not found
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/"; // redirect to login page
    }
  }, []);

  // Fetch subscriptions
  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(API_URL, {
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Unauthorized or Failed to fetch data");
        }
        return res.json();
      })
      .then(setSubscriptions)
      .catch(console.error);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const data = {
      platform: formData.platform,
      plan: formData.plan,
      price: parseFloat(formData.price),
      startDate: formData.startDate,
      expiryDate: formData.expiryDate,
      autoRenewal: formData.autoRenewal,
    };

    try {
      const res = await fetch(
        editingId ? `${API_URL}/${editingId}` : API_URL,
        {
          method: editingId ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify(data),
        }
      );

      if (!res.ok) throw new Error("Submission failed");

      const result = await res.json();

      if (editingId) {
        setSubscriptions((subs) =>
          subs.map((s) => (s._id === result._id ? result : s))
        );
        setEditingId(null);
      } else {
        setSubscriptions([...subscriptions, result]);
      }

      setFormData({
        platform: "",
        plan: "",
        price: "",
        startDate: "",
        expiryDate: "",
        autoRenewal: false,
      });

      setShowForm(false);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      });

      setSubscriptions(subscriptions.filter((sub) => sub._id !== id));
    } catch (error) {
      console.error("Error deleting subscription:", error);
    }
  };

  const handleEdit = (sub) => {
    setFormData({
      platform: sub.platform,
      plan: sub.plan,
      price: sub.price,
      startDate: sub.startDate,
      expiryDate: sub.expiryDate,
      autoRenewal: sub.autoRenewal,
    });
    setEditingId(sub._id);
    setShowForm(true);
  };

  return (
    <div className="dashboard-container">
      <h1 className="subscription-title">OTT Subscription Dashboard</h1>
      <button onClick={() => setShowForm(!showForm)} className="submit-btn">
        {showForm ? "Close Form" : "Add New Subscription"}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="subscription-form">
          <input
            type="text"
            name="platform"
            placeholder="Platform"
            value={formData.platform}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="plan"
            placeholder="Plan"
            value={formData.plan}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            required
          />
          <label>
            <input
              type="checkbox"
              name="autoRenewal"
              checked={formData.autoRenewal}
              onChange={handleChange}
            />
            Auto-renewal
          </label>
          <button type="submit" className="submit-btn">
            {editingId ? "Update" : "Add"}
          </button>
        </form>
      )}

      <SubscriptionTable
        subscriptions={subscriptions}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
}
