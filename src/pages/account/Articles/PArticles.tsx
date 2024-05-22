import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import React from "react";
import ArticlesList from "../../home/articles/ArticlesList";
import ArticleListBySport from "./ArticleListBySport";
import PArticleListItems from "./PArticleListItems";
import PSportsList from "./PSportsList";
import "./style.css";
// Define an interface for the props expected by PMatchList
interface PArticlesProps {
  psports: any; // Adjust the type according to your data structure
}

const PArticles: React.FC<PArticlesProps> = ({ psports }) => {
  if (typeof psports === "object") {
    const sports = Object.keys(psports);

    if (sports.length === 0) {
      return (
        <>
          <h2 className="text-red-500 text-center font-semibold py-10 mb-1">
            Add Sport Prefernces for Better Experince
          </h2>
          <ArticlesList />
        </>
      );
    }
    return (
      <div className="w-full grid grid-cols-1 border rounded border-gray-200 mt-2">
        <div className="flex py-4 px-3 ">
          <TabGroup>
            <TabList className="flex gap-4 ">
              <Tab className="rounded-full py-1 px-3 text-lg/6 font-semibold text-gray-600 focus:outline-none data-[selected]:bg-green-300 data-[hover]:bg-green-400  data-[selected]:data-[hover]:bg-gray-300 data-[focus]:outline-1 data-[focus]:outline-white">
                Your News
              </Tab>
              <PSportsList psports={psports} />
            </TabList>
            <TabPanels className="tab-panels-container mt-3">
              <TabPanel className="w-full rounded-xl bg-gray/5 p-3 border-4">
                <PArticleListItems psports={psports} />
              </TabPanel>
              {sports.map((sport) => (
                <TabPanel
                  key={sport}
                  className="tab-panel rounded-xl bg-gray/5 p-3 border-4"
                >
                  <ArticleListBySport sportName={sport} />
                </TabPanel>
              ))}
            </TabPanels>
          </TabGroup>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <h2 className="text-red-500 text-center font-semibold py-10 mb-1">
          Add Prefernces for Better Experinces
        </h2>
        <ArticlesList />
      </>
    );
  }
};

export default PArticles;
