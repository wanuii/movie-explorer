import { ClipLoader } from "react-spinners";

const PageStatus = ({ loading, error, data, noDataMessage, children }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <ClipLoader color="#ffffff" size={50} />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center mt-10">{error}</p>;
  }

  if (!data || (Array.isArray(data) && data.length === 0)) {
    return <p className="text-white text-center mt-10">{noDataMessage}</p>;
  }

  return <>{children}</>;
};

export default PageStatus;
