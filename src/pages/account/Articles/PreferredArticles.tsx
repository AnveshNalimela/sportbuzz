import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { default as React, useState } from "react";
import { useSportsState } from "../../../context/sports/context";
import ArticleListBySport from "./ArticleListBySport";
import PreferredArticleItem from "./PreferredArticleItem";
import PreferredSportList from "./PreferredSportList";
import "./style.css";

const PreferredArticles = ({ sports, teams }) => {
  const state = useSportsState();

  console.log(sports, teams);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSport, setSelectedSport] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleSportClick = (sport) => {
    setSelectedSport(sport.name);
    setIsOpen(false); // Close the dropdown after selecting a sport
  };

  return (
    <div className="w-full grid grid-cols-1">
      <div className="flex ">
        <TabGroup>
          <TabList className="flex gap-4 mt-2 ml-5">
            <Tab className="rounded-full py-1 px-3 text-lg/6 font-semibold text-gray-600 focus:outline-none data-[selected]:bg-green-300 data-[hover]:bg-green-400  data-[selected]:data-[hover]:bg-gray-300 data-[focus]:outline-1 data-[focus]:outline-white">
              Your News
            </Tab>
            <div className="relative inline-block text-center mt-1">
              <div>
                <button
                  type="button"
                  className="inline-flex justify-center w-30 rounded-md border border-zinc-300 shadow-sm px-5 py-1 bg-white text-lg/6 font-medium text-zinc-700 hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  id="options-menu"
                  aria-expanded={isOpen}
                  aria-haspopup="true"
                  onClick={toggleDropdown}
                >
                  {selectedSport ? selectedSport : "Filter"}
                  <svg
                    className="-mr-1 ml-2 h-5 w-5 mt-1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 12a1 1 0 01-.7-.29l-4-4a1 1 0 111.41-1.42L10 10.59l3.29-3.3a1 1 0 111.42 1.42l-4 4a1 1 0 01-.71.28z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              {isOpen && (
                <div
                  className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <div className="py-1" role="none">
                    {state.sports.map((sport) => (
                      <div
                        key={sport.id}
                        onClick={() => handleSportClick(sport)}
                        className="block px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-100 border-b border-zinc-300 cursor-pointer"
                        role="menuitem"
                      >
                        {sport.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <PreferredSportList sports={sports} />
          </TabList>

          <TabPanels className="mt-3">
            <TabPanel className="rounded-xl bg-gray/5 p-3">
              <PreferredArticleItem
                sports={sports}
                teams={teams}
                selected={selectedSport}
              />
            </TabPanel>
            {sports.map((sport) => (
              <TabPanel key={sport.id} className="rounded-xl bg-gray/5 p-3">
                <ArticleListBySport sportName={sport} />
              </TabPanel>
            ))}
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  );
};

export default PreferredArticles;
