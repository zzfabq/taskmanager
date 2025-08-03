import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const RenterForm = ({ renters, setRenters, editingRenter, setEditingRenter }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({ phone: '', address: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingRenter) {
      setFormData({
        phone: editingRenter.phone || '',
        address: editingRenter.address || '',
      });
    } else {
      setFormData({ phone: '', address: '' });
    }
  }, [editingRenter]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (editingRenter) {
        // Update existing Renter profile
        const response = await axiosInstance.put('/api/renters', formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        // Update the renters list
        setRenters(renters.map((renter) => 
          (renter._id === response.data._id ? response.data : renter)
        ));
      } else {
        // Create new renter profile
        const response = await axiosInstance.post('/api/renters', formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setRenters(response.data);
      }
      
      // Reset form
      setEditingRenter(null);
      setFormData({ phone: '', address: '' });
      alert(editingRenter ? 'Renter profile updated successfully!' : 'Renter profile created successfully!');
      
    } catch (error) {
      console.error('Error saving Renter:', error);
      const errorMessage = error.response?.data?.message || 'Failed to save Renter profile.';
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded mb-6">
      <h1 className="text-2xl font-bold mb-4">
        {editingRenter ? 'Edit Renter Profile' : 'Create Renter Profile'}
      </h1>
      
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Phone Number
        </label>
        <input
          type="tel"
          placeholder="Enter phone number (e.g., +61 4XX XXX XXX)"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Address
        </label>
        <textarea
          placeholder="Enter your address"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          className="w-full p-2 border rounded focus:outline-none focus:border-blue-500 h-24 resize-none"
        />
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className={`w-full p-2 rounded text-white font-semibold ${
          loading 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {loading 
          ? 'Saving...' 
          : (editingRenter ? 'Update Renter Profile' : 'Create Renter Profile')
        }
      </button>
    </form>
  );
};

export default RenterForm;
