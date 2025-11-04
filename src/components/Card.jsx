"use client";
import ReactPlayer from "react-player";
import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { Link, NavLink, useNavigate } from "react-router";

export function Card({ singleMovie, id }) {
  const navigate = useNavigate();
  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
        <CardItem
          translateZ="30"
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >
          {singleMovie.primaryTitle} (
          {singleMovie?.releaseDate?.substring(0, 4)})
        </CardItem>
        <CardItem
          as="p"
          translateZ="20"
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
        <div className=" flex  flex-col justify-center ">
          <NavLink to={`/movies/${id}/cast`}>
            <button className=" px-4 py-1 w-full h-10 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold">
              See the Cast
            </button>
          </NavLink>

          <div className="flex  justify-between text-black  mt-5">
            <div className="flex justify-center items-center">
              <div className="h-8 font-bold bg-white text-black text-xl px-1 rounded-xl">
                Rating : {singleMovie.averageRating}
              </div>
            </div>
            <div>
              <a href={singleMovie.url} target="_blank">
                <img
                  src="https://logos-world.net/wp-content/uploads/2022/04/IMDb-Logo.png"
                  className="h-10 w-20"
                  alt=""
                />
              </a>
            </div>
            <CardItem
              translateZ={20}
              as="button"
              className="px-4 py-1  rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
            >
              <button onClick={() => navigate(-1)}>Go Back</button>
            </CardItem>
          </div>
        </div>
      </CardBody>
    </CardContainer>
  );
}
