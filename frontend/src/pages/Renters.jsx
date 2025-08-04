import { useState, useEffect } from "react";
import axiosInstance from "../axiosConfig";
import RenterForm from "../components/RenterForm";
import { useAuth } from "../context/AuthContext";

const Renters = () => {
  const { user } = useAuth();
  const [renters, setRenters] = useState([]);
  const [editingRenter, setEditingRenter] = useState(null);

  useEffect(() => {
    const fetchRenters = async () => {
      try {
        const response = await axiosInstance.get("/api/renters", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setRenters(response.data);
      } catch (error) {
        alert("Failed to fetch Renters.");
      }
    };

    fetchRenters();
  }, [user]);

  return (
    <div className="container mx-auto p-6">
      <RenterForm
        renters={renters}
        setRenters={setRenters}
        editingRenter={editingRenter}
        setEditingRenter={setEditingRenter}
      />
    </div>
  );
};

export default Renters;
