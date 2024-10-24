import { Edit, Trash2 } from "lucide-react";
import PropTypes from 'prop-types';
import axiosInstance from "../../config/axiosService";
import { useNavigate } from 'react-router-dom';


const MenuItem = ({ item, onDelete }) => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('MenuItem/DeleteMenuItem', {
        id: item._id
      });
      if (response.status === 200) {
        console.log('Form submitted successfully');
        onDelete(item._id); // Call the onDelete function to update the parent state
      } else {
        console.error('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden animate-fadeInUp">
      <input type="hidden" value={item._id} />
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-32 object-cover rounded-md mb-2"
      />
      <h3 className="font-semibold dark:text-white">{item.name}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300">{item.description}</p>
      <p className="text-lg font-bold text-primary mt-2">
        ${item.price.toFixed(2)}
      </p>
      <div className="flex justify-end mt-2">
        <button className="text-green-500 mr-2 rounded-full bg-slate-200 dark:bg-slate-800 p-2">
          <Edit size={16} />
        </button>
        <form onSubmit={handleSubmit}>
          <input type="hidden" id="id" name="id" value={item._id} />
          <button type="submit" className="text-red-500 rounded-full bg-slate-200 dark:bg-slate-800 p-2">
            <Trash2 size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};

MenuItem.propTypes = {
  item: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired, // Add prop type for onDelete
};

export default MenuItem;
