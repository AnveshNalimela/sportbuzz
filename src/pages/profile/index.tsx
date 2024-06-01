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
  let [msg, setMsg] = useState("Welcome to SportBuzz Application");

  const fetchPrefernces = async () => {
    const token = localStorage.getItem("authToken") ?? "";
    try {
      const response = await fetch(`${API_ENDPOINT}/user/preferences`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
    setMsg("Prefernces updated Succesfully");
  }

  const Update = async (requestbody) => {
    console.log(requestbody);
    try {
      const response = await fetch(`${API_ENDPOINT}/user/password`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestbody),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to update password: ${errorMessage}`);
      }
      console.log("Password updated successfully");
      setMsg("Password updated successfully");
      pclose();
    } catch (error) {
      console.error("Error updating password:", error.message);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedUserData = JSON.parse(localStorage.getItem("userData"));

    setToken(storedToken);
    setUser(storedUserData);

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
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
            <div className="mt-4 text-lg text-green-600 font-semibold  sm:mt-0 mb-2 text-center">
              {msg}
            </div>
            <div className="flex flex-col items-center sm:flex-row sm:justify-between">
              <div className="flex flex-col items-center sm:items-start">
                <div className="w-24 h-24 mb-3 sm:mb-0 sm:mr-4 text-center">
                  <img
                    className="rounded-full border-4 border-blue-300"
                    src={profile}
                    alt="Profile Picture"
                  />
                </div>
                <div className="text-center sm:text-left">
                  <h2 className="text-xl text-gray-800 font-semibold">
                    {name}
                  </h2>
                  <p className="text-lg font-bold text-gray-600">{email}</p>
                </div>
              </div>

              <div className="mt-6 flex flex-col items-center sm:flex-row sm:justify-between">
                <Button
                  onClick={popen}
                  className="h-10 rounded-md bg-blue-500 py-2 px-4 text-lg font-medium text-white focus:outline-none hover:bg-blue-600 w-full sm:w-auto lg:mr-4 mb-4 sm:mb-0"
                >
                  Change Password
                </Button>
                <Button
                  onClick={open}
                  className="rounded-md bg-green-400 py-2 px-4 text-lg font-medium text-white focus:outline-none hover:bg-green-600 w-full sm:w-auto mb-4 sm:mb-0"
                >
                  Preferences
                </Button>
                <Button
                  onClick={goback}
                  className="rounded-md bg-cyan-400 py-2 px-4 text-lg font-medium text-white focus:outline-none hover:bg-cyan-600 w-full sm:w-auto lg:ml-4"
                >
                  Back Home
                </Button>
              </div>
            </div>
          </div>
        </div>

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
                  <DialogPanel className="w-full max-w-md rounded-xl bg-gray-700 p-6 backdrop-blur-2xl">
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
                          type="password"
                          className={clsx(
                            "mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
                            "focus:outline-none focus:ring-2 focus:ring-white/25"
                          )}
                          value={current_password}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          required
                        />
                      </Field>
                      <Field>
                        <Label className="text-sm/6 font-medium text-white">
                          New Password
                        </Label>

                        <Input
                          type="password"
                          className={clsx(
                            "mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
                            "focus:outline-none focus:ring-2 focus:ring-white/25"
                          )}
                          value={new_password}
                          onChange={(e) => setNewPassword(e.target.value)}
                          required
                        />
                      </Field>
                      <div className="mt-4 flex justify-end space-x-4">
                        <Button
                          type="submit"
                          className="inline-flex items-center gap-2 rounded-md bg-white py-1.5 px-3 text-sm/6 font-semibold text-black shadow-inner shadow-white/10 focus:outline-none hover:bg-gray-200"
                        >
                          Update
                        </Button>
                        <Button
                          className="inline-flex items-center gap-2 rounded-md bg-gray-500 py-1.5 px-3 text-sm/6 font-semibold text-gray-200 shadow-inner shadow-white/10 focus:outline-none hover:bg-gray-600"
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

        <Transition appear show={isOpen}>
          <Dialog
            as="div"
            className="relative z-10 focus:outline-none"
            onClose={close}
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
                  <DialogPanel className="w-full max-w-md rounded-xl bg-gray-200 p-6 backdrop-blur-2xl">
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
                          className="inline-flex items-center gap-2 rounded-md bg-gray-400 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none hover:bg-gray-700"
                          onClick={close}
                        >
                          Close
                        </Button>
                      </div>

                      <SportList
                        psports={sports}
                        pteams={teams}
                        fetchPrefernces={fetchPrefernces}
                        close={close}
                      />
                      <p className="text-lg font-medium text-cyan-600 mb-2">
                        Based On Teams
                      </p>
                      <TeamList
                        pteams={teams}
                        psports={sports}
                        fetchPrefernces={fetchPrefernces}
                        close={close}
                      />
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

  return null;
};

export default Profile;
