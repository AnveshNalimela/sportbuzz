import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import React from "react";
import ArticlesList from "../../home/articles/ArticlesList";
import ArticleListBySport from "./ArticleListBySport";
import PArticleListItems from "./PArticleListItems";
import PSportsList from "./PSportsList";
// Define an interface for the props expected by PMatchList
interface PArticlesProps {
  psports: any; // Adjust the type according to your data structure
}

const PArticles: React.FC<PArticlesProps> = ({ psports }) => {
  if (typeof psports === "object") {
    const sports = Object.keys(psports);

    if (sports.length == 0) {
      return (
        <div className="">
          <ArticlesList />
        </div>
      );
    }
    return (
      <div className="w-2/3 grid gap-4 grid-cols-1 border rounded border-gray-200 mt-2">
        <div className="flex py-4 px-3 ">
          <TabGroup>
            <TabList className="flex gap-4 ">
              <Tab className="rounded-full py-1 px-3 text-lg/6 font-semibold text-gray-600 focus:outline-none data-[selected]:bg-green-300 data-[hover]:bg-green-400  data-[selected]:data-[hover]:bg-gray-300 data-[focus]:outline-1 data-[focus]:outline-white">
                Your News
              </Tab>
              <PSportsList psports={psports} />
            </TabList>
            <TabPanels className="mt-3">
              <TabPanel className="rounded-xl bg-gray/5 p-3">
                <PArticleListItems psports={psports} />
              </TabPanel>
              {sports.map((sport) => (
                <TabPanel key={sport} className="rounded-xl bg-gray/5 p-3">
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
        <h2 className="text-red-500 text-center font-semibold py-10">
          Add Prefernces for Better Experinces
        </h2>
        <ArticlesList />
      </>
    );
  }
};

export default PArticles;
