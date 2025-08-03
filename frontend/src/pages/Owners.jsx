import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import OwnerForm from '../components/OwnerForm';
import { useAuth } from '../context/AuthContext';

const Owners = () => {
  const { user } = useAuth();
  const [owners, setOwners] = useState([]);
  const [editingOwner, setEditingOwner] = useState(null);

  useEffect(() => {
    const fetchOwners = async () => {
      try {
        const response = await axiosInstance.get('/api/owners', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setOwners(response.data);
      } catch (error) {
        alert('Failed to fetch owners.');
      }
    };

    fetchOwners();
  }, [user]);

  return (
    <div className="container mx-auto p-6">
      <OwnerForm
        owners={owners}
        setOwners={setOwners}
        editingOwner={editingOwner}
        setEditingOwner={setEditingOwner}
      />
    </div>
  );
};

export default Owners;
