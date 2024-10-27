import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Eye, CheckCircle, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, Toaster } from 'sonner';
import OrderDetailsModal from '../../../components/OrderDetailsModal';
import { axiosInstance } from '../../../config/axiosService';
import { useParams } from 'react-router-dom';

const ViewOrders = () => {
  const { t } = useTranslation();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await axiosInstance.get(`/Orders/GetAllOrders/${id}`);
      setOrders(response.data);
      // console.log(response.data)
      setFilteredOrders(response.data);
    };
    console.log("test  1 ",filteredOrders)
    console.log("test  2 ",orders)
    fetchOrders();
  }, [id]);
  
  // useEffect(() => {
  //   const filtered = orders.filter(order => 
  //     (order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     order._id.toString().includes(searchTerm)) &&
  //     (statusFilter === 'all' || order.status === statusFilter)
  //   );
  //   setFilteredOrders(filtered);
  // }, [searchTerm, statusFilter, orders]); // Ensure this effect runs when these dependencies change
  
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      // Send the status update to the backend
      await axiosInstance.post(`/Orders/UpdateOrderStatus`, { orderId, newStatus });
      const updatedOrders = orders.map(order => 
        order._id === orderId ? { ...order, status: newStatus } : order
      );
      setOrders(updatedOrders);
      toast.success(t('Order status updated successfully'));
    } catch (error) {
      toast.error(t('Failed to update order status'));
      console.error(error);
    }
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  return (
    <div className="container mx-auto p-6 bg-white dark:bg-slate-900 rounded-md shadow-md">
      <Toaster richColors />
      <h1 className="text-3xl font-bold mb-6 dark:text-white">{t('Order Management')}</h1>
      
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div className="relative w-full md:w-1/3 mb-4 md:mb-0">
          <input
            type="text"
            placeholder={t('Search orders...')}
            className="w-full pl-10 pr-4 py-2 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-slate-900 dark:border-slate-700 dark:text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
        
        <div className="flex items-center">
          <select
            className="px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-slate-900 dark:border-slate-700 dark:text-white"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">{t('All Statuses')}</option>
            <option value="pending">{t('Pending')}</option>
            <option value="completed">{t('Completed')}</option>
            <option value="cancelled">{t('Cancelled')}</option>
          </select>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-md overflow-hidden shadow-md">
        <table className="w-full">
          <thead className="bg-white dark:bg-slate-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                {t('Order ID')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                {t('Customer')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                {t('Total')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                {t('Status')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                {t('Actions')}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y bg-white dark:bg-slate-800 divide-slate-200 dark:divide-slate-700">
            {Array.isArray(orders)?(
              orders.map((order) => (
                <motion.tr 
                  key={order._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="hover:bg-slate-50 dark:hover:bg-slate-900"
                >
                  <td className="px-6 py-4 whitespace-nowrap dark:text-white">{order._id}</td>
                  <td className="px-6 py-4 whitespace-nowrap dark:text-white">{order.client}</td>
                  <td className="px-6 py-4 whitespace-nowrap dark:text-white">${((order.items[0].menuItem.price)*(order.items[0].quantity)).toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${order.status === 'pending' ? 'bg-yellow-500 text-slate-50' : 
                        order.status === 'preparing' ? 'bg-green-500 text-slate-50' : 
                        order.status === 'completed' ? 'bg-blue-500 text-slate-50' : 
                        order.status === 'cancelled' ? 'bg-red-500 text-slate-50' : 
                        'bg-gray-500 text-slate-50'}`}> 
                      {t(order.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-indigo-600 hover:text-indigo-700 mr-2" onClick={() => handleViewDetails(order)}>
                      <Eye size={22} />
                    </button>
                    {order.status === 'pending' && (
                      <>
                        <button 
                          className="text-green-600 hover:text-green-700 mr-2"
                          onClick={() => handleStatusChange(order._id, 'preparing')}
                        >
                          <CheckCircle size={22} />
                        </button>
                        <button 
                          className="text-red-600 hover:text-red-700"
                          onClick={() => handleStatusChange(order._id, 'cancelled')}
                        >
                          <XCircle size={22} />
                        </button>
                      </>
                    )}
                    {order.status === 'preparing' && (
                      <button 
                        className="text-blue-600 hover:text-blue-700"
                        onClick={() => handleStatusChange(order._id, 'ready_for_delivery')}
                      >
                         <CheckCircle size={22} />
                      </button>
                    )}
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 dark:text-white">{t('No orders found')}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <AnimatePresence>
        {isModalOpen && (
          <OrderDetailsModal 
            order={selectedOrder} 
            isOpen={isModalOpen} 
            onClose={closeModal} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ViewOrders;
