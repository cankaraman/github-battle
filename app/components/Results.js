import React from 'react';
import PropTypes from 'prop-types';
import {
  FaCompass, FaBriefcase, FaUsers, FaUserFriends, FaUser,
} from 'react-icons/fa';
// FaCode,
import { battle } from '../utils/api';
import Card from './Card';
import Loading from './Loading';

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
      return <Loading text="Battling" />;
    }

    if (error) {
      return <p className="center-text error">{error}</p>;
    }
    return (
      <>
        <div className="grid space-around container-sm">
          <Card
            header={winner.score === loser.score ? 'Tie' : 'Winner'}
            subheader={`Score: ${winner.score}`}
            avatar={winner.profile.avatar_url}
            name={winner.profile.login}
            href={winner.profile.html_url}
          >
            <ProfileList player={winner} />
          </Card>
          <Card
            header={winner.score === loser.score ? 'Tie' : 'Loser'}
            subheader={`Score: ${loser.score}`}
            avatar={loser.profile.avatar_url}
            name={loser.profile.login}
            href={loser.profile.html_url}
          >
            <ProfileList player={loser} />
          </Card>
        </div>
        <button
          className="btn dark-btn btn-space"
          onClick={this.props.onReset}
        >
          Reset
        </button>
      </>
    );
  }
}

Results.propTypes = {
  playerOne: PropTypes.string.isRequired,
  playerTwo: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired,
};
