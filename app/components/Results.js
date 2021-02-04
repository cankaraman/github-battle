import React, { useReducer, useState, useEffect } from "react";

import PropTypes from "prop-types";
import {
  FaCompass,
  FaBriefcase,
  FaUsers,
  FaUserFriends,
  FaUser,
} from "react-icons/fa";
// FaCode,
import queryString from "query-string";
import { Link } from "react-router-dom";
import { battle } from "../utils/api";
import Card from "./Card";
import Loading from "./Loading";
import Tooltip from "./Tooltip";

function ProfileList({ player }) {
  return (
    <ul className="card-list">
      <li>
        <FaUser color="rgb(239, 155, 155)" size={22} />
        {player.profile.name}
      </li>
      {player.profile.location && (
        <Tooltip text={"User's Location"}>
          <li>
            <FaCompass color="rgb(144, 115, 255)" size={22} />
            {player.profile.location}
          </li>
        </Tooltip>
      )}
      {player.profile.company && (
        <Tooltip text={"User's Company"}>
          <li>
            <FaBriefcase color="#795548" size={22} />
            {player.profile.company}
          </li>
        </Tooltip>
      )}
      <li>
        <FaUsers color="rgb(129, 195, 245)" size={22} />
        {player.profile.followers.toLocaleString()} followers
      </li>
      <li>
        <FaUserFriends color="rgb(64, 183, 95)" size={22} />
        {player.profile.following.toLocaleString()} following
      </li>
    </ul>
  );
}

ProfileList.propTypes = {
  player: PropTypes.object.isRequired,
};

function resultReducer(state, action) {
  if (action.type === "success") {
    return {
      ...state,
      winner: action.winner,
      loser: action.loser,
      error: null,
      loading: false,
    };
  } else if (action.type === "error") {
    return {
      ...state,
      winner: null,
      loser: null,
      error: action.message,
      loading: false,
    };
  } else {
    throw new Error("Action type not supported");
  }
}

export default function Results(props) {
  const { playerOne, playerTwo } = queryString.parse(props.location.search);
  const [state, dispatch] = useReducer(resultReducer, {
    loading: true,
    winner: null,
    loser: null,
    error: null,
  });
  useEffect(() => {
    battle([playerOne, playerTwo])
      .then((players) =>
        dispatch({
          type: "success",
          winner: players[0],
          loser: players[1],
        })
      )
      .catch((message) =>
        dispatch({
          type: "error",
          message,
        })
      );
  }, [playerOne, playerTwo]);

  if (state.loading) {
    return <Loading text="Battling" />;
  }

  if (state.error) {
    return <p className="center-text error">{state.error}</p>;
  }

  return (
    <>
      <div className="grid space-around container-sm">
        <Card
          header={state.winner.score === state.loser.score ? "Tie" : "Winner"}
          subheader={`Score: ${state.winner.score}`}
          avatar={state.winner.profile.avatar_url}
          name={state.winner.profile.login}
          href={state.winner.profile.html_url}
        >
          <ProfileList player={state.winner} />
        </Card>
        <Card
          header={state.winner.score === state.loser.score ? "Tie" : "Loser"}
          subheader={`Score: ${state.loser.score}`}
          avatar={state.loser.profile.avatar_url}
          name={state.loser.profile.login}
          href={state.loser.profile.html_url}
        >
          <ProfileList player={state.loser} />
        </Card>
      </div>
      <Link className="btn dark-btn btn-space" to="/battle">
        Reset
      </Link>
    </>
  );
}
