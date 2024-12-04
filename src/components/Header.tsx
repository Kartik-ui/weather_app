import CitySearch from "@/components/CitySearch";
import CustomSelect from "@/components/CustomSelect";
import { temperatureOptions, timeOptions } from "@/constants/constants";
import { PreferenceAction } from "@/context/Reducer";
import { useTheme } from "@/context/ThemeProvider";
import { usePreferences } from "@/context/usePreference";
import { Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";
import MobileNav from "./MobileNav";

export type PayloadType<T extends PreferenceAction["type"]> = Extract<
  PreferenceAction,
  { type: T }
>["payload"];

const Header = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  const {
    state: { timeFormat, unit },
    dispatch,
  } = usePreferences();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur py-2 supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/">
          <img
            src={isDark ? "/logo.png" : "/logo2.webp"}
            alt="logo"
            className="h-14"
          />
        </Link>

        <MobileNav setTheme={setTheme} isDark={isDark} />

        {/* remove the className to see magic */}
        <div className="flex gap-4 max-md:hidden">
          <CustomSelect
            placeholder="Time"
            options={timeOptions}
            value={timeFormat}
            onChange={(value) =>
              dispatch({
                type: "SET_TIME_FORMAT",
                payload: value as PayloadType<"SET_TIME_FORMAT">,
              })
            }
          />
          <CustomSelect
            placeholder="Temperature"
            options={temperatureOptions}
            value={unit}
            onChange={(value) =>
              dispatch({
                type: "SET_UNIT",
                payload: value as PayloadType<"SET_UNIT">,
              })
            }
          />
          <CitySearch />
          <div
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={`flex items-center cursor-pointer transition-transform duration-500
                    ${isDark ? "rotate-180" : "rotate-0"}
                `}
          >
            {isDark ? (
              <Sun className="h-6 w-6 text-yellow-500 rotate-0 transition-all" />
            ) : (
              <Moon className="h-6 w-6 text-blue-500 rotate-0 transition-all" />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
