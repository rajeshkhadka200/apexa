import React from "react";
import style from "../css/components/Features.module.css";
import { GoCpu, GoFileCode, GoRocket, GoZap } from "react-icons/go";
import FeatureCard from "./FeatureCard";

const Features = () => {
  const f_data = [
    {
      icon: <GoCpu className={style.f_icon} />,
      tag: "Unlock YouTube Insights!",
      des: "Examine the comments on your videos, receive instant notifications for hate speech and spam.And go beyond just views to really understand what your viewers are saying.",
      slogan:"Analyze Video Comments.",
      c1: "#f96f10",
      c2: "#ef5088",
      img:"/yt.png",
    },
    {
      icon: <GoFileCode className={style.f_icon} />,
      tag: "Blog Comments Unleashed!",
      des: "Explore summaries, review comments, and get instant alerts for hate speech and spam. Truly understand your blog's impact and audience sentiments.",
      slogan:"Analyze Blog Comments.",
      c1: "#3093ee",
      c2: "#0ec3fa",
      img:"/blog.png",
    },
    {
      icon: <GoRocket className={style.f_icon} />,
      tag: "Your Ideas, Our Images!",
      des: "Effortlessly bring your visions to life through image descriptions. Your ideas, our magic a new way to express yourself visually.",
      slogan:"Generate Image.",
      c1: "#994abe",
      c2: "#8a3ced",
      img:"/image.png"
    },
    {
      icon: <GoZap className={style.f_icon} />,
      tag: "Craft Your Content Magic!",
      des: "Explore genre-based suggestions and creative ideas for your next hit—whether it's reels, videos, or blogposts. Let our wizardry inspire your content journey.",
      slogan:"Generate Content Ideas.",
      c1: "#00b747",
      c2: "#00acae",
      img:"/content.png"
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
            slogan={data.slogan}
            img={data.img}
          />
        );
      })}
    </>
  );
};

export default Features;
