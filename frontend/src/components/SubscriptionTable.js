import React from "react";
import './SubscriptionTable.css'
export default function SubscriptionTable({ subscriptions, onDelete, onEdit }) {
  return (
    <table className="subscription-table">
      <thead>
        <tr>
          <th>Platform</th>
          <th>Plan</th>
          <th>Price</th>
          <th>Start Date</th>
          <th>Expiry Date</th>
          <th>Auto-Renewal</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {subscriptions.map((sub) => (
          <tr key={sub._id}>
            <td>{sub.platform}</td>
            <td>{sub.plan}</td>
            <td>${sub.price.toFixed(2)}</td>
            <td>{sub.startDate}</td>
            <td>{sub.expiryDate}</td>
            <td>{sub.autoRenewal ? "Yes" : "No"}</td>
            <td>
              <button onClick={() => onEdit(sub)}>Edit</button>
              <button onClick={() => onDelete(sub._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
