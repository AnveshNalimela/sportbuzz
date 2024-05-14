import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { API_ENDPOINT } from "../../config/constants";
import SportList from "./SportList";
import TeamList from "./TeamList";

export default function Preferences() {
  let [isOpen, setIsOpen] = useState(false);
  let [sports, setSports] = useState({});
  let [teams, setTeams] = useState({});

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  const fetchPrefernces = async () => {
    const token = localStorage.getItem("authToken") ?? "";

    try {
      const response = await fetch(`${API_ENDPOINT}/user/preferences`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the authorization token in the header
        },
      });
      const data = await response.json();
      const preferences = data.preferences;
      setSports(preferences.sports);
      setTeams(preferences.teams);
      console.log(preferences, "are succesfully retrieved");
    } catch (error) {
      console.log("Error fetching preferences:", error);
    }
  };
  useEffect(() => {
    fetchPrefernces();
  }, []);
  return (
    <>
      <Button
        onClick={open}
        className="rounded-md bg-gray-500 py-2 px-4 text-lg font-medium text-white focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white w-1/4 h-10 ml-10"
      >
        Preferences
      </Button>

      <Transition appear show={isOpen}>
        <Dialog
          as="div"
          className="relative z-10 focus:outline-none"
          onClose={close}
          __demoMode
        >
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0 transform-[scale(95%)]"
                enterTo="opacity-100 transform-[scale(100%)]"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 transform-[scale(100%)]"
                leaveTo="opacity-0 transform-[scale(95%)]"
              >
                <DialogPanel className="w-full max-w-md rounded-xl bg-gray-200  p-6 backdrop-blur-2xl">
                  <DialogTitle
                    as="h3"
                    className="text-base/7 font-medium text-black"
                  ></DialogTitle>
                  <div>
                    <p className="text-lg font-medium text-cyan-600 mb-2">
                      Based On Sports
                    </p>
                    <SportList
                      psports={sports}
                      pteams={teams}
                      fetchPrefernces={fetchPrefernces}
                    />
                    <p className="text-lg font-medium text-cyan-600 mb-2">
                      Based On Teams
                    </p>
                    <TeamList
                      pteams={teams}
                      psports={sports}
                      fetchPrefernces={fetchPrefernces}
                    />
                  </div>
                  <div className="mt-4 flex gap-4">
                    <Button
                      className="inline-flex items-center gap-2 rounded-md bg-gray-400 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
                      onClick={close}
                    >
                      Close
                    </Button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
