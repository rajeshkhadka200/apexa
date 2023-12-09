import React from "react";
import style from "../css/components/Features.module.css";
import { TypeAnimation } from "react-type-animation";
import { GoCpu, GoFileCode, GoRocket, GoZap } from "react-icons/go";

const FeatureCard = ({icon,tag,des,img}) => {
  return (
    <>
      <div className={style.features_container}>
        <div className={style.features_wrapper}>
          <div className={style.f_text}>
            <div className={style.icon_con}>
                {icon}
            </div>
            <div className={style.f_tagline}>
              <h3 className={style.tag}>{tag}</h3>
              <TypeAnimation
                sequence={["dolor sit ametdh."]}
                wrapper="span"
                speed={50}
                style={{
                  fontSize: "2.5rem",
                  display: "inline-block",
                  fontWeight: "600",
                  color: "#fff",
                }}
              />
            </div>
            <div className={style.f_des}>
              <p className={style.des}>
                {des}
              </p>
            </div>
          </div>
          <div className={style.f_img}></div>
        </div>
      </div>
    </>
  );
};

export default FeatureCard;
