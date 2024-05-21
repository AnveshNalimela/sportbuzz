import React from "react";
import FavouritesList from "./FavouritesList";

const Favourites = () => {
  return (
    <div className="bg-white dark:bg-zinc-800 shadow-lg rounded-lg overflow-hidden w-1/4 mx-2">
      <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200 p-4">
        Favorites
      </h2>
      <div className=" p-4">
        <select className="w-1/3 bg-zinc-100 dark:bg-zinc-700 border border-zinc-200 dark:border-zinc-600 rounded p-2 mr-2">
          <option value="filter1">Filter 1</option>
          <option value="filter2">Filter 2</option>
          <option value="filter3">Filter 3</option>
        </select>
        <select className="w-1/3 bg-zinc-100 dark:bg-zinc-700 border border-zinc-200 dark:border-zinc-600 rounded p-2">
          <option value="team1">Team 1</option>
          <option value="team2">Team 2</option>
          <option value="team3">Team 3</option>
        </select>
      </div>
      <FavouritesList />
    </div>
  );
};

export default Favourites;
