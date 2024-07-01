import { Button } from "@/components/ui/button";
import Link from "next/link";

const Header = () => {
  return (
    <div className="border-b-2 border-b-primary py-6">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          className="text-3xl font-bold tracking-tight text-primary"
          href={"/"}
        >
          AI-Recruit.com
        </Link>

        <div>
          <Link href={"/dashboard"}>
            <Button variant="outline">Login</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
