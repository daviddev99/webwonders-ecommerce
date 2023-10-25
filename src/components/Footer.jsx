import { Link } from "react-router-dom";

export const Footer = () => {
  return (
      <footer className="bg-[#35A7FF] flex justify-center py-4 text-[#ffffff] w-full   dark:bg-gray-800">
        <div className="w-5/6 max-w-7xl  flex flex-col gap-2 ">
          <span className="text-sm font-bold text-center dark:text-gray-400">
            © 2023{" "}
            <Link to={"/"} className="hover:underline">
              David Abed
            </Link>
          </span>
        </div>
      </footer>
  );
};
