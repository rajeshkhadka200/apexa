import React from "react";
import style from "../css/components/Features.module.css";
import { TypeAnimation } from "react-type-animation";
import { GoCpu, GoFileCode, GoRocket, GoZap } from "react-icons/go";

const FeatureCard = ({
  icon,
  tag,
  des,
  img,
  c1,
  c2,
  i,
  slogan,
}) => {
  return (
    <>
      <div className={style.features_container}>
        <div className={style.features_wrapper}>
          {i % 2 === 0 ? (
            <>
              <div className={style.f_img}>
                <img src={img} alt="feature" />
              </div>
              <div className={style.f_text}>
                <div
                  className={style.icon_con}
                  style={{
                    background: `linear-gradient(60deg, ${c1}, ${c2})`,
                  }}
                >
                  {icon}
                </div>
                <div className={style.f_tagline}>
                  <h3
                    className={style.tag}
                    style={{
                      background: `linear-gradient(60deg, ${c1}, ${c2})`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {tag}
                  </h3>
                  <div className={style.writer}>
                    <TypeAnimation
                      sequence={[slogan, 1000, " "]}
                      wrapper="span"
                      speed={10}
                      style={{
                        fontSize: "1.8rem",
                        display: "inline-block",
                        fontWeight: "600",
                        color: "#fff",
                      }}
                      repeat={Infinity}
                    />
                  </div>
                </div>
                <div className={style.f_des}>
                  <p className={style.des}>{des}</p>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className={style.f_text}>
                <div
                  className={style.icon_con}
                  style={{
                    background: `linear-gradient(60deg, ${c1}, ${c2})`,
                  }}
                >
                  {icon}
                </div>
                <div className={style.f_tagline}>
                  <h3
                    className={style.tag}
                    style={{
                      background: `linear-gradient(60deg, ${c1}, ${c2})`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {tag}
                  </h3>
                  <div className={style.writer}>
                    <TypeAnimation
                      sequence={[slogan, 1000, " "]}
                      wrapper="span"
                      speed={50}
                      style={{
                        fontSize: "1.8rem",
                        display: "inline-block",
                        fontWeight: "600",
                        color: "#fff",
                      }}
                      repeat={Infinity}
                    />
                  </div>
                </div>
                <div className={style.f_des}>
                  <p className={style.des}>{des}</p>
                </div>
              </div>
              <div className={style.f_img}>
                {" "}
                <img src={img} alt="feature" />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default FeatureCard;
