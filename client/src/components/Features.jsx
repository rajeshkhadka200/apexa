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
      c1: "#f96f10",
      c2: "#ef5088",
    },
    {
      icon: <GoFileCode className={style.f_icon} />,
      tag: "Lorem isum.",
      des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis voluptate, voluptatibus, accusamus, dolorum quae quodjhd dhsnd dnsndhj dsnnbd sdgjs jdjs",
      c1: "#3093ee",
      c2: "#0ec3fa",
    },
    {
      icon: <GoRocket className={style.f_icon} />,
      tag: "Lorem isum.",
      des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis voluptate, voluptatibus, accusamus, dolorum quae quodjhd dhsnd dnsndhj dsnnbd sdgjs jdjs",
      c1: "#994abe",
      c2: "#8a3ced",
    },
    {
      icon: <GoZap className={style.f_icon} />,
      tag: "Lorem isum.",
      des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis voluptate, voluptatibus, accusamus, dolorum quae quodjhd dhsnd dnsndhj dsnnbd sdgjs jdjs",
      c1: "#00b747",
      c2: "#00acae",
    },
  ];
  return (
    <>
      {f_data.map((data, index) => {
        return (
          <FeatureCard
            key={index}
            i={index}
            icon={data.icon}
            tag={data.tag}
            des={data.des}
            c1={data.c1}
            c2={data.c2}
          />
        );
      })}
    </>
  );
};

export default Features;
