import React, { useRef, useReducer, useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  FaUser,
  FaStar,
  FaCodeBranch,
  FaExclamationTriangle,
} from "react-icons/fa";
import { fetchPopularRepos } from "../utils/api";
import Card from "./Card";
import Loading from "./Loading";
import Tooltip from "./Tooltip";

function LangaugesNav({ selected, onUpdateLanguage }) {
  const languages = ["All", "JavaScript", "Ruby", "Java", "CSS", "Python"];

  return (
    <ul className="flex-center">
      {languages.map((language) => (
        <li key={language}>
          <button
            className="btn-clear nav-link"
            style={language === selected ? { color: "rgb(187, 46, 31)" } : null}
            onClick={() => onUpdateLanguage(language)}
          >
            {language}
          </button>
        </li>
      ))}
    </ul>
  );
}

LangaugesNav.propTypes = {
  selected: PropTypes.string.isRequired,
  onUpdateLanguage: PropTypes.func.isRequired,
};

function ReposGrid({ repos }) {
  return (
    <ul className="grid space-around">
      {repos.map((repo, index) => {
        const {
          name,
          owner,
          html_url,
          stargazers_count,
          forks,
          open_issues,
        } = repo;
        const { login, avatar_url } = owner;

        return (
          <li key={html_url}>
            <Card
              header={`#${index + 1}`}
              avatar={avatar_url}
              name={login}
              href={html_url}
            >
              <ul className="card-list">
                <Tooltip text="Github Username">
                  <li>
                    <FaUser color="rgb(255, 191, 116)" size={22} />
                    <a href={`https://github.com/${login}`}>{login}</a>
                  </li>
                </Tooltip>
                <li>
                  <FaStar color="rgb(255, 215, 0)" size={22} />
                  {stargazers_count.toLocaleString()} stars
                </li>
                <li>
                  <FaCodeBranch color="rgb(129, 195, 245)" size={22} />
                  {forks.toLocaleString()} forks
                </li>
                <li>
                  <FaExclamationTriangle color="rgb(241, 138, 147)" size={22} />
                  {open_issues.toLocaleString()} open
                </li>
              </ul>
            </Card>
          </li>
        );
      })}
    </ul>
  );
}

ReposGrid.propTypes = {
  repos: PropTypes.array.isRequired,
};

function repoReducer(state, action) {
  if (action.type === "success") {
    return {
      ...state,
      [action.selectedLanguage]: action.repos,
      error: null,
    };
  } else if (action.type === "fail") {
    return {
      ...state,
      error: action.error.message,
    };
  } else {
    throw new Error("Action does not exists");
  }
}

export default function Popular() {
  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const [state, dispatch] = useReducer(repoReducer, { error: null });

  const fetchedLanguagesRef = useRef([]);

  useEffect(() => {
    if (fetchedLanguagesRef.current.includes(selectedLanguage) === false) {
      fetchPopularRepos(selectedLanguage)
        .then((repos) => {
          fetchedLanguagesRef.current.push(selectedLanguage);
          dispatch({ type: "success", repos, selectedLanguage });
        })
        .catch((er) => {
          dispatch({ type: "fail", error: er });
        });
    }
  }, [fetchedLanguagesRef, selectedLanguage]);

  const updateLanguage = (selectedLanguage) => {
    setSelectedLanguage(selectedLanguage);
  };

  const isLoading = () => !state[selectedLanguage] && state.error === null;

  return (
    <>
      <LangaugesNav
        selected={selectedLanguage}
        onUpdateLanguage={updateLanguage}
      />

      {isLoading() && <Loading text="Fetching Repos" />}

      {state.error && <p className="center-text error">{state.error}</p>}

      {state[selectedLanguage] && <ReposGrid repos={state[selectedLanguage]} />}
    </>
  );
}
