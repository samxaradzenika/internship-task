import { useState, useEffect } from 'react';
import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ShowsList = (props) => {
   const [showData, setShowData] = useState([]);
   const navigate = useNavigate();
   useEffect(() => {
      fetchData();
   }, []);

   const fetchData = async () => {
      try {
         const response = await axios.get(
            'https://api.tvmaze.com/search/shows?q=all'
         );
         const data = response.data;
         const showdata = data.map((result) => {
            const summary = result.show.summary;
            const genres = result.show.genres.join(`, `);
            const score = result.score;
            const updatedScore = score.toFixed(1);
            const show = result.show;
            const name = show.name;
            const image = show.image;
            return { name, image, updatedScore, genres, summary };
         });
         setShowData(showdata);
      } catch (error) {
         console.error(error);
      }
   };

   return (
      <div className="grid grid-cols-4 gap-4 items-center justify-between bg-gray-500">
         {showData.map((show) => {
            if (show.image === null) {
               return;
            }

            return (
               <div
                  key={`${show.name}-${show.updatedScore}`}
                  className="flex flex-col items-center w-64 h-auto p-4 bg-gray-600 rounded-lg "
               >
                  <img
                     src={show.image?.medium}
                     alt="show cover"
                     className="w-full h-auto rounded-lg"
                  />
                  <h2 className="text-xl font-bold my-4">{show.name}</h2>
                  <p className="text-base font-medium mt-2 text-lg">
                     Rating : {show.updatedScore}/1
                  </p>
                  <p>Genre : {show.genres}</p>
                  <button
                     onClick={() => {
                        localStorage.setItem(
                           'selectedShow',
                           JSON.stringify(show)
                        );
                        navigate('/booking');
                     }}
                     className="bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-full mt-6 mb-4"
                  >
                     {' '}
                     See More{' '}
                  </button>
               </div>
            );
         })}
      </div>
   );
};

export default ShowsList;
