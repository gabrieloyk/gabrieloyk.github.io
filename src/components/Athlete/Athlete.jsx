import React, { useEffect, useState } from "react";
// import stats from "./stats.json";
import axios from "axios";
import "../../App.css";
import "./Athlete.css";
import { DemoPie } from "./DemoPie";
import { useMediaQuery } from 'react-responsive';
import InProgress from "../InProgress/InProgress";

const AthleteStats = () => {
  const [stats, setStats] = useState(null);
  const athleteId = "109793827";
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const [accessToken, setAccessToken] = useState(
    "607f0a099a3000c775f62dbacd610e5aa6dd10c8"
  );
  const [refreshToken, setRefreshToken] = useState(
    "f0a21edd405755a7add62bfcc730d47eaab2bcc7"
  );
  const clientId = "123614";
  const clientSecret = "a1ef81a6b8404d8845f14a142d85cb279c8491e3";
  const [totalDays, setTotalDays] = useState(0)
  const [totalHours, setTotalHours] = useState(0)
  const [animationComplete, setAnimationComplete] = useState(false);

 useEffect(() => {
  const fetchAccessToken = async () => {
    try {
      const response = await axios.post('https://www.strava.com/oauth/token', {
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'refresh_token',
        refresh_token: refreshToken
      });

      const { access_token, expires_at, refresh_token } = response.data;

      setAccessToken(access_token);
      setRefreshToken(refresh_token);
    } catch (error) {
      console.error('Error fetching access token:', error);
    }
  };


  fetchAccessToken();
}, []);

useEffect(() => {
  const fetchAthleteStats = async () => {
    try {
      const currentTime = Math.floor(Date.now() / 1000);
      if (accessToken && stats && stats.expires_at && currentTime < stats.expires_at) {
        return; // Access token is still valid, no need to refresh
      }

      const athleteStatsResponse = await axios.get(`https://www.strava.com/api/v3/athletes/${athleteId}/stats`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      setStats(athleteStatsResponse.data);
      let totalHours = Math.round(
        (athleteStatsResponse.data.all_swim_totals.elapsed_time +
          athleteStatsResponse.data.all_ride_totals.elapsed_time +
          athleteStatsResponse.data.all_run_totals.elapsed_time) /
          (60 * 60)
      )
      setTotalHours(totalHours);
      setTotalDays(Math.round(totalHours / 24));
    } catch (error) {
      console.error('Error fetching athlete stats:', error);
    }
  };

  fetchAthleteStats();
}, [accessToken]);

  useEffect(() => {
    // After 4 seconds, set the animationComplete state to true
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {!animationComplete || !stats ? (
        <div className="container centering">
          <h3 className="heading fade-in">
            I'm a hobby triathlete, and joined the sport in Sept 2023. <br />{" "}
            Here's a glimpse of how much I've trained so far...
          </h3>
        </div>
      ) : (
        <>
          <p className="paragraph typing-animation">
            That's right... a whopping {totalHours} hours which is like{" "}
            {totalDays} full days
          </p>
          <div className={`container-strava`}>
            <div className="chart">
              <DemoPie stats={stats} enableAnnotations={!isMobile} />
            </div>
            <iframe className="fly-in-from-left"
              height="454"
              width="300"
              frameborder="0"
              allowtransparency="true"
              scrolling="no"
              src="https://www.strava.com/athletes/109793827/latest-rides/3652d16009b5de4ebdc346cf4db00bc5f90e65f5"
            ></iframe>
          </div>
          <div className="divider" />
          <div className="container">
            <h2 className="heading">Achievements</h2>
            <div className="responsive-card">
            <InProgress />
            </div>
          </div>
        </>
      )}
      
    </>
  );
};

export default AthleteStats;
