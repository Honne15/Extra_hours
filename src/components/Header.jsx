import { useState } from "react";
import {
  Disclosure,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";

const navigation = [
  { name: "Inicio", href: "/dashboard" },
  { name: "Horas extras", href: "/extrahours" },
  { name: "Empleados", href: "/profile" },
  { name: "Historial", href: "/record" },
  { name: "Salir", href: "/login" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Disclosure as="nav" className="bg-[url('/banner.jpg')] bg-cover bg-center">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div className="shrink-0">
              <img
                alt="Logo Amadeus"
                src="/logoAmadeus.png"
                className="w-55 h-auto"
              />
            </div>
          </div>

          <div className="absolute top-3 right-5 z-20">
            <button
              onClick={toggleMenu}
              className="rounded-full border border-gray-300 shadow-sm p-2 bg-white text-black hover:bg-gray-50"
            >
              {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-7 w-7" />}
            </button>
          </div>

          {isOpen && (
            <div className="absolute top-16 right-4 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-2 z-50">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    classNames(
                      isActive ? "bg-[#005eb8] text-white" : "hover:bg-blue-200",
                      "block rounded-md px-3 py-2 text-lg font-medium text-gray-700"
                    )
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          )}
        </div>
      </div>
    </Disclosure>
  );
};

export default Header;

