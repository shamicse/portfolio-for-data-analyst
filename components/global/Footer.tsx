import { SocialIcons } from "./socialIcons";

export const Footer = () => {
  const today = new Date();
  const formatted = `${String(today.getDate()).padStart(2, "0")}/${String(today.getMonth() + 1).padStart(2, "0")}/${String(today.getFullYear()).slice(2)}`;

  return (
    <footer className="w-full p-5 px-8 border-t mt-10">
      <div className="md:flex items-center justify-between gap-4">
        <div className="flex gap-4 items-center justify-center mb-4 md:mb-0">
          <SocialIcons />
        </div>
        <div className="hidden md:block font-light">
          © Made with &#10084; by Shami
        </div>
        <div className="hidden md:flex items-center gap-3">
          <div className="bg-green-500 animate-pulse rounded-full w-2 h-2"></div>
          <p className="font-light md:text-md">Last Updated {formatted}</p>
        </div>
        <div className="md:hidden flex gap-3 justify-between items-center">
          <div className="font-light text-xs">
            © Made with &#10084; by Shami
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-green-500 animate-pulse rounded-full w-2 h-2"></div>
            <p className="font-light text-xs">Last Updated {formatted}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
