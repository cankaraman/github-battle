import React from 'react';
import PropTypes from 'prop-types';
import {
  FaCompass, FaBriefcase, FaUsers, FaUserFriends, FaCode, FaUser,
} from 'react-icons/fa';
import { battle } from '../utils/api';

function ProfileList({ player }) {
  return (
    <ul className="card-list">
      <li>
        <FaUser color="rgb(239, 155, 155)" size={22} />
        {player.profile.name}
      </li>
      {player.profile.location && (
      <li>
        <FaCompass color="rgb(144, 115, 255)" size={22} />
        {player.profile.location}
      </li>
      )}
      {player.profile.company && (
        <li>
          <FaBriefcase color="#795548" size={22} />
          {player.profile.company}
        </li>
      )}
      <li>
        <FaUsers color="rgb(129, 195, 245)" size={22} />
        {player.profile.followers.toLocaleString()}
        {' '}
        followers
      </li>
      <li>
        <FaUserFriends color="rgb(64, 183, 95)" size={22} />
        {player.profile.following.toLocaleString()}
        {' '}
        following
      </li>
    </ul>
  );
}

ProfileList.propTypes = {
  player: PropTypes.object.isRequired,
};

export default class Results extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true,
    };
  }

  componentDidMount() {
    const { playerOne, playerTwo } = this.props;
    battle([playerOne, playerTwo])
      .then((players) => {
        this.setState({
          winner: players[0],
          loser: players[1],
          error: null,
          loading: false,
        });
      }).catch(({ message }) => {
        this.setState({
          error: message,
          loading: false,
        });
      });
  }

  render() {
    const {
      winner, loser, error, loading,
    } = this.state;

    if (loading) {
      return <p>LOADING</p>;
    }

    if (error) {
      return <p className="center-text error">{error}</p>;
    }
    // winStatus={winner.score === loser.score ? 'Tie' : 'Winner'}
    // winStatus={winner.score === loser.score ? 'Tie' : 'Loser'}
    return (
      <div className="grid space-around container-sm">
        <ProfileList player={winner} />
        <ProfileList player={loser} />
      </div>
    );
  }
}
