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

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
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

    const data = {
      platform: formData.platform,
      plan: formData.plan,
      price: parseFloat(formData.price),
      startDate: formData.startDate,
      expiryDate: formData.expiryDate,
      autoRenewal: formData.autoRenewal,
    };

    if (editingId) {
      const res = await fetch(`${API_URL}/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const updated = await res.json();
      setSubscriptions((subs) =>
        subs.map((s) => (s._id === updated._id ? updated : s))
      );
      setEditingId(null);
    } else {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const newSub = await res.json();
      setSubscriptions([...subscriptions, newSub]);
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
  };

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    setSubscriptions(subscriptions.filter((sub) => sub._id !== id));
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
