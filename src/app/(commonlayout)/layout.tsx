import { Navbar } from "@/components/shared/navbar";

const CommonLayout = ({children} :{children : React.ReactNode}) => {
    return (
        <div className="">
            <Navbar/>
            <div className="w-10/12 mx-auto">{children}</div>
        </div>
    );
};

export default CommonLayout;