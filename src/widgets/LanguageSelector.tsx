import { useTranslation } from "react-i18next";

import { Button } from "@/components/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/DropdownMenu/DropdownMenu";

export const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex w-[180px] items-center gap-2">
          {i18n.language === "uz" ? <UzbFlag /> : <UsaFlag />}
          <span>{i18n.language === "uz" ? "O'zbek" : "English"}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[180px]">
        <DropdownMenuItem onClick={() => changeLanguage("uz")}>
          <UzbFlag />
          <span className="ml-2">O&apos;zbek</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage("en")}>
          <UsaFlag />
          <span className="ml-2">English</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const uzbFlagUrl =
  "https://upload.wikimedia.org/wikipedia/commons/8/84/Flag_of_Uzbekistan.svg";

const usaFlagUrl =
  "https://cdn.britannica.com/79/4479-050-6EF87027/flag-Stars-and-Stripes-May-1-1795.jpg";

export function UzbFlag() {
  return (
    <img
      src={uzbFlagUrl}
      className="ml-2 h-5 w-5 rounded-full bg-cover object-cover"
      alt="uzb"
    />
  );
}

export function UsaFlag() {
  return (
    <img
      src={usaFlagUrl}
      className="ml-2 h-5 w-5 rounded-full bg-cover object-cover"
      alt="usa"
    />
  );
}
