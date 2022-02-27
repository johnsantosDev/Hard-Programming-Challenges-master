import React, {
  useState, useEffect, useContext, useCallback,
} from 'react';
import {
  useParams, Link, useLocation, useHistory,
} from 'react-router-dom';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import mixpanel from 'mixpanel-browser';
import { Button } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
// import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import ReviewsTab from '../../components/Reviews';
import SubmitModal from '../../components/Modals/SubmitModal';
import network from '../../services/network';
import Loading from '../../components/Loading';
import FilteredLabels from '../../context/FilteredLabelsContext';
import { Logged } from '../../context/LoggedInContext';
import ChallengesCarousel from '../../components/ChallengesCarousel';
import AllChallenges from '../../context/AllChallengesContext';
import Footer from '../../components/Footer';
import '../../styles/OneChallenge.css';
import { generateTime } from '../../utils';

function ChallengePage() {
  const { id: challengeId } = useParams();
  const filteredLabels = useContext(FilteredLabels);
  const LoggedContext = useContext(Logged);
  const allChallenges = useContext(AllChallenges).challenges;
  const allChallengesWithImgState = allChallenges.map((challenge) => ({ ...challenge, img: false }));
  const [challengesFiltered, setChallengesFiltered] = useState(allChallengesWithImgState);
  const currentLocation = useLocation();
  const currentHistory = useHistory();
  const [challenge, setChallenge] = useState(null);
  const [loadingPage, setLoadingPage] = useState(true);
  const [image, setImage] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState();
  const [rating, setRating] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingReq, setLoadingReq] = useState(false);
  const [ratingCount, setRatingCount] = useState('');
  const [boilerPlate, setBoilerPlate] = useState('');

  const getBoilerPlate = useCallback(async () => {
    const { data: boilerPlate } = await network.get(
      `/api/v1/challenges/boiler-plate/${challengeId}`,
    );
    if (boilerPlate) {
      setBoilerPlate(boilerPlate.boilerPlate);
    }
  }, [challengeId]);

  useEffect(() => {
    if (LoggedContext.logged) {
      const user = Cookies.get('userName');
      mixpanel.track('User On Challenge Page', {
        User: `${user}`,
        ChallengeId: `${challengeId}`,
      });
      getBoilerPlate();
    }
    // eslint-disable-next-line
  }, [challengeId]);

  const getLastSubmissions = useCallback(async () => {
    try {
      const { data: submission } = await network.get(
        `/api/v1/submissions/by-user/${challengeId}`,
      );
      if (submission) {
        setSubmissionStatus({
          state: submission.state,
          createdAt: submission.createdAt,
        });
        setLoadingReq(true);
        return submission.state;
      }
      setSubmissionStatus(null);
      setLoadingReq(true);
      return false;
    } catch (error) { }
  }, [challengeId]);

  const fetchChallenge = useCallback(async () => {
    try {
      const { data: challengeFromServer } = await network.get(
        `/api/v1/challenges/info/${challengeId}`,
      );
      setChallenge(challengeFromServer);
      setRating(
        challengeFromServer.averageRaiting
          ? challengeFromServer.averageRaiting
          : 0,
      );
      const { data: reviewsArrayFromServer } = await network.get(
        `/api/v1/reviews/${challengeId}`,
      );
      setRatingCount(reviewsArrayFromServer.length);
      setLoadingPage(false);
    } catch (error) { setLoadingPage(false); }
  }, [challengeId]);

  const setImg = useCallback(async () => {
    try {
      const { data } = await network.get(`/api/v1/images?id=${challengeId}`);
      setImage(data.img);
    } catch (error) { }
  }, [challengeId]);

  let getSubmissionInterval;

  const updateSubmissionStatus = () => {
    getSubmissionInterval = setInterval(async () => {
      if (LoggedContext.logged) {
        const status = await getLastSubmissions();
        if (status === 'SUCCESS' || status === 'FAIL' || window.location.pathname !== currentLocation.pathname) clearInterval(getSubmissionInterval);
      } else {
        clearInterval(getSubmissionInterval);
      }
    }, 2000);
  };

  useEffect(() => {
    setImg();
    fetchChallenge();
    if (LoggedContext.logged) {
      updateSubmissionStatus();
    } else {
      setLoadingReq(true);
    }
    return () => clearInterval(getSubmissionInterval);
    // eslint-disable-next-line
  }, [challengeId]);

  const setNewImg = useCallback((id, newImg) => {
    setChallengesFiltered((prev) => {
      const currentChallenges = prev.map((challenge) => {
        if (challenge.id === id) {
          challenge.img = newImg;
          return challenge;
        }
        return challenge;
      });
      return currentChallenges;
    });
  }, [setChallengesFiltered]);

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const getSubmissionButton = useCallback(() => {
    if (!submissionStatus) {
      return (
        <Button
          className="One-Challenge-Control-Panel-Submit-Button-Regular"
          variant="contained"
          onClick={() => setIsModalOpen(true)}
        >
          Submit
        </Button>
      );
    }
    if (submissionStatus.state === 'PENDING') {
      return <LinearProgress className="Circular-Progress" />;
    }
    if (submissionStatus.state === 'SUCCESS') {
      return (
        <Button
          className="One-Challenge-Control-Panel-Submit-Button-Success"
          variant="contained"
          onClick={() => setIsModalOpen(true)}
        >
          Submit again
        </Button>
      );
    }
    return (
      <Button
        className="One-Challenge-Control-Panel-Submit-Button-Fail"
        variant="contained"
        onClick={() => setIsModalOpen(true)}
      >
        Submit again
      </Button>
    );
  }
  // eslint-disable-next-line
    , [submissionStatus])

  return !loadingPage
    ? challenge
      ? (
        <div className="One-Challenge-Page">
          <section className="One-Challenge-Page-Head">
            <div
              style={{
                backgroundImage: `url('${image}')`,
              }}
              className="One-Challenge-Image-Container"
            />
            <h1>{challenge.name}</h1>
            <h2>
              <span>{challenge.Author.userName}</span>
              <span>{generateTime(challenge.createdAt)}</span>
              <span>
                {ratingCount}
                {' '}
                submissions
              </span>
            </h2>
            <p>{challenge.description}</p>
            <ul>
              {challenge.Labels
                && challenge.Labels.map((label) => (
                  <Link
                    key={label.id}
                    className="remove"
                    to="/challenges"
                    onClick={() => filteredLabels.setFilteredLabels([label.id])}
                  >
                    <span>{label.name}</span>
                  </Link>
                ))}
            </ul>
          </section>
          <section className="One-Challenge-Page-Control-Panel">
            <div className="One-Challenge-Page-Control-Panel-Rating-Container">
              <div className="One-Challenge-Page-Control-Panel-Rating">
                <Rating className="One-Challenge-Page-Control-Panel-Rating-Stars" name="half-rating-read" value={rating} readOnly size="large" />
                <div className="One-Challenge-Page-Control-Panel-Rating-Text">
                  {ratingCount}
                  {' '}
                  rates
                </div>
              </div>
            </div>
            <div className="One-Challenge-Page-Control-Panel-Start-Button-Container">
              <div className="One-Challenge-Page-Control-Panel-Start">
                {LoggedContext.logged
                  ? (
                    <Button
                      variant="contained"
                      className="One-Challenge-Page-Control-Panel-Start-Button"
                      onClick={async () => {
                        const user = Cookies.get('userName');
                        mixpanel.track('User Started Challenge', {
                          User: `${user}`,
                          ChallengeId: `${challengeId}`,
                        });
                        try {
                          await network.post(`/api/v1/webhooks/trigger-events/start-challenge/${challengeId}`, { challengeName: challenge.name });
                        } catch (error) {
                        }
                      }}
                      href={`https://github.com/${boilerPlate}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Start Challenge
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      className="One-Challenge-Page-Control-Panel-Start-Button"
                      onClick={() => Swal.fire({
                        icon: 'warning',
                        title: 'You Must Login First!',
                        showCancelButton: true,
                        confirmButtonText: 'Login',
                        cancelButtonText: 'OK',
                      }).then((result) => {
                        if (result.value) {
                          currentHistory.push('/login');
                        }
                      })}
                    >
                      Start Challenge
                    </Button>
                  )}
              </div>
            </div>
            <div className="One-Challenge-Page-Control-Panel-Submit">
              {LoggedContext.logged
                ? (loadingReq ? (
                  <div className="One-Challenge-Page-Control-Panel-Submit-Button">
                    {getSubmissionButton()}
                  </div>
                ) : (
                  <div style={{ textAlign: 'center' }}>
                    <LinearProgress className="Circular-Progress" />
                  </div>
                ))
                : (
                  <div className="One-Challenge-Page-Control-Panel-Submit-Button">
                    <Button
                      className="One-Challenge-Control-Panel-Submit-Button-Regular"
                      variant="contained"
                      onClick={() => Swal.fire({
                        icon: 'warning',
                        title: 'You Must Login First!',
                        showCancelButton: true,
                        confirmButtonText: 'Login',
                        cancelButtonText: 'OK',
                      }).then((result) => {
                        if (result.value) {
                          currentHistory.push('/login');
                        }
                      })}
                    >
                      Submit
                    </Button>
                  </div>
                )}

              <SubmitModal
                isOpen={isModalOpen}
                handleClose={handleModalClose}
                challengeParamId={challengeId}
                submissionStatus={submissionStatus}
                updateSubmissionStatus={updateSubmissionStatus}
              />
            </div>

          </section>
          <section className="One-Challenge-Page-More">
            <h2>You might also be interested in:</h2>
            <ChallengesCarousel challenges={challengesFiltered} setNewImg={setNewImg} main />
          </section>
          <section className="One-Challenge-Page-Reviews">
            <ReviewsTab challengeId={challenge.id} setRatingCount={setRatingCount} />
          </section>
          <div className="One-Challenge-Footer">
            <Footer color="black" />
          </div>
        </div>

      ) : (
        <h1
          style={{ textAlign: 'center', marginTop: '20%' }}
        >
          Not Found
        </h1>
      ) : (<Loading />);
}

export default ChallengePage;
