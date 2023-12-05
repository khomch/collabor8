"use client";

import { useDispatch, useSelector } from "@/redux-store/customHooks";
import { fetchUserDetails } from "@/redux-store/slices/userSlice";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import LogoSmallYellow from "../../../public/logo-yellow.png";
import "./navbar.css";
import Button from "../button/button";
import { useRouter } from "next/navigation";
import { resetUserState } from "@/redux-store/slices/userSlice";

const menuItems = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Dashboard",
    path: "/dashboard",
  },
  {
    label: "My Projects",
    path: "/projects",
  },
  {
    label: "Profile",
    path: "/profile",
  },
];

const unauthMenuItems = [
  {
    label: "Login",
    path: "/login",
  },
  {
    label: "Register",
    path: "/register",
  },
];

function Navbar() {
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.userState.isLogged);
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchUserDetails());
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    dispatch(resetUserState());
    router.push("/login");
  };
  const pathname = usePathname();
  return (
    <nav className="navbar">
      <div className="navbar__container">
        <Link href={"/"}>
          <Image
            src={LogoSmallYellow}
            alt="Collabor8 Logo"
            width={111}
            height={30}
            priority
          />
        </Link>
        <menu className="navbar__menu">
          <ul className="navbar__menu-items">
            {isLogged ? (
              <>
                {menuItems.map((item, index) => (
                  <li
                    className={`navbar__menu-item ${
                      pathname === item.path && "navbar__menu-item_active"
                    }`}
                    key={item.path}
                  >
                    <Link
                      className={`bodytext1 navbar__menu-link`}
                      href={item.path}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li className="navbar__menu-item">
                  <div className="navbar__menu-link">
                    <Button
                      variant="primary"
                      label="Logout"
                      onClick={() => handleLogout()}
                      type="button"
                    />
                  </div>
                </li>
              </>
            ) : (
              <>
                {unauthMenuItems.map((item, index) => (
                  <li
                    className={`navbar__menu-item ${
                      pathname === item.path && "navbar__menu-item_active"
                    }`}
                    key={item.path}
                  >
                    <Link
                      className={`bodytext1 navbar__menu-link`}
                      href={item.path}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </>
            )}
          </ul>
        </menu>
      </div>
    </nav>
  );
}
export default Navbar;
