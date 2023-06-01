import "swiper/css";
import "swiper/css/effect-cards";

export interface CardProps {
  id: number;
  title: string;
  challenge: string;
  ifNot: string;
}

const Card = ({
  id,
  title = "Carregando título...",
  challenge = "",
  ifNot = "",
}: CardProps) => {
  return (
    <div className="flex flex-col gap-7 py-3 px-2">
      <h2 className="text-xl font-bold mb-2 text-neutral-50 uppercase">
        {title}
      </h2>
      <div className="flex flex-col gap-2">
        <label htmlFor="" className="text-neutral-100 font-semibold text-base">
          Faça:
        </label>
        <p className="text-base font-normal text-neutral-300">{challenge}</p>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="" className="text-neutral-100 font-semibold text-base">
          Ou:
        </label>
        <p className="text-base font-normal text-neutral-300">{ifNot}</p>
      </div>
    </div>
  );
};

export default Card;
