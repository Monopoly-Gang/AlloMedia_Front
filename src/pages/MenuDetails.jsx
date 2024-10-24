import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Minus, Plus } from "lucide-react";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";


const MenuDetails = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [menuItem, setMenuItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addOns, setAddOns] = useState([]);

  const dispatch = useDispatch();

  const fakeMenuItem = {
    id: "1006",
    name: "Double Patty Veg Burger",
    description: "A delicious veg burger with double patty.",
    price: 20.0,
  };

  // function add to cart
  const handleAddToCart = () =>{
    dispatch(addToCart({...fakeMenuItem,quantity}));
  }

  useEffect(() => {
    const fetchMenuItem = async () => {
      try {
        // Mock data
        const mockData = {
          id: "1001",
          name: "Double Patty Veg Burger",
          description: "A delicious veg burger with double patty.",
          price: 20.0,
          image: "https://via.placeholder.com/400",
          addOns: [
            {
              id: "2001",
              name: "French Fries",
              price: 3.0,
              image: "https://via.placeholder.com/50",
              selected: false,
            },
            {
              id: "2002",
              name: "Extra Cheese",
              price: 2.0,
              image: "https://via.placeholder.com/50",
              selected: false,
            },
            {
              id: "2003",
              name: "Coca Cola",
              price: 1.5,
              image: "https://via.placeholder.com/50",
              selected: false,
            },
            {
              id: "2004",
              name: "Choco Lava",
              price: 4.0,
              image: "https://via.placeholder.com/50",
              selected: false,
            },
          ],
        };
        setMenuItem(mockData);
        setAddOns(mockData.addOns);
      } catch (error) {
        console.error("Error fetching menu item:", error);
      }
    };

    fetchMenuItem();
  }, [id]);

  

  const handleQuantityUpdate = (amount) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  };

  const handleAddOnChange = (id) => {
    setAddOns((prevAddOns) =>
      prevAddOns.map((addOn) =>
        addOn.id === id ? { ...addOn, selected: !addOn.selected } : addOn
      )
    );
  };

  // const calculateTotalPrice = () => {
  //   const addOnsPrice = addOns
  //     .filter((addOn) => addOn.selected)
  //     .reduce((total, addOn) => total + addOn.price, 0);
  //   return (menuItem.price + addOnsPrice) * quantity;
  // };

  if (!menuItem) {
    return <div>{t("Loading...")}</div>;
  }

  // const totalPrice = calculateTotalPrice().toFixed(2);

  return (
    <section className="py-10 md:py-20 lg:py-14 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row border border-slate-200 dark:border-slate-700 rounded-md p-4">
          <img
            src={menuItem.image}
            alt={menuItem.name}
            className="w-full md:w-1/2 h-96 object-cover rounded-md"
          />
          <div className="md:ml-6 mt-4 md:mt-0 flex-1 space-y-4">
            <h1 className="text-3xl font-bold mb-2 text-slate-900 dark:text-slate-50">
              {menuItem.name}
            </h1>
            <p className="text-slate-900 dark:text-slate-200 mb-4">
              {menuItem.description}
            </p>
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold text-primary">
                {/* ${totalPrice} */}
              </span>
              <div className="flex items-center ml-4">
                <button
                  onClick={() => handleQuantityUpdate(-1)}
                  className="px-2 py-1 bg-gray-200 dark:bg-slate-800 text-slate-900 dark:text-slate-50 rounded"
                >
                  <Minus size={18} />
                </button>
                <span className="mx-2 text-slate-900 dark:text-slate-50 font-semibold">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityUpdate(1)}
                  className="px-2 py-1 bg-gray-200 dark:bg-slate-800 text-slate-900 dark:text-slate-50 rounded"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-2">
              {t("Add On")}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {addOns.map((addOn) => (
                <div
                  key={addOn.id}
                  className="flex items-center border border-slate-200 dark:border-slate-700 p-2 rounded-md"
                >
                  <img
                    src={addOn.image}
                    alt={addOn.name}
                    className="w-12 h-12 rounded-full border-2 border-primary mr-2"
                  />
                  <span className="flex-1 text-slate-900 dark:text-slate-50 font-semibold text-base">
                    {addOn.name}
                  </span>
                  <div className="form-control">
                    <label className="cursor-pointer label">
                      <input
                        type="checkbox"
                        checked={addOn.selected}
                        onChange={() => handleAddOnChange(addOn.id)}
                        className="checkbox border-primary [--chkbg:theme(colors.primary.DEFAULT)] [--chkfg:theme(colors.slate.50)] w-5 h-5"
                      />
                    </label>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex space-x-4 mb-4">
              <button onClick={handleAddToCart} className="bg-primary text-white text-base font-semibold px-4 py-2 rounded-md hover:bg-primary/80 transition duration-300">
                {t("Add To Cart")} 
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MenuDetails;