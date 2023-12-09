import React from "react";
import style from "../css/components/Features.module.css";
import { GoCpu, GoFileCode, GoRocket, GoZap } from "react-icons/go";
import FeatureCard from "./FeatureCard";

const Features = () => {
  const f_data = [
    {
      icon: <GoCpu className={style.f_icon} />,
      tag: "Lorem isum.",
      des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis voluptate, voluptatibus, accusamus, dolorum quae quodjhd dhsnd dnsndhj dsnnbd sdgjs jdjs",
    },
    {
      icon: <GoFileCode className={style.f_icon} />,
      tag: "Lorem isum.",
      des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis voluptate, voluptatibus, accusamus, dolorum quae quodjhd dhsnd dnsndhj dsnnbd sdgjs jdjs",
    },
    {
      icon: <GoRocket className={style.f_icon} />,
      tag: "Lorem isum.",
      des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis voluptate, voluptatibus, accusamus, dolorum quae quodjhd dhsnd dnsndhj dsnnbd sdgjs jdjs",
    },
    {
      icon: <GoZap className={style.f_icon} />,
      tag: "Lorem isum.",
      des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis voluptate, voluptatibus, accusamus, dolorum quae quodjhd dhsnd dnsndhj dsnnbd sdgjs jdjs",
    },
  ];
  return (
    <>
      {f_data.map((data, index) => {
        return (
          <FeatureCard
            key={index}
            icon={data.icon}
            tag={data.tag}
            des={data.des}
          />
        );
      })}
    </>
  );
};

export default Features;
