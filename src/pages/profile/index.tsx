import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Field,
  Input,
  Label,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import profile from "../../assets/images/profile.png";
import { API_ENDPOINT } from "../../config/constants";
import SportList from "../account/preferences/SportList";
import TeamList from "../account/preferences/TeamList";
const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});
  let [PisOpen, setPIsOpen] = useState(false);
  let [isOpen, setIsOpen] = useState(false);
  const [current_password, setCurrentPassword] = useState("");
  const [new_password, setNewPassword] = useState("");
  let [sports, setSports] = useState({});
  let [teams, setTeams] = useState({});
  const navigate = useNavigate();
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
      console.log(sports, teams);
    } catch (error) {
      console.log("Error fetching preferences:", error);
    }
  };
  const goback = () => {
    navigate("/account");
  };

  function popen() {
    setPIsOpen(true);
  }

  function pclose() {
    setPIsOpen(false);
  }
  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  const Update = async (requestbody) => {
    console.log(requestbody);
    try {
      const response = await fetch(`${API_ENDPOINT}/user/password`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          // You might need to include authentication headers if required
        },
        body: JSON.stringify(requestbody),
      });

      if (!response.ok) {
        // Handle error response
        const errorMessage = await response.text();
        throw new Error(`Failed to update password: ${errorMessage}`);
      }
      // Password updated successfully
      console.log("Password updated successfully");
      pclose();
    } catch (error) {
      // Handle fetch error
      console.error("Error updating password:", error.message);
    }
  };

  useEffect(() => {
    // Retrieve data from localStorage
    const storedToken = localStorage.getItem("authToken");
    const storedUserData = JSON.parse(localStorage.getItem("userData"));

    // Update state with the retrieved data
    setToken(storedToken);
    setUser(storedUserData);

    // If userData is available, set name and email state variables
    if (storedUserData) {
      setName(storedUserData.name);
      setEmail(storedUserData.email);
    }
    fetchPrefernces();
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    const req = { current_password, new_password };
    console.log(req);
    Update(req);
  };

  if (user) {
    return (
      <>
        <div className="bg-blue-200 min-h-screen flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg  w-1/4">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 mb-3">
                <img
                  className="rounded-full border-4 border-blue-300"
                  src={profile}
                  alt="Profile Picture"
                />
              </div>
              <h2 className="text-xl text-gray-800 font-semibold">{name}</h2>
              <p className="text-lg font-bold text-gray-600">{email}</p>
            </div>
            <div className="mt-4 flex flex-col items-center">
              <Button
                onClick={popen}
                className="h-10 rounded-md bg-blue-500 py-2 px-4 text-lg font-medium text-white focus:outline-none data-[hover]:bg-blue-600 data-[focus]:outline-1 data-[focus]:outline-white w-1/2"
              >
                Change Password
              </Button>
              <Transition appear show={PisOpen}>
                <Dialog
                  as="div"
                  className="relative z-10 focus:outline-none"
                  onClose={pclose}
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
                        <DialogPanel className="  w-1/3 rounded-xl bg-gray-700 p-6 backdrop-blur-2xl">
                          <DialogTitle
                            as="h3"
                            className=" font-medium text-lg text-white"
                          >
                            Password Update
                          </DialogTitle>
                          <form onSubmit={handleSubmit}>
                            <Field>
                              <Label className="text-sm/6 font-medium text-white">
                                Current Password
                              </Label>

                              <Input
                                className={clsx(
                                  "mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
                                  "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                                )}
                                value={current_password}
                                onChange={(e) =>
                                  setCurrentPassword(e.target.value)
                                }
                                required
                              />
                            </Field>
                            <Field>
                              <Label className="text-sm/6 font-medium text-white">
                                New Password
                              </Label>

                              <Input
                                className={clsx(
                                  "mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
                                  "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                                )}
                                value={new_password}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                              />
                            </Field>
                            <div className="mt-4">
                              <Button
                                type="submit"
                                className="inline-flex items-center gap-2 rounded-md bg-white py-1.5 px-3 text-sm/6 font-semibold text-black shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-200 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
                                onClick={Update}
                              >
                                Update
                              </Button>
                              <Button
                                className="ml-10 inline-flex items-center gap-2 rounded-md bg-gray-500  py-1.5 px-3 text-sm/6 font-semibold text-gray-200  shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
                                onClick={pclose}
                              >
                                X Close
                              </Button>
                            </div>
                          </form>
                        </DialogPanel>
                      </TransitionChild>
                    </div>
                  </div>
                </Dialog>
              </Transition>
            </div>
            <div className="flex  mt-6 flex flex-col items-center">
              <Button
                onClick={open}
                className="rounded-md bg-green-400 py-2 px-4 text-lg font-medium text-white focus:outline-none data-[hover]:bg-green-600 data-[focus]:outline-1 data-[focus]:outline-white w-1/2 h-10"
              >
                Preferences
              </Button>
              <Button
                onClick={goback}
                className="rounded-md bg-cyan-400 py-2 px-4 text-lg font-medium text-white focus:outline-none data-[hover]:bg-cyan-600 data-[focus]:outline-1 data-[focus]:outline-white w-1/2 h-10 mt-4"
              >
                Back Home
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
                            <div className="flex justify-between items-center mb-2">
                              <p className="text-lg font-medium text-cyan-600">
                                Based On Sports
                              </p>
                              <Button
                                className="inline-flex items-center gap-2 rounded-md bg-gray-400 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
                                onClick={close}
                              >
                                Close
                              </Button>
                            </div>

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
                          <div className="mt-4 flex gap-4"></div>
                        </DialogPanel>
                      </TransitionChild>
                    </div>
                  </div>
                </Dialog>
              </Transition>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default Profile;
