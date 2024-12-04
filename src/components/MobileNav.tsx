import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { temperatureOptions, timeOptions } from "@/constants/constants";
import { usePreferences } from "@/context/usePreference";
import { AlignJustify, Moon, Sun } from "lucide-react";
import CitySearch from "./CitySearch";
import CustomSelect from "./CustomSelect";
import { PayloadType } from "./Header";

type Theme = "light" | "dark";

interface MobileNavProps {
  setTheme: (theme: Theme) => void;
  isDark: boolean;
}

const MobileNav = ({ setTheme, isDark }: MobileNavProps) => {
  const {
    state: { timeFormat, unit },
    dispatch,
  } = usePreferences();

  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger>
          <AlignJustify />
        </SheetTrigger>
        <SheetContent>
          <div className="flex flex-col gap-6 mt-10">
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
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
