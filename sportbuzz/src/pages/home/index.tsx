import React from "react";
import Header from "./Header";
const Home = () => {
  return (
    <div>
      <div className="bg-white  min-h-screen">
        <Header />

        <section className="p-4">
          <h2 className="text-xl font-bold my-4">Trending News</h2>
          <div>
            <ul className="flex space-x-4">
              <li className="cursor-pointer">All Sports</li>
              <li className="cursor-pointer">Football</li>
              <li className="cursor-pointer">Basketball</li>
            </ul>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="bg-zinc-800 p-4 rounded-lg">
                <img
                  src="https://placehold.co/150"
                  alt="News Thumbnail"
                  className="mb-2"
                />
                <h3 className="text-lg font-bold">News Title</h3>
                <p>News Summary: Lorem ipsum dolor sit amet</p>
              </div>
            </div>
          </div>
        </section>

        <section className="p-4">
          <h2 className="text-xl font-bold mb-4">Filter News Articles</h2>
          <select className="bg-zinc-800 text-white p-2 rounded-lg">
            <option value="all">All Sports</option>
            <option value="football">Football</option>
            <option value="basketball">Basketball</option>
          </select>
          <select className="bg-zinc-800 text-white p-2 rounded-lg ml-4">
            <option value="all">All Teams</option>
            <option value="team1">Team 1</option>
            <option value="team2">Team 2</option>
          </select>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mt-4">
            <div className="bg-zinc-800 p-4 rounded-lg">
              <img
                src="https://placehold.co/150"
                alt="News Thumbnail"
                className="mb-2"
              />
              <h3 className="text-lg font-bold">Filtered News Title</h3>
              <p>News Summary: Lorem ipsum dolor sit amet</p>
            </div>
          </div>
        </section>

        <section className="p-4">
          <h2 className="text-xl font-bold mb-4">Sign In / Sign Up</h2>
        </section>

        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex justify-center items-center hidden">
          <div className="bg-zinc-800 p-4 rounded-lg">
            <img
              src="https://placehold.co/300"
              alt="News Thumbnail"
              className="mb-2"
            />
            <h3 className="text-xl font-bold">Detailed News Title</h3>
            <p>Detailed News Content: Lorem ipsum dolor sit amet</p>
            <button className="bg-zinc-700 text-white px-4 py-2 rounded-lg mt-4">
              Close
            </button>
          </div>
        </div>

        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex justify-center items-center hidden">
          <div className="bg-zinc-800 p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Preferences</h2>
            <p>Select your preferred sports and teams</p>

            <button className="bg-zinc-700 text-white px-4 py-2 rounded-lg mt-4">
              Save Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
