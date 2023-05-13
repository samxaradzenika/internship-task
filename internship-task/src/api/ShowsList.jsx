import { useState, useEffect } from 'react';
import React from 'react';
import axios from 'axios';

const ShowsList = () => {
   const [showData, setShowData] = useState([]);

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
            const genres = result.show.genres.join(`, `);
            const score = result.score;
            const updatedScore = score.toFixed(1);
            const show = result.show;
            const name = show.name;
            const image = show.image;
            return { name, image, updatedScore, genres };
         });
         setShowData(showdata);
      } catch (error) {
         console.error(error);
      }
   };

   return (
      <div className="grid grid-cols-4 gap-4 justify-center bg-gray-500">
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
               </div>
            );
         })}
      </div>
   );
};

export default ShowsList;
