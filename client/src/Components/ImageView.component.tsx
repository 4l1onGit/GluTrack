interface Props {
  setToggle: (status: boolean) => void;
  image: string;
}

const ImageView = ({ image, setToggle }: Props) => {
  return (
    <div className="space-y-2 flex flex-col shadow-md w-full transition-all op duration-300 p-4 h-full justify-center items-center bg-black/60">
      <img
        className="rounded-2xl md:h-[80%] md:w-[40%]"
        onClick={() => setToggle(false)}
        src={image}
        alt="image_for_log"
      />
      <h2 className="text-center uppercase  text-sm font-semibold">
        Tap Image To Close
      </h2>
    </div>
  );
};

export default ImageView;
