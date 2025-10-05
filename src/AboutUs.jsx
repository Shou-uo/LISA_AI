import React from "react";
import x10000061761 from "./1000006176-1.png";
import BIOSLOGOWHIGHQUALITY1 from "./BIOSLOGOWHIGHQUALITY-1.png";
import BIOSTEXTHIGHQUALITY from "./BIOSTEXTHIGHQUALITY.png";
import LISABORDER from "./LISABORDER.png";
import TEXTHIGHQUALITY from "./TEXTHIGHQUALITY.png";
import erasebgTransformed from "./erasebg-transformed.png";
import image2011 from "./image2-0-1-1.png";
import line1 from "./line-1.svg";
import vector1 from "./vector-1.svg";

export const About = () => {
  return (
    <div className="bg-black w-full min-w-[1440px] min-h-[1788px] relative">
      <img
        className="absolute top-5 left-[45px] w-[185px] h-[127px] aspect-[1.46] object-cover"
        alt="Bioslogowhighquality"
        src={BIOSLOGOWHIGHQUALITY1}
      />

      <img
        className="absolute top-[166px] left-[45px] w-[1351px] h-[3px]"
        alt="Line"
        src={line1}
      />

      <img
        className="absolute top-[66px] left-[1336px] w-[60px] h-9 aspect-[1.68] object-cover"
        alt="Image"
        src={image2011}
      />

      <img
        className="absolute top-0 left-0 w-[1440px] h-[1788px] aspect-[0.75] object-cover"
        alt="Element"
        src={x10000061761}
      />

      <img
        className="absolute top-[222px] left-[921px] w-[446px] h-[557px] aspect-[0.8] object-cover"
        alt="Lisaborder"
        src={LISABORDER}
      />

      <img
        className="absolute top-[66px] left-[251px] w-[301px] h-[77px] aspect-[3.91] object-cover"
        alt="Biostexthighquality"
        src={BIOSTEXTHIGHQUALITY}
      />

      <img
        className="absolute top-[278px] left-[67px] w-[529px] h-[445px] aspect-[1.19] object-cover"
        alt="Texthighquality"
        src={TEXTHIGHQUALITY}
      />

      <img
        className="absolute top-[249px] left-[1003px] w-[282px] h-[423px] aspect-[0.67] object-cover"
        alt="Erasebg transformed"
        src={erasebgTransformed}
      />

      <div className="absolute top-[258px] left-[697px] w-[412px] rotate-[-11.61deg] [-webkit-text-stroke:2px_#008cff] [font-family:'Lexend_Giga-Regular',Helvetica] font-normal text-[#008cff] text-5xl tracking-[4.80px] leading-[normal]">
        CLICK HERE
      </div>

      <img
        className="absolute top-[383px] left-[729px] w-[298px] h-[179px]"
        alt="Vector"
        src={vector1}
      />
    </div>
  );
};
