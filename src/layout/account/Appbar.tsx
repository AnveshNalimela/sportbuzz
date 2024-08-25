import { GoogleGenerativeAI } from "@google/generative-ai";
import { Disclosure, Menu, Switch, Transition } from "@headlessui/react";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { Fragment, default as React, useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import chatbot from "../../assets/images/chatbot.png";
import Logo from "../../assets/images/logo.png";
import { GEMINI_API_KEY } from "../../config/constants";
import { ThemeContext } from "../../context/theme";
import LanguageSelector from "../LanguageSelector";

const userNavigation = [
  { name: "Profile", href: "dashboard/profile" },
  { name: "Sign out", href: "/logout" },
];

const classNames = (...classes: string[]): string =>
  classes.filter(Boolean).join(" ");

const Appbar = () => {
  const { pathname } = useLocation();
  const { theme, setTheme } = useContext(ThemeContext);
  const [enabled, setEnabled] = useState(theme === "dark");
  const [prompt, setPrompt] = useState("");
  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const toggleTheme = () => {
    let newTheme = "";
    if (theme === "light") {
      newTheme = "dark";
    } else {
      newTheme = "light";
    }
    setEnabled(!enabled);
    setTheme(newTheme);
  };
  const sendPrompt = () => {
    Ask_gemini(prompt);
    setPrompt("");
  };
  const Ask_gemini = async (prompt) => {
    console.log("Ask gemini function called", prompt);

    const result = await model.generateContentStream(prompt);

    // Print text as it comes in.
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      process.stdout.write(chunkText);
    }
  };

  return (
    <>
      <Disclosure as="nav" className="py-4 border-b border-slate-200">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0 flex items-center">
                    <img className="h-10 w-auto" src={Logo} alt="SportBuzz" />
                    <h2 className="text-3xl font-bold ml-2">SportBuzz</h2>
                  </div>
                </div>

                <div className="flex items-center justify-center mt-6">
                  <input
                    id="prompt"
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Enter your prompt..."
                    className="px-4 py-2 border border-zinc-300 rounded-l-md focus:outline-none focus:ring focus:ring-primary focus:ring-opacity-50"
                  />
                  <button
                    onClick={sendPrompt}
                    className="bg-slate-200 text-white px-4 py-2 rounded-r-md hover:bg-slate-400 focus:outline-none focus:ring focus:ring-primary focus:ring-opacity-50"
                  >
                    <img src={chatbot} alt="Send" className="h-8 w-8" />
                  </button>
                </div>
                <div className="hidden md:flex items-center">
                  <LanguageSelector />
                  <Switch
                    checked={enabled}
                    onChange={toggleTheme}
                    className={`${enabled ? "bg-slate-400" : "bg-slate-700"}
              relative inline-flex h-[22px] w-[50px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                  >
                    <span
                      aria-hidden="true"
                      className={`${enabled ? "translate-x-7" : "translate-x-0"}
                pointer-events-none inline-block h-[18px] w-[18px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                    />
                  </Switch>
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="rounded-full bg-white p-1 text-gray-600 hover:text-blue-600">
                        <UserCircleIcon
                          className="h-7 w-7"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {userNavigation.map((item) => (
                          <Menu.Item key={item.name}>
                            {({ active }) => (
                              <a
                                href={item.href}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                {item.name}
                              </a>
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
                <div className="flex md:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <svg
                        className="block h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="block h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 6h16M4 12h16m-7 6h7"
                        />
                      </svg>
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {userNavigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
                <div className="flex items-center justify-between px-3 py-2">
                  <span className="text-sm font-medium text-gray-700">
                    Dark Mode
                  </span>
                  <Switch
                    checked={enabled}
                    onChange={toggleTheme}
                    className={`${enabled ? "bg-slate-400" : "bg-slate-700"}
              relative inline-flex h-[22px] w-[50px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                  >
                    <span
                      aria-hidden="true"
                      className={`${enabled ? "translate-x-7" : "translate-x-0"}
                pointer-events-none inline-block h-[18px] w-[18px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                    />
                  </Switch>
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
};

export default Appbar;
