import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Booking = () => {
   const navigate = useNavigate();
   const handleLogout = () => {
      localStorage.clear();
      navigate('/home');
   };
   const selectedShow = JSON.parse(localStorage.getItem('selectedShow'));
   const { name, image, updatedScore, genres, summary } = selectedShow;
   const imageSrc = image?.medium;
   const hasHtmlTags = /<\/?[a-z][\s\S]*>/i.test(summary);

   const [isExpanded, setIsExpanded] = useState(false);
   const truncatedSummary = summary.slice(0, 1000);

   document.getElementsByTagName('body')[0].style.backgroundColor = '#374151';

   const [isBooking, setIsBooking] = useState(false);
   const [formData, setFormData] = useState({
      name: '',
      email: '',
   });

   const handleBooking = () => {
      setIsBooking(true);
   };

   const handleSubmit = (event) => {
      event.preventDefault();
      setFormData({ name: '', email: '' });
      if (formData.name !== '' && formData.email !== '') {
         alert('Booking Successful, Check Your Email For Confirmation');
      }
      if (formData.name === '' || formData.email === '') {
         alert('Please make sure to fill all the fields');
      }
   };

   const handleInputChange = (event) => {
      const { name, value } = event.target;
      setFormData((prevState) => ({
         ...prevState,
         [name]: value,
      }));
   };

   const handleCancel = () => {
      setIsBooking(false);
      setFormData({
         name: '',
         email: '',
      });
   };

   return (
      <React.Fragment>
         {isBooking && (
            <div
               style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
               }}
            >
               <div
                  style={{
                     backgroundColor: '#fff',
                     position: 'absolute',
                     top: '50%',
                     left: '50%',
                     transform: 'translate(-50%, -50%)',
                     padding: '2rem',
                     borderRadius: '0.5rem',
                  }}
               >
                  <h2 className="text-2xl font-bold mb-4">
                     Booking Details <br /> For The {name}{' '}
                  </h2>
                  <form onSubmit={handleSubmit}>
                     <div className="mb-4">
                        <label
                           className="block text-gray-700 font-bold mb-2"
                           htmlFor="name"
                        >
                           Your Name:
                        </label>
                        <input
                           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                           id="name"
                           name="name"
                           type="text"
                           placeholder="Enter your name"
                           value={formData.name}
                           onChange={handleInputChange}
                        />
                     </div>
                     <div className="mb-4">
                        <label
                           className="block text-gray-700 font-bold mb-2"
                           htmlFor="email"
                        >
                           Email:
                        </label>
                        <input
                           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                           id="email"
                           name="email"
                           type="email"
                           placeholder="Enter email"
                           value={formData.email}
                           onChange={handleInputChange}
                        />
                     </div>
                     <div className="flex justify-between">
                        <button
                           className="bg-gray-600 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-full w-2/5"
                           type="submit"
                           onSubmit={handleSubmit}
                        >
                           Submit
                        </button>
                        <button
                           className="bg-gray-600 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-full w-2/5"
                           type="button"
                           onClick={handleCancel}
                        >
                           Cancel
                        </button>
                     </div>
                  </form>
               </div>
            </div>
         )}
         <div
            style={{ marginTop: '150px' }}
            className="flex flex-col items-center justify-center h-screen w-screen bg-gray-700 px-4"
         >
            <h1 className="text-4xl font-bold text-white mb-4">Booking Page</h1>
            <div className="flex flex-col items-center w-full max-w-lg p-4 bg-gray-600 rounded-lg">
               <img
                  src={imageSrc}
                  alt="show cover"
                  className="w-1/4 max-w-xs h-auto mb-6"
               />
               <h2 className="text-xl font-bold my-4">{name}</h2>
               <p className="text-base font-medium mb-4">
                  Rating: {updatedScore}/1
               </p>
               <p className="mb-8">Genre: {genres}</p>
               <div style={{ width: '50%', textAlign: 'center' }}>
                  {hasHtmlTags ? (
                     <div dangerouslySetInnerHTML={{ __html: summary }}></div>
                  ) : (
                     <>
                        {isExpanded ? (
                           <p>{summary}</p>
                        ) : (
                           <>
                              <p>{truncatedSummary}...</p>
                              {summary.length > 1000 && (
                                 <button
                                    className="text-blue-500 hover:underline"
                                    onClick={() => setIsExpanded(true)}
                                 >
                                    read more
                                 </button>
                              )}
                           </>
                        )}
                     </>
                  )}
               </div>
            </div>

            <div
               style={{ marginTop: '50px', paddingBottom: '25px' }}
               className="flex flex-col items-center w-full max-w-lg"
            >
               <button
                  onClick={handleBooking}
                  className="bg-gray-600 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-full mb-4 mt- w-1/5 "
               >
                  Book A Movie Ticket
               </button>
               <button
                  onClick={handleLogout}
                  className="bg-gray-600 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-full w-1/5"
               >
                  Back To Catalogue
               </button>
            </div>
         </div>
      </React.Fragment>
   );
};

export default Booking;
