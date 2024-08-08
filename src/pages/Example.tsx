import React, { useState } from "react";

import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";

export default function Example() {
  const [enabled, setEnabled] = useState(true);

  return (
    <div className="flex h-screen w-full justify-center pt-20 ">
      <div className="flex gap-8">
        <div className="text-sm/6 font-semibold text-gray-700">Products</div>
        <Popover __demoMode>
          <PopoverButton className="text-sm/6 font-semibold text-gray-500 focus:outline-none data-[active]:text-gray-700 data-[hover]:text-gray-600 data-[focus]:outline-1 data-[focus]:outline-white">
            Sports
          </PopoverButton>
          <Transition
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <PopoverPanel
              anchor="bottom"
              className="divide-y divide-gray-700/5 rounded-xl bg-gray-600/5 text-sm/6 [--anchor-gap:var(--spacing-5)] mt-2"
            >
              <div className="p-3 flex block rounded-lg py-2 px-3 transition hover:bg-gray-200/5">
                <p className="font-semibold text-gray-500">Insights</p>
                <input
                  type="checkbox"
                  className="appearance-none border border-gray-400 rounded-md w-6 h-6 checked:bg-green-300 checked:border-transparent focus:outline-none focus:ring-2 focus:ring-green-500 ml-10"
                />
              </div>

              <div className="p-3 block rounded-lg py-2 px-3 transition hover:bg-gray-200/5">
                <p className="font-semibold text-gray-500">Select All</p>
              </div>
            </PopoverPanel>
          </Transition>
        </Popover>
        <Popover __demoMode>
          <PopoverButton className="text-sm/6 font-semibold text-gray-300 focus:outline-none data-[active]:text-gray-300 data-[hover]:text-gray-300 data-[focus]:outline-1 data-[focus]:outline-white">
            Teams
          </PopoverButton>
          <Transition
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <PopoverPanel
              anchor="bottom"
              className="divide-y divide-gray-300/5 rounded-xl bg-gray-200/5 text-sm/6 [--anchor-gap:var(--spacing-5)]"
            >
              <div className="p-3">
                <a
                  className="block rounded-lg py-2 px-3 transition hover:bg-gray-200/5"
                  href="#"
                >
                  <p className="font-semibold text-gray-300">Insights</p>
                  <p className="text-gray-300/50">
                    Measure actions your users take
                  </p>
                </a>
                <a
                  className="block rounded-lg py-2 px-3 transition hover:bg-gray-200/5"
                  href="#"
                >
                  <p className="font-semibold text-gray-300">Automations</p>
                  <p className="text-gray-300/50">
                    Create your own targeted content
                  </p>
                </a>
                <a
                  className="block rounded-lg py-2 px-3 transition hover:bg-gray-200/5"
                  href="#"
                >
                  <p className="font-semibold text-gray-300">Reports</p>
                  <p className="text-gray-300/50">Keep track of your growth</p>
                </a>
              </div>
              <div className="p-3">
                <a
                  className="block rounded-lg py-2 px-3 transition hover:bg-gray-200/5"
                  href="#"
                >
                  <p className="font-semibold text-gray-300">Documentation</p>
                  <p className="text-gray-300/50">
                    Start integrating products and tools
                  </p>
                </a>
              </div>
            </PopoverPanel>
          </Transition>
        </Popover>
      </div>
    </div>
  );
}
