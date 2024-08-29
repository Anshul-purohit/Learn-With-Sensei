import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useShared } from '../SharedContext';
import { useTheme } from './ThemeContext';

const CourseFirst = () => {
    const {isDarkMode} = useTheme();
    const navigate = useNavigate();
    const { coursebyId } = useParams();
    const { userid } = useShared();
    const [name, setName] = useState(null);
    const [description, setDescription] = useState(null);
    const [thumbnail, setThumbnail] = useState(null);
    const [price, setPrice] = useState(null);
    const [key, setKey] = useState("rzp_test_I00lRzZYSoVKAK");
    const [userBought,setUserBought] = useState(false)
    console.log("d ",price)

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/v1/courses/${coursebyId}`, { withCredentials: true });
                console.log(response.data)
                let x = response.data.data.course[0];
                let y = response.data.data.users_bought_course_id
                y.map((user) => {
                    if(user === userid)
                        setUserBought(true)
                })
                console.log("XX : ",x)
                setName(x.name);
                setDescription(x.description);
                setThumbnail(x.thumbnail);
                setPrice(x.price);
            } catch (error) {
                console.log(error);
                navigate('/Login');
            }
        };

        fetchCourse();
    }, [coursebyId, navigate]);

    const loadRazorpayScript = () => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
    };

    useEffect(() => {
        loadRazorpayScript();
    }, []);

    const handleBuyClick = async () => {
        try {
            // Step 1: Create a payment order in your backend
            const orderResponse = await axios.post('http://localhost:8000/api/v1/payments/course-payment', {
                fee: price
            }, {
                withCredentials: true
            });
            
            console.log(orderResponse.data)
            const { id, amount, currency } = orderResponse.data.data;

            // Step 2: Fetch Razorpay key from the backend (if dynamic)
            const razorKeyResponse = await axios.get('http://localhost:8000/api/v1/payments/razorkey', {
                withCredentials: true
            });
            
            const razorpayKey = razorKeyResponse.data.key;

            // Step 3: Prepare Razorpay options
            console.log("ddd : ",amount)
            const options = {
                key: razorpayKey || key,
                amount: amount.toString(),
                currency: currency,
                order_id: id,
                handler: function (response) {
                    console.log(response);
                    alert("This step of Payment Succeeded");
                    // Verify payment on the server-side
                    axios.post(`http://localhost:8000/api/v1/payments/payment-verification/${coursebyId}`, {
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_signature: response.razorpay_signature
                    }, {
                        withCredentials: true
                    }).then((verifyResponse) => {
                        console.log("Payment verified", verifyResponse.data);
                    }).catch((error) => {
                        console.log("Error in payment verification:", error);
                    });
                },
                prefill: {
                    name: "User Name",  // You can fetch and set user details
                    email: "user@example.com",
                    contact: "9999999999"
                },
                notes: {
                    address: "Your Company Address"
                },
                theme: {
                    color: "#3399cc"
                }
            };

            const razorpayObject = new window.Razorpay(options);
            razorpayObject.on('payment.failed', function (response) {
                console.log(response);
                alert("This step of Payment Failed");
            });

            razorpayObject.open();

        } catch (error) {
            console.log("Error in payment flow:", error);
        }
    };

    const handleExploreClick = () => {
        navigate(`/Course/${coursebyId}`)
    }

    return (
           <div className={` text-gray-100 py-8 w-full min-h-[200px] ${isDarkMode ? 'bg-gray-950' : 'bg-white'}`}>
                 <div className={`flex flex-col lg:flex-row p-6 max-w-5xl mx-auto ${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-white text-gray-900'} shadow-lg rounded-lg mt-10 mb-20`}>
                <div className={`flex-1 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} flex justify-center items-center`}>
                    <img 
                        src={thumbnail} 
                        alt={name} 
                        className="w-64 object-cover lg:rounded-r-none" 
                    />
                </div>
    
                {userBought ?  
                    <div className="flex-1 p-6 flex flex-col justify-between">
                        <h1 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{name}</h1>
                        <p style={{ textAlign: 'justify' }} className={`mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>{description}</p>
                        <div className="mt-auto">
                            <div className={`bg-gradient-to-r from-gray-500 to-gray-700 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl ${isDarkMode ? 'bg-gray-700' : 'bg-gray-500'}`}>
                                <button 
                                    onClick={handleExploreClick}
                                    className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white py-3 px-6 rounded-full shadow-md focus:outline-none focus:ring-4 focus:ring-green-300 transform transition-all hover:scale-105"
                                >
                                    Explore Now
                                </button>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="flex-1 p-6 flex flex-col justify-between">
                        <h1 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{name}</h1>
                        <p style={{ textAlign: 'justify' }} className={`mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>{description}</p>
                        <div className="mt-auto">
                            <div className={`bg-gradient-to-r from-gray-500 to-gray-700 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl ${isDarkMode ? 'bg-gray-700' : 'bg-gray-500'}`}>
                                <h2 className="text-2xl font-bold mb-4">Price: ₹{price}</h2>
                                <button 
                                    onClick={handleBuyClick}
                                    className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white py-3 px-6 rounded-full shadow-md focus:outline-none focus:ring-4 focus:ring-orange-300 transform transition-all hover:scale-105"
                                >
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </div>
                }
            </div>
           </div>
        
    );
}

export default CourseFirst;
