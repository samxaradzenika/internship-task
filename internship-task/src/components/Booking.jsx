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

   return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-700">
         <h1 className="text-4xl font-bold text-white mb-4">Booking Page</h1>
         <div className="flex flex-col items-center w-96 h-auto p-4 bg-gray-600 rounded-lg ">
            <img src={imageSrc} alt="show cover" className="w-1/5 h-1/5" />
            <h2 className="text-xl font-bold my-6">{name}</h2>
            <p className="text-base font-medium mb-4 text-lg">
               Rating : {updatedScore}/1
            </p>
            <p>Genre : {genres}</p>
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

         <button
            onClick={handleLogout}
            className="bg-gray-600 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-full mt-6 mb-4"
         >
            {' '}
            Back To Catalogue{' '}
         </button>
      </div>
   );
};

export default Booking;
