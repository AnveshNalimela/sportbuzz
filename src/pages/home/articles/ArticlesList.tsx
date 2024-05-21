import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import React from "react";
import { useSportsState } from "../../../context/sports/context";
import ArticleListBySport from "./ArticleListBySport";
import ArticleListItems from "./ArticleListItems";
import SportListItems from "./SportListItems";

const ArticlesList: React.FC = () => {
  const state = useSportsState();
  const { sports, isLoading, isError, errorMessage } = state;

  return (
    <div className="w-2/3 grid gap-4 grid-cols-1 border rounded border-gray-200 mt-2">
      <div className="flex py-4 px-3 ">
        <TabGroup>
          <TabList className="flex gap-4 ">
            <Tab className="rounded-full py-1 px-3 text-lg/6 font-semibold text-gray-600 focus:outline-none data-[selected]:bg-green-300 data-[hover]:bg-green-400  data-[selected]:data-[hover]:bg-gray-300 data-[focus]:outline-1 data-[focus]:outline-white">
              News
            </Tab>
            <SportListItems />
          </TabList>
          <TabPanels className="mt-3">
            <TabPanel className="rounded-xl bg-gray/5 p-3">
              <ArticleListItems />
            </TabPanel>
            {sports.map((sport) => (
              <TabPanel key={sport.id} className="rounded-xl bg-gray/5 p-3">
                <ArticleListBySport sportName={sport.name} />
              </TabPanel>
            ))}
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  );
};

export default ArticlesList;
