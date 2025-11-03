"use client";
import ReactPlayer from "react-player";
import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { Link, NavLink } from "react-router";

export function Card({ singleMovie }) {
  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >
          {singleMovie.primaryTitle}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          {singleMovie.description}
        </CardItem>
        <CardItem className="w-full mt-4">
          <ReactPlayer
            src={singleMovie.trailer}
            height="1000"
            width="1000"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            playing={true}
            loop
            controls={true}
          />
        </CardItem>
        <div className="flex justify-between items-center mt-20">
          <div>
            <div>Rating : {singleMovie.averageRating}</div>
          </div>
          <CardItem
            translateZ={20}
            as="button"
            className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
          >
            <NavLink to="/">Go Back</NavLink>
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}
