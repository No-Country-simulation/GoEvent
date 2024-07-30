import ReactLoading from "react-loading";

const Loading = () => {
  return (
    <div className="degradado flex h-screen w-full items-center justify-center">
      <ReactLoading
        type="spinningBubbles"
        color="white"
        height={"150px"}
        width={"150px"}
      />
    </div>
  );
};

export default Loading;
